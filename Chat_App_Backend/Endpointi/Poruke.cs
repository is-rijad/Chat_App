using Chat_App_Backend.Data;
using Chat_App_Backend.Modeli;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Chat_App_Backend.Endpointi {
    [ApiController]
    [Route("[controller]/[action]")]
    public class Poruke : ControllerBase {
        private readonly DataContext _dataContext;

        public Poruke(DataContext context)
        {
            _dataContext = context;
        }

        [HttpPost]
        public async Task DodajPoruku([FromBody] Poruka poruka)
        {
            await _dataContext.Poruke.AddAsync(new Poruka()
            {
                OdKorisnika = poruka.OdKorisnika,
                Sadrzaj = poruka.Sadrzaj
            });
            await _dataContext.SaveChangesAsync();
        }
        [HttpGet]
        public async Task<List<Poruka>> GetAll()
        {
            return await _dataContext.Poruke.ToListAsync();
        }

    }
}
