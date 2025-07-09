using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tarefas.Migrations
{
    /// <inheritdoc />
    public partial class CriarCampoFavorita : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Favorita",
                table: "Tarefas",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Favorita",
                table: "Tarefas");
        }
    }
}
