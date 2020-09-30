using CustomerSale.DomainModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CustomerSale.Repositories.Common.DatabaseContext.OnBoardingDb.EntityMappings
{
    class SalesConfiguration : IEntityTypeConfiguration<Sales>
    {
        public void Configure(EntityTypeBuilder<Sales> builder)
        {
            builder.HasKey(c => c.Id).Metadata.IsPrimaryKey();
            builder.Property(c => c.CustomerId).IsRequired();
            builder.Property(c => c.ProductId).IsRequired();
            builder.Property(c => c.StoreId).IsRequired();
            builder.Property(c => c.SoldDate).IsRequired();
        }
    }
}
