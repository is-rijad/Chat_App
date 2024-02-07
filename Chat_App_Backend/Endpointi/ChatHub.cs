using Chat_App_Backend.Data;
using Chat_App_Backend.Helperi;
using Chat_App_Backend.Modeli;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Chat_App_Backend.Endpointi {
    public class ChatHub : Hub {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _dataContext;

        public ChatHub(IHttpContextAccessor httpContextAccessor,
                        DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _dataContext = context;
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

        public async Task KorisnikSePridruzio()
        {
            var korisnik = _httpContextAccessor.HttpContext!.Request.Cookies[Konstante.KorisnickoIme];
            if (korisnik == null)
            {
                throw new Exception("Greska! Korisnik ne postoji!");
            }

            var poruka = new Poruka()
            {
                OdKorisnika = korisnik,
                Sadrzaj = $"{korisnik} se pridružio grupnom chatu!"
            };
            if (await _dataContext.AktivniKorisnici.FirstOrDefaultAsync(k => k.KorisnickoIme == korisnik) == null)
            {
                await _dataContext.AktivniKorisnici.AddAsync(new Korisnik() { KorisnickoIme = korisnik });
                await _dataContext.SaveChangesAsync();
            }

            await Clients.Others.SendAsync("KorisnikSePridruzio", poruka);
        }
        public async Task KorisnikSeOdjavio() {
            var korisnik = _httpContextAccessor.HttpContext!.Request.Cookies[Konstante.KorisnickoIme];
            if (korisnik == null) {
                throw new Exception("Greska! Korisnik ne postoji!");
            }

            var poruka = new Poruka()
            {
                OdKorisnika = korisnik,
                Sadrzaj = $"{korisnik} izašao iz grupnog chata!"
            };
            _dataContext.AktivniKorisnici.Remove(await _dataContext.AktivniKorisnici.FirstOrDefaultAsync(k => k.KorisnickoIme == korisnik));
            await _dataContext.SaveChangesAsync();
            await Clients.Others.SendAsync("KorisnikSeOdjavio", poruka);
        }
    }
}
