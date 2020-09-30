using CustomerSale.DomainModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CustomerSale.Repositories.Common.DatabaseContext.OnBoardingDb.EntityMappings
{
    class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(c => c.Id).Metadata.IsPrimaryKey();
            builder.Property(c => c.Name).HasMaxLength(20).IsRequired();
            builder.Property(c => c.Price).IsRequired();
        }
    }
}
