using CustomerSale.DomainModel;
using System.Collections.Generic;

namespace CustomerSale.Repositories.OnBoardingDb
{
    public interface IProductRepository
    {
        void Create(Product product);
        IEnumerable<Product> GetAll();
        Product GetById(int Id);
        void Update(Product productChanges);
        void Delete(int Id);

    }
}
