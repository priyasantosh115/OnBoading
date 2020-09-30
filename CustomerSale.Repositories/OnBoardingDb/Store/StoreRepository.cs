using CustomerSale.DomainModel;
using CustomerSale.Repositories.Common.DatabaseContext.OnBoardingDb;
using System.Collections.Generic;
using System.Linq;

namespace CustomerSale.Repositories.OnBoardingDb
{
    public class StoreRepository : IStoreRepository
    {
        private readonly OnBoardingDbContext _OnBoardingDbContext;

        public StoreRepository(OnBoardingDbContext onBoardingDbContext)
        {
            _OnBoardingDbContext = onBoardingDbContext;
        }
        public void Create(Store store)
        {
            _OnBoardingDbContext.Add(store);
            _OnBoardingDbContext.SaveChanges();
        }
        public void Delete(int Id)
        {
            Store store = _OnBoardingDbContext.Store.FirstOrDefault(e => e.Id == Id);

            if (store != null)
            {
                _OnBoardingDbContext.Store.Remove(store);
                _OnBoardingDbContext.SaveChanges();
            }
        }

        public IEnumerable<Store> GetAll()
        {
            return _OnBoardingDbContext.Store;
        }
        public Store GetById(int Id)
        {
            Store store = _OnBoardingDbContext.Store.FirstOrDefault(e => e.Id == Id);
            return store;
        }
        public void Update(Store storeChanges)
        {
            if (storeChanges != null)
            {
                _OnBoardingDbContext.Store.Update(storeChanges);
                _OnBoardingDbContext.SaveChanges();
            }
        }
    }
}
