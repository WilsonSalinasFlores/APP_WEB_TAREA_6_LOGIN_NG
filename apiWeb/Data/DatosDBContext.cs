using apiWeb.Model;
using Microsoft.EntityFrameworkCore;
namespace apiWeb.Data
{
    public class DatosDBContext : DbContext
    {
        public DatosDBContext(DbContextOptions op) : base(op){}
        public DbSet<ClienteModel> Clientes { get; set; }
        public DbSet<UsuarioModel> UsuarioModel { get; set; } = default!;



    }
}
