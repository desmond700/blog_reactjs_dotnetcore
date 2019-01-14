using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog_DotNetCore.Models
{
  public class Blogger
  {
    public int Id { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Image { get; set; }
    public string Timestamp { get; set; }
    public bool Is_Admin { get; set; }
    public int NumOfPostsMade { get; set; }
    public int NumOfCommentsMade { get; set; }
  }
}
