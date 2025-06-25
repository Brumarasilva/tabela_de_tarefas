using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Tarefas.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Tarefas.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly AppDbContext _context;

    public HomeController(ILogger<HomeController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    [HttpGet]
    public IActionResult TestarConexao()
    {
        try
        {
            var conn = _context.Database.GetDbConnection();
            conn.Open();
            conn.Close();
            return Content("Conexão com o banco de dados bem-sucedida!");
        }
        catch (Exception ex)
        {
            return Content($"Erro ao conectar com o banco de dados: {ex.Message}");
        }
    }
}
