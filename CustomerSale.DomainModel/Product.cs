using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CustomerSale.DomainModel
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Name { get; set; }
        public decimal Price { get; set; }
        public virtual ICollection<Sales> Sales { get; set; }
    }
}
