using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class MessageObj
    {
        public string Message  { get; set; }
        public string Type { get; set; }
        public bool Reply { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
    }
}
