using System;
using Microsoft.EntityFrameworkCore;
namespace WeatherForecast.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
            
        }

        public DbSet<TodoItem> WeatherData { get; set; }
    }
}
