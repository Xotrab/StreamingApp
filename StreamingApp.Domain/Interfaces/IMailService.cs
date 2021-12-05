using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(string destination, string subject, string body);
    }
}
