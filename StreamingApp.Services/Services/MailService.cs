using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using StreamingApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Services
{
    public class MailService : IMailService
    {
        private readonly IConfiguration mConfiguration;

        public MailService(IConfiguration configuration)
        {
            mConfiguration = configuration;
        }

        public async Task SendEmailAsync(string destination, string subject, string body)
        {
            var apiKey = mConfiguration["SendGridApiKey"];
            var client = new SendGridClient(apiKey);

            var from = new EmailAddress("newavestreamingapp@gmail.com", "Newave");
            var to = new EmailAddress(destination);

            var msg = MailHelper.CreateSingleEmail(from, to, subject, body, body);
            await client.SendEmailAsync(msg);
        }
    }
}
