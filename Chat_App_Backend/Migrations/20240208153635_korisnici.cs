using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chat_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class korisnici : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AktivniKorisnici",
                columns: table => new
                {
                    KonekcijaId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AktivniKorisnici", x => x.KonekcijaId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AktivniKorisnici");
        }
    }
}
