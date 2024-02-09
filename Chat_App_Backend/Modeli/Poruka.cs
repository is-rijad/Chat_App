using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chat_App_Backend.Modeli {
    [Table("Poruke")]
    public class Poruka {
        [Key] 
        public int Id { get; set; }
        [Required]
        public string OdKorisnika { get; set; }
        public string ZaKorisnika { get; set; } = null!;
        [Required]
        public string Sadrzaj { get; set; }
    }
}
