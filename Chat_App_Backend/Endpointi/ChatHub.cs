﻿using System.Diagnostics;
using Chat_App_Backend.Data;
using Chat_App_Backend.Helperi;
using Chat_App_Backend.Modeli;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Chat_App_Backend.Endpointi {
    public class ChatHub : Hub {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _dataContext;

        private string? _privatniChatKonekcija = null;
        private string? _privatniChatGrupa = null;

        public ChatHub(IHttpContextAccessor httpContextAccessor,
                        DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _dataContext = context;
        }
        public async Task PosaljiPoruku(string sadrzaj, string imeGrupe = null)
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
            if (imeGrupe == null)
                await Clients.All.SendAsync("PrimiPoruku", poruka, null);
            else
                await Clients.Group(imeGrupe).SendAsync("PrimiPoruku", poruka, imeGrupe);
        }

        public override async Task OnConnectedAsync()
        {
            var korisnickoIme = _httpContextAccessor.HttpContext!.Request.Query[Konstante.KorisnickoIme][0];
            var konekcijaId = Context.ConnectionId;
            
            if (korisnickoIme == null) {
                throw new Exception("Greska! Korisnik ne postoji!");
            }

            var poruka = $"{korisnickoIme} se pridružio grupnom chatu!";

            var korisnik = new Korisnik()
            {
                KorisnickoIme = korisnickoIme,
                KonekcijaId = konekcijaId
            };
            await _dataContext.AktivniKorisnici.AddAsync(korisnik);
            await _dataContext.SaveChangesAsync();

            await Clients.Others.SendAsync("KorisnikSePridruzio",korisnik, poruka);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if(_privatniChatKonekcija != null)
                await ZavrsiPrivatniChat(_privatniChatKonekcija, _privatniChatGrupa);
            var korisnickoIme = _httpContextAccessor.HttpContext!.Request.Query[Konstante.KorisnickoIme][0];
            var konekcijaId = Context.ConnectionId;
            if (korisnickoIme == null) {
                throw new Exception("Greska! Korisnik ne postoji!");
            }

            var poruka = $"{korisnickoIme} je izašao iz grupnog chata!";
            var korisnikObjekat =
                await _dataContext.AktivniKorisnici.FirstOrDefaultAsync(k => k.KonekcijaId == konekcijaId);
            _dataContext.AktivniKorisnici.Remove(korisnikObjekat);
            await _dataContext.SaveChangesAsync();
            await Clients.Others.SendAsync("KorisnikSeOdjavio", korisnikObjekat, poruka);
            await base.OnDisconnectedAsync(exception);
        }

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
            var imeGrupe = zapoceoKorisnik + saKorisnikom;

            _privatniChatKonekcija = konekcijaId;
            _privatniChatGrupa = imeGrupe;

            await Clients.Client(konekcijaId).SendAsync("ZapoceoPrivatniChat", konekcijaIdZapoceo, zapoceoKorisnik, imeGrupe);
            await Groups.AddToGroupAsync(konekcijaIdZapoceo, imeGrupe);
            await Groups.AddToGroupAsync(konekcijaId, imeGrupe);
            return imeGrupe;
        }

        public async Task ZavrsiPrivatniChat(string konekcijaId, string imeGrupe)
        {
            _privatniChatKonekcija = null;
            _privatniChatGrupa = null;
            var konekcijaIdZavrsio = Context.ConnectionId;
            var imeKorisnika =
                (await _dataContext.AktivniKorisnici.FirstOrDefaultAsync(ak => ak.KonekcijaId == konekcijaId))!
                .KorisnickoIme;
            await Clients.OthersInGroup(imeGrupe).SendAsync("ZavrsioPrivatniChat", imeKorisnika);
            await Groups.RemoveFromGroupAsync(konekcijaIdZavrsio, imeGrupe);
            await Groups.RemoveFromGroupAsync(konekcijaId, imeGrupe);
        }
    }
}
