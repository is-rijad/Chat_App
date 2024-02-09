using Chat_App_Backend.Data;
using Chat_App_Backend.Modeli;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Chat_App_Backend.Endpointi {
    [ApiController]
    [Route("GetAktivneKorisnike")]
    public class GetAktivneKorisnike {
        private readonly DataContext _dataContext;

        public GetAktivneKorisnike(DataContext context)
        {
            _dataContext = context;
        }
        [HttpGet]
        public async Task<List<Korisnik>> GetAktivne()
        {
            return await _dataContext.AktivniKorisnici.ToListAsync();
        }
    }
}
