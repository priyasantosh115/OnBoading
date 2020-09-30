using AutoMapper;
using CustomerSale.Repositories.Common.UnitOfWork;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace CustomerSale.Repositories.DependencyInjection
{
    public class RepositoriesModule
    {
        public static void RegisterModule(IServiceCollection services)
        {
            services.AddScoped<IOnBoardingDbUnitOfWork, OnBoardingDbUnitOfWork>();            
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
        }
    }
}
