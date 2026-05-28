using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTodos()
        {
            var todos = await _context.Todos.ToListAsync();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
                return NotFound(new { message = "Todo not found" });

            return Ok(todo);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTodo([FromBody] TodoCreateDto todoDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var todo = new TodoItem
            {
                Title = todoDto.Title,
                Description = todoDto.Description,
                Priority = todoDto.Priority,
                Category = todoDto.Category,
                IsCompleted = todoDto.IsCompleted,
                CreatedAt = DateTime.UtcNow
            };

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] TodoUpdateDto updatedTodoDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
                return NotFound(new { message = "Todo not found" });

            todo.Title = updatedTodoDto.Title;
            todo.Description = updatedTodoDto.Description;
            todo.Priority = updatedTodoDto.Priority;
            todo.Category = updatedTodoDto.Category;
            todo.IsCompleted = updatedTodoDto.IsCompleted;

            await _context.SaveChangesAsync();

            return Ok(todo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
                return NotFound(new { message = "Todo not found" });

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Todo deleted successfully" });
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchTodos(string keyword)
        {
            var lowerKeyword = keyword.ToLower();
            
            var todos = await _context.Todos
                .Where(t => t.Title.ToLower().Contains(lowerKeyword))
                .ToListAsync();

            return Ok(todos);
        }

        [HttpGet("category/{category}")]
        public async Task<IActionResult> GetByCategory(string category)
        {
            var todos = await _context.Todos
                .Where(t => t.Category.ToLower() == category.ToLower())
                .ToListAsync();

            return Ok(todos);
        }
    }
}