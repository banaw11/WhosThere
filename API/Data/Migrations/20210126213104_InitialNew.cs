using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class InitialNew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AgeFrom",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "AgeTo",
                table: "Users",
                newName: "MinAge");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MinAge",
                table: "Users",
                newName: "AgeTo");

            migrationBuilder.AddColumn<int>(
                name: "AgeFrom",
                table: "Users",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
