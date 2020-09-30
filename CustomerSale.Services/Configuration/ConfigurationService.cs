using Microsoft.Extensions.Configuration;

namespace CustomerSale.Services.Configuration
{
    public class ConfigurationService : IConfigurationService
    {
        private readonly IConfiguration _configuration;

        public ConfigurationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetOnBoardingDbConnectionString()
        {
            return _configuration.GetConnectionString("OnBoardingConnection");
        }
    }
}
