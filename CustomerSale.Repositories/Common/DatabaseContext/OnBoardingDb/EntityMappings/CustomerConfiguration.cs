using CustomerSale.DomainModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CustomerSale.Repositories.Common.DatabaseContext.OnBoardingDb.EntityMappings
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasKey(c => c.Id).Metadata.IsPrimaryKey();
            builder.Property(c=>c.Name).HasMaxLength(20).IsRequired();
            builder.Property(c => c.Address).HasMaxLength(50).IsRequired();
        }
    }
}
