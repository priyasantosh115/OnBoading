using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CustomerSale.DomainModel
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName ="nvarchar(20)")]
        [Required(ErrorMessage = "Please enter Name")]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        [Required(ErrorMessage = "Please enter Address")]
        public string Address { get; set; }
        public virtual ICollection<Sales> Sales { get; set; }
    }
}
