using CustomerSale.DomainModel;
using System.Collections.Generic;

namespace CustomerSale.Repositories.OnBoardingDb
{
    public interface ICustomerRepository
    {
        void Create(Customer customer);
        IEnumerable<Customer> GetAll();
        Customer GetById(int Id);
        void Update(Customer customerChanges);
        void Delete(int Id);
    }
}
