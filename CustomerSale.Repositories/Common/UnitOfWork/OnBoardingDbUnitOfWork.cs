using CustomerSale.Repositories.Common.DatabaseContext.OnBoardingDb;
using CustomerSale.Repositories.OnBoardingDb;
using CustomerSale.Services.Configuration;
using Microsoft.EntityFrameworkCore;

namespace CustomerSale.Repositories.Common.UnitOfWork
{
    public class OnBoardingDbUnitOfWork: IOnBoardingDbUnitOfWork
    {
        private readonly IConfigurationService _configurationService;
        private readonly ICustomerRepository _customerRepository;
        private readonly IProductRepository _productRepository;
        private readonly IStoreRepository _storeRepository;
        private readonly ISalesRepository _salesRepository;
        private readonly OnBoardingDbContext _onBoardingDbContext;

        public OnBoardingDbUnitOfWork(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
            _onBoardingDbContext = new OnBoardingDbContext(OnBoardingDbOptions().Options);
            _customerRepository = new CustomerRepository(_onBoardingDbContext);
            _productRepository = new ProductRepository(_onBoardingDbContext);
            _storeRepository = new StoreRepository(_onBoardingDbContext);
            _salesRepository = new SalesRepository(_onBoardingDbContext);
        }

        public DbContextOptionsBuilder<OnBoardingDbContext> OnBoardingDbOptions()
        {
            var optionsBuilder = new DbContextOptionsBuilder<OnBoardingDbContext>();
            optionsBuilder.UseSqlServer(_configurationService.GetOnBoardingDbConnectionString());
            return optionsBuilder;
        }

        public ICustomerRepository GetCustomerRepository()
        {
            return _customerRepository;
        }
        public IProductRepository GetProductRepository()
        {
            return _productRepository;
        }
        public IStoreRepository GetStoreRepository()
        {
            return _storeRepository;
        }
        public ISalesRepository GetSalesRepository()
        {
            return _salesRepository;
        }
    }
}
