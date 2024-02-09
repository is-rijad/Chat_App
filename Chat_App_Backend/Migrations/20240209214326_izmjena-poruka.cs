using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chat_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class izmjenaporuka : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ZaKorisnika",
                table: "Poruke");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ZaKorisnika",
                table: "Poruke",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
