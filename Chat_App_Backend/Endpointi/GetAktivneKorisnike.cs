using Chat_App_Backend.Data;
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
        public async Task<List<string>> GetAktivne()
        {
            return await _dataContext.AktivniKorisnici.Select(k => k.KorisnickoIme).ToListAsync();
        }
    }
}
