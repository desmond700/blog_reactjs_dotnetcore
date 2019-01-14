using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Blog_DotNetCore.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Blog_DotNetCore.Controllers
{
  public partial class BloggerData
  {
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public byte[] Image { get; set; }
  }

  public partial class CommentData
  {
    public int post_id { get; set; }
    public int blogger_id { get; set; }
    public string comment { get; set; }
  }

  public partial class ReplyData
  {
    public int comment_id { get; set; }
    public int post_id { get; set; }
    public int blogger_id { get; set; }
    public string comment { get; set; }
  }

  public partial class CommentLikeData
  {
    public int comment_id { get; set; }
    public int post_id { get; set; }
    public int blogger_id { get; set; }
  }

  public partial class PostLikeData
  {
    public int post_id { get; set; }
    public int blogger_id { get; set; }
  }

  [Route("api/[controller]")]
  public class BlogDataController : Controller
  {
    private readonly IHostingEnvironment _environment;

    public BlogDataController(IHostingEnvironment environment)
    {
      _environment = environment ?? throw new ArgumentNullException(nameof(environment));
    }

    [HttpPost("[action]")]
    public Admin GetAdmin(string username, string password)
    {
        BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

        return context.FindAdmin(username, password);
    }

    private int getAdminIdFromBloggers(int id)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      var email = context.getAdminEmail(id);

      return context.getAdminBloggerId(email);
    }
    
    [HttpPost("[action]")]
    public async Task<dynamic> MakePost(int id, bool isAdmin, IFormCollection data)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      if (ModelState.IsValid)
      {
        
        Post post = new Post()
        {
          Post_title = data["title"],
          Article = data["article"].ToString(),
          Post_type = int.Parse(data["category"]),
          Blogger_id = isAdmin ? getAdminIdFromBloggers(id) : id,
        };

        if (data.Files["feature"] != null && data.Files["feature"].Length > 0)
        {
          var fileName = Path.GetFileName(data.Files["feature"].FileName);
          var filePath = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp\\public\\images\\feature", fileName);
          using (var fileSteam = new FileStream(filePath, FileMode.Create))
          {
            await data.Files["feature"].CopyToAsync(fileSteam);
          }
          post.Post_feature_img = fileName;
        }
        
        return context.MakePost(post);
      }


      return string.Join(" | ", ModelState.Values
          .SelectMany(v => v.Errors)
          .Select(e => e.ErrorMessage)); ;
      
    }

    [HttpPost("[action]")]
    public Blogger GetBlogger(string email, string password)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      return context.FindBlogger(email, password);
    }

    [HttpGet("[action]")]
    public dynamic GetBloggers(bool isAdmin)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      return isAdmin ? context.GeBloggers() : "Must be admin to access this data.";
    }

    [HttpGet("[action]")]
    public dynamic Test()
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      return _environment.ContentRootPath;
    }

    [HttpGet("[action]")]
    public dynamic GetRecentPosts()
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      return context.GetRecentPosts();
    }

    [HttpPost("[action]")]
    public async Task<dynamic> RegisterBlogger(IFormCollection data, bool isAdmi)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      if (!ModelState.IsValid)
      {
        return string.Join(" | ", ModelState.Values
          .SelectMany(v => v.Errors)
          .Select(e => e.ErrorMessage)); ;
      }

      Blogger blogger = new Blogger()
      {
        Firstname = data["firstname"],
        Lastname = data["lastname"],
        Username = data["username"],
        Email = data["email"],
        Password = data["password"]
      };

      if(data.Files["imageFile"] != null && data.Files["imageFile"].Length > 0)
        {
        var fileName = Path.GetFileName(data.Files["imageFile"].FileName);
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp\\public\\images\\users", fileName);
        using (var fileSteam = new FileStream(filePath, FileMode.Create))
        {
          await data.Files["imageFile"].CopyToAsync(fileSteam);
        }
        blogger.Image = fileName;
      }

      return context.RegisterBlogger(blogger);
    }

    [HttpGet("[action]")]
    public dynamic GetPost(int id)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      return context.FindPost(id);
    }

    [HttpGet("[action]")]
    public dynamic GetBloggersPosts(int id, bool isAdmin)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      return context.GetPosts(isAdmin ? getAdminIdFromBloggers(id) : id);
    }

    [HttpPost("[action]")]
    public dynamic AddComment([FromBody] CommentData data, bool isAdmin)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      if (!ModelState.IsValid)
      {
        return string.Join(" | ", ModelState.Values
          .SelectMany(v => v.Errors)
          .Select(e => e.ErrorMessage));
      }
        

      Comment comment = new Comment()
      {
        Post_id = data.post_id,
        Blogger_id = isAdmin ? getAdminIdFromBloggers(data.blogger_id) : data.blogger_id,
        Comment_text = data.comment
      };

      return context.AddComment(comment);

    }

    [HttpGet("[action]")]
    public dynamic GetComments(int id, bool isAdmin)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      return context.GetPosts(isAdmin ? getAdminIdFromBloggers(id) : id);
    }

    [HttpPost("[action]")]
    public dynamic AddReply([FromBody] ReplyData data, bool isAdmin)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      if (!ModelState.IsValid)
      {
        return string.Join(" | ", ModelState.Values
          .SelectMany(v => v.Errors)
          .Select(e => e.ErrorMessage));
      }


      Comment comment = new Comment()
      {
        Comment_id = data.comment_id,
        Post_id = data.post_id,
        Blogger_id = isAdmin ? getAdminIdFromBloggers(data.blogger_id) : data.blogger_id,
        Comment_text = data.comment
      };

      return context.AddReply(comment);
    }

    [HttpPost("[action]")]
    public dynamic AddCommentLike([FromBody] CommentLikeData data, bool isAdmin)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      if (!ModelState.IsValid)
      {
        return string.Join(" | ", ModelState.Values
          .SelectMany(v => v.Errors)
          .Select(e => e.ErrorMessage));
      }


      Comment comment = new Comment()
      {
        Comment_id = data.comment_id,
        Post_id = data.post_id,
        Blogger_id = isAdmin ? getAdminIdFromBloggers(data.blogger_id) : data.blogger_id
      };

      return context.AddCommentLike(comment);
    }

    [HttpPost("[action]")]
    public dynamic AddPostLike([FromBody] PostLikeData data, bool isAdmin)
    {
      BlogContext context = HttpContext.RequestServices.GetService(typeof(BlogContext)) as BlogContext;

      if (!ModelState.IsValid)
      {
        return string.Join(" | ", ModelState.Values
          .SelectMany(v => v.Errors)
          .Select(e => e.ErrorMessage));
      }


      Comment comment = new Comment()
      {
        Post_id = data.post_id,
        Blogger_id = isAdmin ? getAdminIdFromBloggers(data.blogger_id) : data.blogger_id,
      };

      return context.AddPostLike(comment);
    }
  }
}
