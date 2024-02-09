using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chat_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class dodaneporukeikorisnici : Migration
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

            migrationBuilder.CreateTable(
                name: "Poruke",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OdKorisnika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZaKorisnika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sadrzaj = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poruke", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AktivniKorisnici");

            migrationBuilder.DropTable(
                name: "Poruke");
        }
    }
}
