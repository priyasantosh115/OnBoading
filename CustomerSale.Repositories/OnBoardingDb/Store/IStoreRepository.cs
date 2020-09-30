using CustomerSale.DomainModel;
using System.Collections.Generic;

namespace CustomerSale.Repositories.OnBoardingDb
{
    public interface IStoreRepository
    {
        void Create(Store store);
        IEnumerable<Store> GetAll();
        Store GetById(int Id);
        void Update(Store storeChanges);
        void Delete(int Id);
    }
}
