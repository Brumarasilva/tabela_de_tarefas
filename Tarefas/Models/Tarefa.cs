namespace Tarefas.Models
{
    public class Tarefa
    {
        public int Id { get; set; }
        public string? Descricao { get; set; }
        public bool Concluida { get; set; }
        public DateTime CriadaEm { get; set; }
        public DateTime? ConcluidaEm { get; set; }
        public bool Favorita { get; set; } = false; // Adicionando a propriedade Favorita com valor padrão false
        public string? Categoria { get; set; }
        public DateTime? DataExecucao { get; set; } // Data e hora que o usuário precisa executar a tarefa
    }
}
