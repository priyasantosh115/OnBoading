using CustomerSale.DomainModel;
using CustomerSale.Repositories.Common.DatabaseContext.OnBoardingDb;
using System.Collections.Generic;
using System.Linq;

namespace CustomerSale.Repositories.OnBoardingDb
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly OnBoardingDbContext _OnBoardingDbContext;

        public CustomerRepository(OnBoardingDbContext dbContext)
        {
            _OnBoardingDbContext = dbContext;
        }

        public void Create(Customer customer)
        {
            _OnBoardingDbContext.Add(customer);
            _OnBoardingDbContext.SaveChanges();
        }

        public void Delete(int Id)
        {
            Customer customer = _OnBoardingDbContext.Customer.FirstOrDefault(e => e.Id == Id);

            if (customer != null)
            {
                _OnBoardingDbContext.Customer.Attach(customer);
                _OnBoardingDbContext.Customer.Remove(customer);
                _OnBoardingDbContext.SaveChanges();
            }
        }

        public IEnumerable<Customer> GetAll()
        {
            return _OnBoardingDbContext.Customer;
        }

        public Customer GetById(int Id)
        {
            Customer customer = _OnBoardingDbContext.Customer.FirstOrDefault(e => e.Id == Id);
            return customer;
        }

        public void Update(Customer customerChanges)
        {
            if (customerChanges != null)
            {
                _OnBoardingDbContext.Customer.Update(customerChanges);
                _OnBoardingDbContext.SaveChanges();
            }
        }
    }
}
