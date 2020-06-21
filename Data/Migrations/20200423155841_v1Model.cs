using Microsoft.EntityFrameworkCore.Migrations;

namespace todoapp.Data.Migrations
{
    public partial class v1Model : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userGroups_AspNetUsers_UserId",
                table: "userGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_userGroups",
                table: "userGroups");

            migrationBuilder.DropIndex(
                name: "IX_userGroups_UserId",
                table: "userGroups");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "userGroups");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "userGroups",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_userGroups",
                table: "userGroups",
                columns: new[] { "UserId", "GroupId" });

            migrationBuilder.AddForeignKey(
                name: "FK_userGroups_AspNetUsers_UserId",
                table: "userGroups",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userGroups_AspNetUsers_UserId",
                table: "userGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_userGroups",
                table: "userGroups");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "userGroups",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "userGroups",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_userGroups",
                table: "userGroups",
                columns: new[] { "Id", "GroupId" });

            migrationBuilder.CreateIndex(
                name: "IX_userGroups_UserId",
                table: "userGroups",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_userGroups_AspNetUsers_UserId",
                table: "userGroups",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
