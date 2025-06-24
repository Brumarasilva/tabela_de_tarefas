using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Tarefa> Tarefas { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}

public class Tarefa
{
    public int Id { get; set; }
    public string Descricao { get; set; }
    public bool Concluida { get; set; }
    public DateTime CriadaEm { get; set; }
    public DateTime? ConcluidaEm { get; set; }
}