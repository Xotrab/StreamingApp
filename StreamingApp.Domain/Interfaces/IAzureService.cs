using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Management.Media;
using Microsoft.Azure.Management.Media.Models;
using Microsoft.Rest;
using StreamingApp.Domain.DTOs;
using StreamingApp.Shared.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.Interfaces
{
    public interface IAzureService
    {
        Task<IAzureMediaServicesClient> CreateMediaServicesClientAsync();
        Task<ServiceClientCredentials> GetCredentialsAsync();
        Task<ServiceClientCredentials> GetCredentialsInteractiveAuthAsync();
        Task<Response<string>> UploadAsync(UploadSongDto uploadSongDto);
        Task<Asset> CreateInputAssetAsync(
            IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string assetName,
            IFormFile fileToUpload);
        Task<Asset> CreateOutputAssetAsync(
            IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string assetName);
        Task<Transform> GetOrCreateTransformAsync(
            IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string transformName);
        Task<Job> SubmitJobAsync(IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string transformName,
            string jobName,
            string inputAssetName,
            string outputAssetName);
        Task<Job> WaitForJobToFinishAsync(IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string transformName,
            string jobName);
        Task<StreamingLocator> CreateStreamingLocatorAsync(
            IAzureMediaServicesClient client,
            string resourceGroup,
            string accountName,
            string assetName,
            string locatorName);

        Task<IList<string>> GetStreamingUrlsAsync(
            IAzureMediaServicesClient client,
            string resourceGroupName,
            string accountName,
            string locatorName);
    }
}
