using CustomerSale.DomainModel;
using CustomerSale.Repositories.Common.DatabaseContext.OnBoardingDb.EntityMappings;
using Microsoft.EntityFrameworkCore;

namespace CustomerSale.Repositories.Common.DatabaseContext.OnBoardingDb
{
    public class OnBoardingDbContext : DbContext
    {
        public DbSet <Customer> Customer { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Store> Store { get; set; }
        public DbSet<Sales> Sales { get; set; }

        public OnBoardingDbContext(DbContextOptions<OnBoardingDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new StoreConfiguration());
            modelBuilder.ApplyConfiguration(new SalesConfiguration());
        }
    }
}
