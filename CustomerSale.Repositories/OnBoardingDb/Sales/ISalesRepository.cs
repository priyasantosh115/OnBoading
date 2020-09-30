using CustomerSale.DomainModel;
using System;
using System.Collections.Generic;

namespace CustomerSale.Repositories.OnBoardingDb
{
    public interface ISalesRepository
    {
        void Create(Sales sales);
        IEnumerable<Sales> GetAll();
        Sales GetById(int Id);
        void Update(Sales salesChanges);
        void Delete(int Id);
    }
}
