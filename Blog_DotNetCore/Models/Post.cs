using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog_DotNetCore.Models
{
  public class Post
  {
    public int Post_id { get; set; }
    public string Post_title { get; set; }
    public string Post_feature_img { get; set; }
    public string Post_date { get; set; }
    public string Article { get; set; }
    public string Post_status { get; set; }
    public string author { get; set; }
    public string category { get; set; }
    public int Post_type { get; set; }
    public int Post_like_count { get; set; }
    public int Post_comment_count { get; set; }
    public Boolean Post_has_article { get; set; }
    public int Blogger_id { get; set; }
    public List<Comment> Comments = new List<Comment>();

    public List<Comment> getComments()
    {
      return Comments;
    }

    public void setComments(List<Comment> comments)
    {
      Comments = comments;
    }
  }
}
