using Microsoft.EntityFrameworkCore;
using Tarefas.Models;

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Tarefa> Tarefas { get; set; }

}