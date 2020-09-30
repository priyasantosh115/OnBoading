using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CustomerSale.DomainModel
{
    public class Store
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
