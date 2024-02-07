using Chat_App_Backend.Helperi;
using Chat_App_Backend.Modeli;
using Microsoft.AspNetCore.SignalR;

namespace Chat_App_Backend.Endpointi {
    public class ChatHub : Hub {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ChatHub(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task PosaljiPoruku(Poruka poruka)
        {
            poruka.OdKorisnika = _httpContextAccessor.HttpContext!.Request.Cookies[Konstante.KorisnickoIme];
            if (poruka.OdKorisnika == null)
            {
                throw new Exception("Greska! Korisnik ne postoji!");
            }
            await Clients.All.SendAsync("PrimiPoruku", poruka);
        }
        public async Task KorisnikSePridruzio() {
            var korisnik = _httpContextAccessor.HttpContext!.Request.Cookies[Konstante.KorisnickoIme];
            if (korisnik == null) {
                throw new Exception("Greska! Korisnik ne postoji!");
            }

            var poruka = new Poruka()
            {
                OdKorisnika = korisnik,
                Sadrzaj = $"{korisnik} se pridružio grupnom chatu!"
            };
            await Clients.All.SendAsync("KorisnikSePridruzio", poruka);
        }
    }
}
