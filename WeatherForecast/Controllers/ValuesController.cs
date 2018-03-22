using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeatherForecast.Models;
using System.Globalization;

namespace WeatherForecast.Controllers
{
    [Route("api/[controller]")]
    public class ForecastController : Controller
    {

        private readonly TodoContext _context;

        public ForecastController(TodoContext context)
        {
            _context = context;


        }


        // GET api/values/5
        [HttpGet("{id}")]
        public List<TodoItem> Get(string id)
        {
            List<TodoItem> forecastreport = new List<TodoItem>();
            DateTime reportDate;
            bool isDate = DateTime.TryParseExact(id, "yyyyMMdd",
                                       CultureInfo.InvariantCulture,
                                       DateTimeStyles.None, out reportDate);
            reportDate = reportDate.AddDays(-1);


            while (forecastreport.Count < 7)
            {
                reportDate = reportDate.AddDays(1);
                TodoItem todoitem = _context.WeatherData.SingleOrDefault(m => m.DATE.ToString() == reportDate.ToString("yyyyMMdd"));

                if (todoitem == null)
                {
                    todoitem = new TodoItem();
                    var dateData = _context.WeatherData.Where(x => x.DATE.ToString().Contains(reportDate.ToString("MMdd")));
                    todoitem.DATE = reportDate.ToString("yyyyMMdd");

                    todoitem.TMAX = Math.Round((dateData.Sum(x => x.TMAX) / dateData.Count()), 2);
                    todoitem.TMIN = Math.Round((dateData.Sum(x => x.TMIN) / dateData.Count()), 2);
                    forecastreport.Add(todoitem);
                }
                else
                {
                    forecastreport.Add(todoitem);
                }

            }
            return forecastreport;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
