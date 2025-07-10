using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tarefas.Migrations
{
    /// <inheritdoc />
    public partial class AddDataExecucaoDaTarefa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataExecucao",
                table: "Tarefas",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataExecucao",
                table: "Tarefas");
        }
    }
}
