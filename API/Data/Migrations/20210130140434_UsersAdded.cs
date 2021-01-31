using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class UsersAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Connections",
                columns: table => new
                {
                    CallerConnectionId = table.Column<string>(type: "TEXT", nullable: false),
                    OtherConnectionId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connections", x => x.CallerConnectionId);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    ConnectionsCallerConnectionId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Name);
                    table.ForeignKey(
                        name: "FK_Groups_Connections_ConnectionsCallerConnectionId",
                        column: x => x.ConnectionsCallerConnectionId,
                        principalTable: "Connections",
                        principalColumn: "CallerConnectionId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Groups_ConnectionsCallerConnectionId",
                table: "Groups",
                column: "ConnectionsCallerConnectionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "Connections");
        }
    }
}
