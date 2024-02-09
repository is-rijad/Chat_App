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
        public async Task PosaljiPoruku(string sadrzaj)
        {
            var poslaoKorisnik = _httpContextAccessor.HttpContext!.Request.Query[Konstante.KorisnickoIme][0];
            if (poslaoKorisnik == null)
            {
                throw new Exception("Greska! Korisnik ne postoji!");
            }

            var poruka = new Poruka()
            {
                OdKorisnika = poslaoKorisnik,
                Sadrzaj = sadrzaj
            };
            await Clients.All.SendAsync("PrimiPoruku", poruka);
        }

        public override async Task OnConnectedAsync()
        {
            var korisnickoIme = _httpContextAccessor.HttpContext!.Request.Query[Konstante.KorisnickoIme][0];
            var konekcijaId = Context.ConnectionId;
            
            if (korisnickoIme == null) {
                throw new Exception("Greska! Korisnik ne postoji!");
            }

            var poruka = new Poruka()
            {
                OdKorisnika = korisnickoIme,
                Sadrzaj = $"{korisnickoIme} se pridružio grupnom chatu!"
            };
            await _dataContext.AktivniKorisnici.AddAsync(new Korisnik()
            {
                KorisnickoIme = korisnickoIme,
                KonekcijaId = konekcijaId
            });
            await _dataContext.SaveChangesAsync();

            await Clients.Others.SendAsync("KorisnikSePridruzio", poruka);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var korisnickoIme = _httpContextAccessor.HttpContext!.Request.Query[Konstante.KorisnickoIme][0];
            var konekcijaId = Context.ConnectionId;
            if (korisnickoIme == null) {
                throw new Exception("Greska! Korisnik ne postoji!");
            }

            var poruka = new Poruka()
            {
                OdKorisnika = korisnickoIme,
                Sadrzaj = $"{korisnickoIme} izašao iz grupnog chata!"
            };
            var korisnikObjekat =
                await _dataContext.AktivniKorisnici.FirstOrDefaultAsync(k => k.KonekcijaId == konekcijaId);
            _dataContext.AktivniKorisnici.Remove(korisnikObjekat);
            await _dataContext.SaveChangesAsync();
            await Clients.Others.SendAsync("KorisnikSeOdjavio", poruka);
            await base.OnDisconnectedAsync(exception);
        }
<<<<<<< Updated upstream
=======

        public async Task<string> ZapocniPrivatniChat(string konekcijaId)
        {
            var konekcijaIdZapoceo = Context.ConnectionId;
            var zapoceoKorisnik = (await
                _dataContext.AktivniKorisnici.FirstOrDefaultAsync(ak => ak.KonekcijaId == konekcijaIdZapoceo))?.KorisnickoIme;
            var saKorisnikom = (await
                _dataContext.AktivniKorisnici.FirstOrDefaultAsync(ak => ak.KonekcijaId == konekcijaId))?.KorisnickoIme;
            if (zapoceoKorisnik == null)
                throw new Exception("Niste konektovani");
            if (saKorisnikom == null)
                throw new Exception("Korisnik nije konektovan");
            await Clients.Client(konekcijaId).SendAsync("ZapoceoPrivatniChat", zapoceoKorisnik);
            var imeGrupe = zapoceoKorisnik + saKorisnikom;
            await Groups.AddToGroupAsync(konekcijaIdZapoceo, imeGrupe);
            await Groups.AddToGroupAsync(konekcijaId, imeGrupe);
            return saKorisnikom;
        }
>>>>>>> Stashed changes
    }
}
