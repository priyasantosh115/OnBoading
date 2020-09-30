using Microsoft.Extensions.DependencyInjection;

namespace CustomerSale.Services.DependencyInjection
{
    public class ServiceModule
    {
        public static void RegisterModule(IServiceCollection services)
        {
            services.Scan(x=>x.FromCallingAssembly()
            .AddClasses()
            .AsMatchingInterface()
            .WithSingletonLifetime());
        }
    }
}
