using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog_DotNetCore.Models
{
  public class Comment
  {
    public int Comment_id { get; set; }
    public int Post_id { get; set; }
    public int Blogger_id { get; set; }
    public string Bloggers_img { get; set; }
    public string Username { get; set; }
    public int CommentLikeCount { get; set; }
    public string Comment_text { get; set; }
    public string Comment_date { get; set; }
    public List<Comment> Reply = new List<Comment>();

    public List<Comment> GetReplies()
    {
      return Reply;
    }

    public void SetReplies(List<Comment> comment) {
      Reply = comment;
    }
  }
}
