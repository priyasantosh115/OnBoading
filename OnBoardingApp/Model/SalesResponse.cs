using CustomerSale.DomainModel;
using System.Collections.Generic;

namespace OnBoardingApp.Model
{
    public class SalesResponse
    {
        public Sales Sale { get; set; }
        public IEnumerable<Sales> Sales { get; set; }
        public IEnumerable<Customer> Customers { get; set; }
        public IEnumerable<Product> Products { get; set; }
        public IEnumerable<Store> Stores { get; set; }
    }
}
