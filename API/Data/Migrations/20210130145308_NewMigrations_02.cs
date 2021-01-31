using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class NewMigrations_02 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Connections_ConnectionsCallerConnectionId",
                table: "Groups");

            migrationBuilder.DropIndex(
                name: "IX_Groups_ConnectionsCallerConnectionId",
                table: "Groups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Connections",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "ConnectionsCallerConnectionId",
                table: "Groups");

            migrationBuilder.AlterColumn<string>(
                name: "CallerConnectionId",
                table: "Connections",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Connections",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<string>(
                name: "GroupName",
                table: "Connections",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Connections",
                table: "Connections",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Connections_GroupName",
                table: "Connections",
                column: "GroupName");

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_Groups_GroupName",
                table: "Connections",
                column: "GroupName",
                principalTable: "Groups",
                principalColumn: "Name",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Connections_Groups_GroupName",
                table: "Connections");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Connections",
                table: "Connections");

            migrationBuilder.DropIndex(
                name: "IX_Connections_GroupName",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "GroupName",
                table: "Connections");

            migrationBuilder.AddColumn<string>(
                name: "ConnectionsCallerConnectionId",
                table: "Groups",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CallerConnectionId",
                table: "Connections",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Connections",
                table: "Connections",
                column: "CallerConnectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_ConnectionsCallerConnectionId",
                table: "Groups",
                column: "ConnectionsCallerConnectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Connections_ConnectionsCallerConnectionId",
                table: "Groups",
                column: "ConnectionsCallerConnectionId",
                principalTable: "Connections",
                principalColumn: "CallerConnectionId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
