using System;

namespace DAL
{
    public class Customer
    {
        //[Key]
        public int Id { get; set; }
        //[Column(TypeName = "nvarchar(20)")]
        public string Name { get; set; }
        //[Column(TypeName = "nvarchar(50)")]
        public string Address { get; set; }
    }
}
