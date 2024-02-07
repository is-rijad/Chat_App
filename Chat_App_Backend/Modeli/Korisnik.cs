using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chat_App_Backend.Modeli {
    [Table("AktivniKorisnici")]
    public class Korisnik {
        [Key]
        public int Id { get; set; }
        [Required]
        public string KorisnickoIme { get; set; }
    }
}
