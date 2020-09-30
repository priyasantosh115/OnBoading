using CustomerSale.DomainModel;
using CustomerSale.Repositories.Common.DatabaseContext.OnBoardingDb;
using System.Collections.Generic;
using System.Linq;

namespace CustomerSale.Repositories.OnBoardingDb
{
    public class ProductRepository : IProductRepository
    {
        private readonly OnBoardingDbContext _OnBoardingDbContext;
        public ProductRepository(OnBoardingDbContext dbContext)
        {
            _OnBoardingDbContext = dbContext;
        }

        public void Create(Product product)
        {
            _OnBoardingDbContext.Add(product);
            _OnBoardingDbContext.SaveChanges();
        }

        public void Delete(int Id)
        {
            Product product = _OnBoardingDbContext.Product.FirstOrDefault(e => e.Id == Id);
            
            if (product != null)
            {
                _OnBoardingDbContext.Product.Remove(product);
                _OnBoardingDbContext.SaveChanges();
            }
        }

        public IEnumerable<Product> GetAll()
        {
            return _OnBoardingDbContext.Product;
        }

        public Product GetById(int Id)
        {
            Product product = _OnBoardingDbContext.Product.FirstOrDefault(e => e.Id == Id);
            return product;
        }

        public void Update(Product productChanges)
        {
            if(productChanges!=null)
            {
                _OnBoardingDbContext.Product.Update(productChanges);
                _OnBoardingDbContext.SaveChanges();
            }
        }
    }
}
