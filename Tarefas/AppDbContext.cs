using Microsoft.EntityFrameworkCore;
using Tarefas.Models;

public class AppDbContext : DbContext
{
    public DbSet<Tarefa> Tarefas { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}