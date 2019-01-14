using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog_DotNetCore.Models
{
  public class Admin
  {
    private BlogContext context;

    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }

    public string TimeStamp { get; set; }

    public string Img { get; set; }

    public bool Is_Admin { get; set; }
  }
}
