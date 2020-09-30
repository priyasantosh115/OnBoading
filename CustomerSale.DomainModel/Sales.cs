using System;
using System.ComponentModel.DataAnnotations;

namespace CustomerSale.DomainModel
{
    public class Sales
    {
        [Key]
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int StoreId { get; set; }
        [Required(ErrorMessage = "Please enter SoldDate")]
        public DateTime SoldDate { get; set; }

        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
