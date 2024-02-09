using Chat_App_Backend.Modeli;
using Microsoft.EntityFrameworkCore;

namespace Chat_App_Backend.Data {
    public class DataContext : DbContext {
        public DbSet<Korisnik> AktivniKorisnici { get; set; }
        public DbSet<Poruka> Poruke { get; set; }

        public DataContext(DbContextOptions options) : base(options) {
        }
    }
}
