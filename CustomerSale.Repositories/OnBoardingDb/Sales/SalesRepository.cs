using CustomerSale.DomainModel;
using CustomerSale.Repositories.Common.DatabaseContext.OnBoardingDb;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace CustomerSale.Repositories.OnBoardingDb
{
    public class SalesRepository : ISalesRepository
    {
        private readonly OnBoardingDbContext _OnBoardingDbContext;

        public SalesRepository(OnBoardingDbContext onBoardingDbContext)
        {
            _OnBoardingDbContext = onBoardingDbContext;
        }
        public void Create(Sales sales)
        {
            _OnBoardingDbContext.Sales.Add(sales);
            _OnBoardingDbContext.SaveChanges();
        }

        public void Delete(int Id)
        {
            Sales sales = _OnBoardingDbContext.Sales.FirstOrDefault(e => e.Id == Id);
            if (sales != null)
            {
                _OnBoardingDbContext.Sales.Remove(sales);
                _OnBoardingDbContext.SaveChanges();
            }
        }

        public IEnumerable<Sales> GetAll()
        {
            return _OnBoardingDbContext.Sales.Include(e => e.Customer).Include(e => e.Product).Include(e => e.Store);
        }
        public Sales GetById(int Id)
        {
            Sales sales = _OnBoardingDbContext.Sales.Include(e => e.Customer).Include(e => e.Product).Include(e => e.Store).FirstOrDefault(e => e.Id == Id);
            return sales;
        }
        public void Update(Sales salesChanges)
        {
            if (salesChanges != null)
            {
                _OnBoardingDbContext.Sales.Update(salesChanges);
                _OnBoardingDbContext.SaveChanges();
            }
        }
    }
}
