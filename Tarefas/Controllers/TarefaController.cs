using Microsoft.AspNetCore.Mvc;
using Tarefas.Models;
using Microsoft.EntityFrameworkCore;

namespace Tarefas.Controllers
{
    public class TarefaController : Controller
    {
        private readonly AppDbContext _context;

        public TarefaController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var tarefas = _context.Tarefas.ToList();
            return View(tarefas);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Tarefa tarefa)
        {
            if (ModelState.IsValid)
            {
                tarefa.CriadaEm = tarefa.CriadaEm == default ? DateTime.Now : tarefa.CriadaEm;
                _context.Tarefas.Add(tarefa);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(tarefa);
        }

        // ✅ Corrigido: suporta modal via AJAX ou acesso direto
        public IActionResult Edit(int id)
        {
            var tarefa = _context.Tarefas.Find(id);
            if (tarefa == null) return NotFound();

            if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
            {
                // Retorna somente o modal, para AJAX
                return PartialView("_EditModal", tarefa);
            }

            // Retorna a View completa (ex: se acessar diretamente /Tarefa/Edit/5)
            return View(tarefa);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Tarefa tarefa)
        {
            if (ModelState.IsValid)
            {
                _context.Tarefas.Update(tarefa);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(tarefa);
        }

        public IActionResult Delete(int id)
        {
            var tarefa = _context.Tarefas.Find(id);
            if (tarefa == null) return NotFound();
            return View(tarefa);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            var tarefa = _context.Tarefas.Find(id);
            if (tarefa != null)
            {
                _context.Tarefas.Remove(tarefa);
                _context.SaveChanges();
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public IActionResult ToggleFavorita(int id)
        {
            var tarefa = _context.Tarefas.Find(id);
            if (tarefa == null)
                return NotFound();
            tarefa.Favorita = !tarefa.Favorita;
            _context.Tarefas.Update(tarefa);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public IActionResult ToggleConcluida(int id)
        {
            var tarefa = _context.Tarefas.Find(id);
            if (tarefa == null)
                return NotFound();
            tarefa.Concluida = !tarefa.Concluida;
            tarefa.ConcluidaEm = tarefa.Concluida ? DateTime.Now : null;
            _context.Tarefas.Update(tarefa);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }
    }
}
