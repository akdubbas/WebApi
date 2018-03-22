using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeatherForecast.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WeatherForecast.Controllers
{
    [Route("api/[controller]")]
    public class Historical : Controller
    {

        private readonly TodoContext _context;

        public Historical(TodoContext context)
        {
            _context = context;


        }
        // GET: api/values
        public IEnumerable<TodoItem> GetAll()
        {
            return _context.WeatherData;
        }

        // GET api/values/5
        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetById(string id)
        {
            var item = _context.WeatherData.FirstOrDefault(t => t.DATE == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Post([FromBody] TodoItem item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context.WeatherData.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetTodo", new { id = item.DATE }, item);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var todo = _context.WeatherData.Where(t => t.DATE == id).FirstOrDefault();
            if (todo == null)
            {
                return NotFound();
            }

            _context.WeatherData.Remove(todo);
            _context.SaveChanges();
            return Ok("Success");
        }
    }
}
