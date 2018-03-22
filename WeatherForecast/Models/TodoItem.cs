using System;
using System.ComponentModel.DataAnnotations;

namespace WeatherForecast.Models
{
    public class TodoItem
    {
        [Key]
        public string DATE { get; set; }
        public double TMAX { get; set; }
        public double TMIN { get; set; }

    }
}
