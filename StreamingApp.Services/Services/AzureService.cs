using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Management.Media;
using Microsoft.Azure.Management.Media.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using Microsoft.Rest;
using StreamingApp.Domain.DTOs;
using StreamingApp.Domain.Interfaces;
using StreamingApp.Shared.Responses;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Services
{
    public class AzureService : IAzureService
    {
        private readonly IConfiguration mConfiguration;

        public readonly bool InteractiveAuth = true;
        public readonly string TokenType = "Bearer";
        public readonly string AdaptiveStreamingTransformName = "MyTransformABS";

        public AzureService(IConfiguration configuration)
        {
            mConfiguration = configuration;
        }

        public async Task<IAzureMediaServicesClient> CreateMediaServicesClientAsync()
        {
            ServiceClientCredentials credentials;
            if (InteractiveAuth)
                credentials = await GetCredentialsInteractiveAuthAsync();
            else
                credentials = await GetCredentialsAsync();

            return new AzureMediaServicesClient(new Uri(mConfiguration["ArmEndpoint"]), credentials)
            {
                SubscriptionId = mConfiguration["SubscriptionId"]
            };
        }

        public async Task<ServiceClientCredentials> GetCredentialsAsync()
        {
            var scopes = new[] { new Uri(mConfiguration["ArmAadAudience"]) + "/.default" };

            var app = ConfidentialClientApplicationBuilder.Create(mConfiguration["AadClientId"])
                .WithClientSecret(mConfiguration["AadSecret"])
                .WithAuthority(AzureCloudInstance.AzurePublic, mConfiguration["AadTenantId"])
                .Build();

            var authResult = await app.AcquireTokenForClient(scopes)
                                                     .ExecuteAsync()
                                                     .ConfigureAwait(false);

            return new TokenCredentials(authResult.AccessToken, TokenType);
        }

        public async Task<ServiceClientCredentials> GetCredentialsInteractiveAuthAsync()
        {
            var scopes = new[] { new Uri(mConfiguration["ArmAadAudience"]) + "/user_impersonation" };

            // client application of Az Cli
            string ClientApplicationId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";

            AuthenticationResult result = null;

            IPublicClientApplication app = PublicClientApplicationBuilder.Create(ClientApplicationId)
                .WithAuthority(AzureCloudInstance.AzurePublic, mConfiguration["AadTenantId"])
                .WithRedirectUri("http://localhost")
                .Build();

            var accounts = await app.GetAccountsAsync();

            try
            {
                result = await app.AcquireTokenSilent(scopes, accounts.FirstOrDefault()).ExecuteAsync();
            }
            catch (MsalUiRequiredException ex)
            {
                try
                {
                    result = await app.AcquireTokenInteractive(scopes).ExecuteAsync();
                }
                catch (MsalException maslException)
                {
                    Console.Error.WriteLine($"ERROR: MSAL interactive authentication exception with code '{maslException.ErrorCode}' and message '{maslException.Message}'.");
                }
            }
            catch (MsalException maslException)
            {
                Console.Error.WriteLine($"ERROR: MSAL silent authentication exception with code '{maslException.ErrorCode}' and message '{maslException.Message}'.");
            }

            return new TokenCredentials(result.AccessToken, TokenType);
        }

        public async Task<Response<string>> UploadAsync(UploadSongDto uploadSongDto)
        {
            IAzureMediaServicesClient client;
            try
            {
                client = await CreateMediaServicesClientAsync();
            }
            catch (Exception e)
            {
                Console.Error.WriteLine("TIP: Make sure that you have filled out the appsettings.json file before running this sample.");
                Console.Error.WriteLine($"{e.Message}");
                return "Error occured during the upload".ToResponseDataFail();
            }

            // Set the polling interval for long running operations to 2 seconds.
            // The default value is 30 seconds for the .NET client SDK
            client.LongRunningOperationRetryTimeout = 2;

            // Creating a unique suffix so that we don't have name collisions if you run the sample
            // multiple times without cleaning up.
            string uniqueness = Guid.NewGuid().ToString("N");
            string jobName = $"job-{uniqueness}";
            string locatorName = $"locator-{uniqueness}";
            string outputAssetName = $"output-{uniqueness}";
            string inputAssetName = $"input-{uniqueness}";

            // Ensure that you have the desired encoding Transform. This is really a one time setup operation.
            _ = await GetOrCreateTransformAsync(
                client,
                mConfiguration["ResourceGroup"],
                mConfiguration["AccountName"],
                AdaptiveStreamingTransformName);

            // Create a new input Asset and upload the specified local video file into it.
            _ = await CreateInputAssetAsync(
                client,
                mConfiguration["ResourceGroup"],
                mConfiguration["AccountName"],
                inputAssetName,
                uploadSongDto.File);

            // Use the name of the created input asset to create the job input.
            _ = new JobInputAsset(assetName: inputAssetName);

            // Output from the encoding Job must be written to an Asset, so let's create one
            Asset outputAsset = await CreateOutputAssetAsync(
                client,
                mConfiguration["ResourceGroup"],
                mConfiguration["AccountName"],
                outputAssetName);

            _ = await SubmitJobAsync(
                client,
                mConfiguration["ResourceGroup"],
                mConfiguration["AccountName"],
                AdaptiveStreamingTransformName,
                jobName,
                inputAssetName,
                outputAsset.Name);

            // In this demo code, we will poll for Job status
            // Polling is not a recommended best practice for production applications because of the latency it introduces.
            // Overuse of this API may trigger throttling. Developers should instead use Event Grid.
            Job job = await WaitForJobToFinishAsync(
                client,
                mConfiguration["ResourceGroup"],
                mConfiguration["AccountName"],
                AdaptiveStreamingTransformName,
                jobName);

            if (job.State != JobState.Finished)
            {
                return "Error occured during the upload job".ToResponseDataFail();
            }

            Console.WriteLine("Job finished.");

            StreamingLocator locator = await CreateStreamingLocatorAsync(
                client,
                mConfiguration["ResourceGroup"],
                mConfiguration["AccountName"],
                outputAsset.Name,
                locatorName);

            // Note that the URLs returned by this method include a /manifest path followed by a (format=)
            // parameter that controls the type of manifest that is returned. 
            // The /manifest(format=m3u8-aapl) will provide Apple HLS v4 manifest using MPEG TS segments.
            // The /manifest(format=mpd-time-csf) will provide MPEG DASH manifest.
            // And using just /manifest alone will return Microsoft Smooth Streaming format.
            // There are additional formats available that are not returned in this call, please check the documentation
            // on the dynamic packager for additional formats - see https://docs.microsoft.com/azure/media-services/latest/dynamic-packaging-overview
            IList<string> urls = await GetStreamingUrlsAsync(
                client,
                mConfiguration["ResourceGroup"],
                mConfiguration["AccountName"],
                locator.Name);

            foreach (var url in urls)
            {
                Console.WriteLine(url);
            }

            return urls.ElementAt(0).ToResponseData();
        }

        public async Task<Transform> GetOrCreateTransformAsync(
            IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string transformName)
        {
            bool createTransform = false;
            Transform transform = null;

            try
            {
                transform = client.Transforms.Get(resourceGroupName, accountName, transformName);
            }
            catch (ErrorResponseException ex) when (ex.Response.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                createTransform = true;
            }

            if (createTransform)
            {
                TransformOutput[] output = new TransformOutput[]
                {
                    new TransformOutput
                    {
                        Preset = new BuiltInStandardEncoderPreset()
                        {
                            PresetName = EncoderNamedPreset.AdaptiveStreaming
                        }
                    }
                };

                transform = await client.Transforms.CreateOrUpdateAsync(resourceGroupName, accountName, transformName, output);
            }

            return transform;
        }

        public async Task<Asset> CreateInputAssetAsync(
            IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string assetName,
            IFormFile fileToUpload)
        {
            // In this example, we are assuming that the asset name is unique.
            //
            // If you already have an asset with the desired name, use the Assets.Get method
            // to get the existing asset. In Media Services v3, the Get method on entities returns null 
            // if the entity doesn't exist (a case-insensitive check on the name).

            // Call Media Services API to create an Asset.
            // This method creates a container in storage for the Asset.
            // The files (blobs) associated with the asset will be stored in this container.
            Asset asset = await client.Assets.CreateOrUpdateAsync(resourceGroupName, accountName, assetName, new Asset());

            // Use Media Services API to get back a response that contains
            // SAS URL for the Asset container into which to upload blobs.
            // That is where you would specify read-write permissions 
            // and the exparation time for the SAS URL.
            var response = await client.Assets.ListContainerSasAsync(
                resourceGroupName,
                accountName,
                assetName,
                permissions: AssetContainerPermission.ReadWrite,
                expiryTime: DateTime.UtcNow.AddHours(4).ToUniversalTime());

            var sasUri = new Uri(response.AssetContainerSasUrls.First());

            // Use Storage API to get a reference to the Asset container
            // that was created by calling Asset's CreateOrUpdate method.  
            BlobContainerClient container = new BlobContainerClient(sasUri);
            BlobClient blob = container.GetBlobClient(fileToUpload.FileName);

            // Use Storage API to upload the file into the container in storage.
            await blob.UploadAsync(fileToUpload.OpenReadStream());

            return asset;
        }

        public async Task<Asset> CreateOutputAssetAsync(
            IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string assetName)
        {
            bool existingAsset = true;
            Asset outputAsset;

            try
            {
                // Check if an Asset already exists
                outputAsset = await client.Assets.GetAsync(resourceGroupName, accountName, assetName);
            }
            catch (ErrorResponseException ex) when (ex.Response.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                existingAsset = false;
            }

            Asset asset = new Asset();
            string outputAssetName = assetName;

            if (existingAsset)
            {
                // Name collision! In order to get the sample to work, let's just go ahead and create a unique asset name
                // Note that the returned Asset can have a different name than the one specified as an input parameter.
                // You may want to update this part to throw an Exception instead, and handle name collisions differently.
                string uniqueness = $"-{Guid.NewGuid():N}";
                outputAssetName += uniqueness;

                Console.WriteLine("Warning – found an existing Asset with name = " + assetName);
                Console.WriteLine("Creating an Asset with this name instead: " + outputAssetName);
            }

            return await client.Assets.CreateOrUpdateAsync(resourceGroupName, accountName, outputAssetName, asset);
        }
        public async Task<Job> SubmitJobAsync(
            IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string transformName,
            string jobName,
            string inputAssetName,
            string outputAssetName)
        {
            // Use the name of the created input asset to create the job input.
            JobInput jobInput = new JobInputAsset(assetName: inputAssetName);

            JobOutput[] jobOutputs =
            {
                new JobOutputAsset(outputAssetName),
            };

            // In this example, we are assuming that the job name is unique.
            //
            // If you already have a job with the desired name, use the Jobs.Get method
            // to get the existing job. In Media Services v3, the Get method on entities returns null 
            // if the entity doesn't exist (a case-insensitive check on the name).
            Job job = await client.Jobs.CreateAsync(
                resourceGroupName,
                accountName,
                transformName,
                jobName,
                new Job
                {
                    Input = jobInput,
                    Outputs = jobOutputs,
                });

            return job;
        }

        public async Task<Job> WaitForJobToFinishAsync(
            IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string transformName,
            string jobName)
        {
            const int SleepIntervalMs = 20 * 1000;

            Job job;
            do
            {
                job = await client.Jobs.GetAsync(resourceGroupName, accountName, transformName, jobName);

                Console.WriteLine($"Job is '{job.State}'.");
                for (int i = 0; i < job.Outputs.Count; i++)
                {
                    JobOutput output = job.Outputs[i];
                    Console.Write($"\tJobOutput[{i}] is '{output.State}'.");
                    if (output.State == JobState.Processing)
                    {
                        Console.Write($"  Progress (%): '{output.Progress}'.");
                    }

                    Console.WriteLine();
                }

                if (job.State != JobState.Finished && job.State != JobState.Error && job.State != JobState.Canceled)
                {
                    await Task.Delay(SleepIntervalMs);
                }
            }
            while (job.State != JobState.Finished && job.State != JobState.Error && job.State != JobState.Canceled);

            return job;
        }

        public async Task<StreamingLocator> CreateStreamingLocatorAsync(
            IAzureMediaServicesClient client,
            string resourceGroup,
            string accountName,
            string assetName,
            string locatorName)
        {
            StreamingLocator locator = await client.StreamingLocators.CreateAsync(
                resourceGroup,
                accountName,
                locatorName,
                new StreamingLocator
                {
                    AssetName = assetName,
                    StreamingPolicyName = PredefinedStreamingPolicy.ClearStreamingOnly
                });

            return locator;
        }

        public async Task<IList<string>> GetStreamingUrlsAsync(
            IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string locatorName)
        {
            const string DefaultStreamingEndpointName = "default";

            IList<string> streamingUrls = new List<string>();

            StreamingEndpoint streamingEndpoint = await client.StreamingEndpoints.GetAsync(resourceGroupName, accountName, DefaultStreamingEndpointName);

            if (streamingEndpoint.ResourceState != StreamingEndpointResourceState.Running)
            {
                await client.StreamingEndpoints.StartAsync(resourceGroupName, accountName, DefaultStreamingEndpointName);
            }

            ListPathsResponse paths = await client.StreamingLocators.ListPathsAsync(resourceGroupName, accountName, locatorName);

            foreach (StreamingPath path in paths.StreamingPaths)
            {
                UriBuilder uriBuilder = new UriBuilder
                {
                    Scheme = "https",
                    Host = streamingEndpoint.HostName,

                    Path = path.Paths[0]
                };
                streamingUrls.Add(uriBuilder.ToString());
            }
            return streamingUrls;
        }
    }
}
