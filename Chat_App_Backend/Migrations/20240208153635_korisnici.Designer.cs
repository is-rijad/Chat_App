﻿// <auto-generated />
using Chat_App_Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Chat_App_Backend.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240208153635_korisnici")]
    partial class korisnici
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Chat_App_Backend.Modeli.Korisnik", b =>
                {
                    b.Property<string>("KonekcijaId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("KorisnickoIme")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("KonekcijaId");

                    b.ToTable("AktivniKorisnici");
                });
#pragma warning restore 612, 618
        }
    }
}