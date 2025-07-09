using Microsoft.EntityFrameworkCore;
using Tarefas.Models;

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    // Esta propriedade representa a tabela de tarefas no banco de dados.
    // Permite consultar, adicionar, atualizar e remover tarefas usando o Entity Framework.
    public DbSet<Tarefa> Tarefas { get; set; }

}