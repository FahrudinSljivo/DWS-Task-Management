using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using dto;
using Microsoft.AspNetCore.Authorization;
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
    //[Authorize]
    public class GroupsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private UserManager<ApplicationUser> _userManager;

        public GroupsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Groups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserGroup>>> Getgroups()
        {

            //var user = await _userManager.FindByIdAsync(id);
            //return _context.Users.Where(u => u.Id == id).Include(user => user.UserGroup).ThenInclude(ug => ug.Group);
            //return await _context.groups.ToListAsync();
            //var groups = _context.groups.FromSqlRaw("SELECT groups.* FROM userGroups LEFT JOIN groups ON userGroups.GroupId = groups.GroupId WHERE userGroups.UserId =  " + id).ToList();
            //return groups;

            var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            return _context.userGroups.Where(ug => ug.UserId == id).Include(ug => ug.Group).ToList();

        }

        // GET: api/Groups/Users
        [HttpGet("{groupId}/users")]
        public async Task<ActionResult<List<UserGroup>>> GetGroupUsers(int groupId)
        {

            var users = await _context.userGroups.Where(ug => ug.GroupId == groupId).Include(ug => ug.User).ToListAsync();
            return Ok(users);
        }

        // GET: api/Groups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> GetGroup(int id)
        {

            var @group = await _context.groups.Where(g => g.GroupId == id).Include(g => g.ListOfTasks).SingleOrDefaultAsync();

            if (@group == null)
            {
                return NotFound();
            }

            return @group;
        }

        // PUT: api/Groups/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroup(int id, Group @group)
        {
            if (id != @group.GroupId)
            {
                return BadRequest();
            }

            _context.Entry(@group).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupExists(id))
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

        // POST: api/Groups
        [HttpPost]
        public async Task<ActionResult<Group>> PostGroup(groupDto groupDto)
        {
            Group group = new Group
            {
                Name = groupDto.Name,
            };

            UserGroup ug = new UserGroup { UserId = groupDto.Token, Group = group };


            _context.userGroups.Add(ug);
            await _context.SaveChangesAsync();
            return Ok(group);


        }

        // DELETE: api/Groups/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Group>> DeleteGroup(int id)
        {
            var @group = await _context.groups.FindAsync(id);
            if (@group == null)
            {
                return NotFound();
            }

            _context.groups.Remove(@group);
            await _context.SaveChangesAsync();

            return @group;
        }

        private bool GroupExists(int id)
        {
            return _context.groups.Any(e => e.GroupId == id);
        }

        ///groups/:id
        [HttpPost("{groupId}")]
        public async Task<ActionResult> addUser(int groupId, userDto userDto) {

            var user = await _context.Users.Where(c => c.UserName == userDto.UserName).SingleOrDefaultAsync();

            var ug = new UserGroup
            {
                GroupId = groupId,
                UserId = user.Id
            };
            _context.userGroups.Add(ug);
            await _context.SaveChangesAsync();
            return Ok();
        } 
    }
}
