using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todoapp.Data;
using todoapp.Models;

namespace todoapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private UserManager<ApplicationUser> userManager;

        private readonly IHttpContextAccessor httpContextAccessor;

        public TodosController(ApplicationDbContext context, UserManager<ApplicationUser> _userManager, IHttpContextAccessor _httpContextAccessor)
        {
            _context = context;
            userManager = _userManager;
            httpContextAccessor = _httpContextAccessor;
        }

        // GET: api/Todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetAllTasks()
        {

            //return await _context.tasks.ToListAsync();
            var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            return _context.tasks.Where(t => t.UserId == id).ToList();

        }



        // GET: api/Todos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(int id)
        {
            var todo = await _context.tasks.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return todo;
        }

        // PUT: api/Todos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(int id)
        {

            var todo = await _context.tasks.Where(c => c.TaskId == id).SingleOrDefaultAsync();
            

            if (id != todo.TaskId)
            {
                return BadRequest();
            }

            todo.IsDone = true;

            _context.Entry(todo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        // POST: api/Todos
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo(taskDto todoDto)
        {

            var priority = _context.priorities.Where(p => p.PriorityId == todoDto.Priority).FirstOrDefault();
            //var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var user = _context.Users.Where(u => u.Id == todoDto.Token).SingleOrDefault();
            var group = _context.groups.Where(g => g.GroupId == todoDto.GroupId).SingleOrDefault();

            Todo todo = new Todo
            {
                TaskName = todoDto.TaskName,
                TaskDescription = todoDto.TaskDescription,
                DateOfExpiry = todoDto.DateOfExpiry,
                User = user,
                Group = group,
                Priority = priority,
            };

            _context.tasks.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodo", new { id = todo.TaskId }, todo);
        }

        // DELETE: api/Todos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Todo>> DeleteTodo(int id)
        {
            var todo = await _context.tasks.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.tasks.Remove(todo);
            await _context.SaveChangesAsync();

            return todo;
        }

        private bool TodoExists(int id)
        {
            return _context.tasks.Any(e => e.TaskId == id);
        }
    }
}
