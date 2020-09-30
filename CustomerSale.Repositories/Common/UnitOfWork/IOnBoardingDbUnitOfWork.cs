using CustomerSale.Repositories.OnBoardingDb;

namespace CustomerSale.Repositories.Common.UnitOfWork
{
    public interface IOnBoardingDbUnitOfWork
    {
        ICustomerRepository GetCustomerRepository();
        IProductRepository GetProductRepository();
        IStoreRepository GetStoreRepository();
        ISalesRepository GetSalesRepository();
    }
}
