using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Blog_DotNetCore.Models;
using MySql.Data.MySqlClient;

namespace Blog_DotNetCore.Models
{
  public class BlogContext
  {
    public string ConnectionString { get; set; }

    public BlogContext(string connectionString)
    {
      this.ConnectionString = connectionString;
    }

    private MySqlConnection GetConnection()
    {
      return new MySqlConnection(ConnectionString);
    }

    private string CalculateTimeSinceInserted(string timeStamp)
    {
      DateTime dateThen = Convert.ToDateTime(timeStamp);
      DateTime dateNow = DateTime.Now;
      int numOfMilliseconds = (int)dateNow.Subtract(dateThen).TotalMilliseconds;
      int seconds = numOfMilliseconds / 1000;
      int minutes = seconds / 60;
      int hours = minutes / 60;
      int days = hours / 24;
      int months = days / 30;
      int years = months / 12;

      if (seconds < 60)
      {
        if (seconds == 1)
          return seconds + " second ago";
        else
          return seconds + " seconds ago";
      }
      else if (minutes < 60)
      {
        if (minutes == 1)
          return minutes + " minute ago";
        else
          return minutes + " minutes ago";
      }
      else if (hours < 24)
      {
        if (hours == 1)
          return hours + " hour ago";
        else
          return hours + " hours ago";
      }
      else if (days < 30)
      {
        if (days == 1)
          return days + " day ago";
        else
          return days + " days ago";
      }
      else if (months >= 60 || months <= 365)
      {
        if (months == 1)
          return months + " month ago";
        else
          return months + " months ago";
      }
      else
      {
        if (years == 1)
          return years + " month ago";
        else
          return years + " months ago";
      }
    }
    
    private string GetDate(string dateTime)
    {
      DateTime dateThen = Convert.ToDateTime(dateTime);
      DateTime dateNow = DateTime.Now;

      return dateThen.ToLongDateString().Replace(dateThen.DayOfWeek.ToString(), "")
               .Trim(',', ' ');
    }

    public Admin FindAdmin(string username, string password)
    {
      Admin admin = null;

      using (MySqlConnection conn = GetConnection())
      {
        conn.Open();
        MySqlCommand cmd = new MySqlCommand("SELECT * FROM admin WHERE username=?username AND passwrd=?password", conn);
        cmd.Parameters.AddWithValue("?username", username);
        cmd.Parameters.AddWithValue("?password", password);

        using (var reader = cmd.ExecuteReader())
        {
          if (reader.Read())
          {
            admin = new Admin()
            {
              Id = Convert.ToInt32(reader["admin_id"]),
              FirstName = reader["fname"].ToString(),
              LastName = reader["lname"].ToString(),
              Email = reader["email"].ToString(),
              Username = reader["username"].ToString(),
              Password = reader["passwrd"].ToString(),
              TimeStamp = CalculateTimeSinceInserted(reader["date_joined"].ToString()),
              Img = reader["admin_img"].ToString() ?? null,
              Is_Admin = Convert.ToBoolean(reader["is_admin"])
            };
          }
          return admin;
        }
      }
    }

    public dynamic getAdminEmail(int id)
    {
      try
      {
        using (MySqlConnection conn = GetConnection())
        {
          conn.Open();
          MySqlCommand cmd = new MySqlCommand("getAdminEmail", conn);
          cmd.CommandType = System.Data.CommandType.StoredProcedure;
          cmd.Parameters.Add(new MySqlParameter("id", MySqlDbType.Int32));
          cmd.Parameters["id"].Value = id;
          cmd.Parameters["id"].Direction = System.Data.ParameterDirection.Input;
          cmd.Parameters.Add(new MySqlParameter("emailOut", MySqlDbType.VarChar));
          cmd.Parameters["emailOut"].Direction = System.Data.ParameterDirection.Output;
          cmd.ExecuteNonQuery();
          conn.Close();

          return (string)cmd.Parameters["emailOut"].Value;
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.ToString());
        return ex.Message;
      }

    }

    public dynamic getAdminBloggerId(string email)
    {
      try
      {
        using (MySqlConnection conn = GetConnection())
        {
          conn.Open();
          int result;
          MySqlCommand cmd = new MySqlCommand("getAdminIdFromBloggers", conn);
          cmd.CommandType = System.Data.CommandType.StoredProcedure;
          cmd.Parameters.Add(new MySqlParameter("email", MySqlDbType.VarChar));
          cmd.Parameters["email"].Value = email;
          cmd.Parameters["email"].Direction = System.Data.ParameterDirection.Input;
          cmd.Parameters.Add(new MySqlParameter("id", MySqlDbType.Int32));
          cmd.Parameters["id"].Direction = System.Data.ParameterDirection.Output;
          cmd.ExecuteNonQuery();
          result = (int)cmd.Parameters["id"].Value;
          conn.Close();

          return result;
        }
      }
      catch (Exception ex)
      {
        System.Diagnostics.Debug.WriteLine("getAdminBloggerId: Error inserting mysql row. Error: " + ex.Message);
        return ex.Message;
      }
    }

    public dynamic GetBloggerPostCount(int blogger_id)
    {

      using (MySqlConnection conn = GetConnection())
      {
        try
        {
          conn.Open();
          int result = 0;
          string sql = "SELECT COUNT(*) AS post_count FROM posts p " +
            "INNER JOIN bloggers b ON p.blogger_id = b.blogger_id " +
            "WHERE b.blogger_id = ?id";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?id", blogger_id);

          using (var reader = cmd.ExecuteReader())
          {
            if (reader.Read())
            {
              result = Convert.ToInt32(reader["post_count"]);
            }
          }
          return result;
        }
        catch (MySqlException ex)
        {
          System.Diagnostics.Debug.WriteLine("GetBloggerPostCount: Error inserting mysql row. Error: " + ex.Message);
          return null;
        }

      }
    }

    public dynamic GetBloggerCommentCount(int blogger_id)
    {

      using (MySqlConnection conn = GetConnection())
      {
        try
        {
          conn.Open();
          int result = 0;
          string sql = "SELECT COUNT(*) AS comment_count FROM comments c " +
            "INNER JOIN bloggers b ON c.blogger_id = b.blogger_id " +
            "WHERE b.blogger_id = ?id";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?id", blogger_id);

          using (var reader = cmd.ExecuteReader())
          {
            if (reader.Read())
            {
              result = Convert.ToInt32(reader["comment_count"]);
            }
          }
          return result;
        }
        catch (MySqlException ex)
        {
          System.Diagnostics.Debug.WriteLine("GetBloggerCommentCount: Error inserting mysql row. Error: " + ex.Message);
          return null;
        }

      }
    }

    public dynamic RegisterBlogger(Blogger blogger)
    {

      using (MySqlConnection conn = GetConnection())
      {
        try
        {
          conn.Open();
          string sql = "INSERT INTO bloggers(fname, lname, email, username, passwrd, blogger_img) " +
            "VALUES(?firstname, ?lastname, ?email, ?username, ?password, ?image)";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?firstname", blogger.Firstname);
          cmd.Parameters.AddWithValue("?lastname", blogger.Lastname);
          cmd.Parameters.AddWithValue("?username", blogger.Username);
          cmd.Parameters.AddWithValue("?email", blogger.Email);
          cmd.Parameters.AddWithValue("?password", blogger.Password);
          cmd.Parameters.AddWithValue("?image", blogger.Image ??  null);
          cmd.ExecuteNonQuery();
          conn.Close();

          return FindBlogger(blogger.Email, blogger.Password);
        }
        catch (MySqlException ex)
        {
          return "Error inserting mysql row. Error: " + ex.Message;
        }
      }
    }

    public Blogger FindBlogger(string email, string password)
    {
      Blogger blogger = null;

      using (MySqlConnection conn = GetConnection())
      {
        conn.Open();
        MySqlCommand cmd = new MySqlCommand("SELECT * FROM bloggers WHERE email=?email AND passwrd=?password", conn);
        cmd.Parameters.AddWithValue("?email", email);
        cmd.Parameters.AddWithValue("?password", password);

        using (var reader = cmd.ExecuteReader())
        {
          if (reader.Read())
          {
            blogger = new Blogger()
            {
              Id = Convert.ToInt32(reader["blogger_id"]),
              Firstname = reader["fname"].ToString(),
              Lastname = reader["lname"].ToString(),
              Email = reader["email"].ToString(),
              Username = reader["username"].ToString(),
              Password = reader["passwrd"].ToString(),
              Image = reader["blogger_img"].ToString() ?? null,
              Timestamp = CalculateTimeSinceInserted(reader["date_joined"].ToString()),
              Is_Admin = Convert.ToBoolean(reader["is_admin"]),
              NumOfCommentsMade = GetBloggerCommentCount(Convert.ToInt32(reader["blogger_id"])),
              NumOfPostsMade = GetBloggerPostCount(Convert.ToInt32(reader["blogger_id"]))
            };
          }
          return blogger;
        }
      }
    }

    public dynamic GeBloggers()
    {
      Blogger blogger = null;
      List<Blogger> list = new List<Blogger>();
      using (MySqlConnection conn = GetConnection())
      {
        conn.Open();
        MySqlCommand cmd = new MySqlCommand("SELECT * FROM bloggers WHERE is_admin = 0", conn);

        using (var reader = cmd.ExecuteReader())
        {
          while (reader.Read())
          {
            blogger = new Blogger()
            {
              Id = Convert.ToInt32(reader["blogger_id"]),
              Firstname = reader["fname"].ToString(),
              Lastname = reader["lname"].ToString(),
              Email = reader["email"].ToString(),
              Username = reader["username"].ToString(),
              Password = reader["passwrd"].ToString(),
              Image = reader["blogger_img"].ToString() ?? null,
              Timestamp = CalculateTimeSinceInserted(reader["date_joined"].ToString()),
              Is_Admin = Convert.ToBoolean(reader["is_admin"]),
              NumOfCommentsMade = GetBloggerCommentCount(Convert.ToInt32(reader["blogger_id"])),
              NumOfPostsMade = GetBloggerPostCount(Convert.ToInt32(reader["blogger_id"]))
            };
            list.Add(blogger);
          }
          return list;
        }
      }
    }

    public dynamic MakePost(Post post)
    {

      using (MySqlConnection conn = GetConnection())
      {
        try
        {
          conn.Open();
          string sql = "INSERT INTO posts(post_title, post_feature_img, article, post_status, post_type, blogger_id) " +
            "VALUES(?post_title, ?post_feature, ?article, ?post_status, ?post_type, ?blogger_id)";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?post_title", post.Post_title);
          cmd.Parameters.AddWithValue("?post_feature", post.Post_feature_img ?? null);
          cmd.Parameters.AddWithValue("?article", post.Article);
          cmd.Parameters.AddWithValue("?post_status", "Published");
          cmd.Parameters.AddWithValue("?post_type", post.Post_type);
          cmd.Parameters.AddWithValue("?blogger_id", post.Blogger_id);
          cmd.ExecuteNonQuery();
          conn.Close();

          return true;
        }
        catch (MySqlException ex)
        {
          return "Error inserting mysql row. Error: " + ex.Message;
        }

      }
    }

    public dynamic FindPost(int post_id)
    {
      using (MySqlConnection conn = GetConnection())
      {
        try
        {
          conn.Open();
          Post post = null;
          string sql = "SELECT * FROM posts p " +
            "INNER JOIN bloggers b ON p.blogger_id = b.blogger_id " +
            "INNER JOIN category c ON p.post_type = c.category_id " +
            "WHERE p.post_id = ?id";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?id", post_id);

          using (var reader = cmd.ExecuteReader())
          {
            if (reader.Read())
            {
              post = new Post()
              {
                Post_id = Convert.ToInt32(reader["post_id"]),
                Post_title = reader["post_title"].ToString(),
                Post_feature_img = reader["post_feature_img"].ToString() ?? null,
                Post_date = GetDate(reader["post_date"].ToString()),
                Article = reader["article"].ToString(),
                Post_status = reader["post_status"].ToString(),
                author = reader["fname"].ToString()+" "+reader["lname"].ToString(),
                category = reader["category"].ToString(),
                Post_type = Convert.ToInt32(reader["post_type"]),
                Post_like_count = reader["post_like_count"] is DBNull ? 0 : Convert.ToInt32(reader["post_like_count"]),
                Post_comment_count = GetCommentCount(Convert.ToInt32(reader["post_id"])),
                Post_has_article = reader["post_has_article"] is DBNull ? false : Convert.ToBoolean(reader["post_has_article"]),
                Blogger_id = Convert.ToInt32(reader["blogger_id"]),
              };
              post.setComments(GetComments(Convert.ToInt32(reader["post_id"])));
            }
          }

          return post;
        }
        catch (MySqlException ex)
        {
          return "Error inserting mysql row. Error: " + ex.Message;
        }

      }
    }

    public dynamic GetRecentPosts()
    {
      using (MySqlConnection conn = GetConnection())
      {
        try
        {
          conn.Open();
          List<dynamic> list = new List<dynamic>();
          string sql = "SELECT * FROM recent_posts r " +
            "INNER JOIN posts p ON r.post_id = p.post_id " +
            "INNER JOIN bloggers b ON p.blogger_id = b.blogger_id ";
          MySqlCommand cmd = new MySqlCommand(sql, conn);

          var reader = cmd.ExecuteReader();

          while (reader.Read())
          {
            list.Add(new{
              Post_id = Convert.ToInt32(reader["post_id"]),
              Post_title = reader["post_title"].ToString(),
              Post_feature_img = reader["post_feature_img"].ToString() ?? null,
              Post_date = GetDate(reader["post_date"].ToString()),
              author = reader["fname"].ToString() + " " + reader["lname"].ToString(),
              Post_comment_count = GetCommentCount(Convert.ToInt32(reader["post_id"]))
            });
          }
          reader.Close();

          return list;
        }
        catch (MySqlException ex)
        {
          return "Error inserting mysql row. Error: " + ex.Message;
        }

      }
    }

    public dynamic GetPosts(int id)
    {
      using (MySqlConnection conn = GetConnection())
      {
        try
        {
          conn.Open();
          List<Post> list = new List<Post>();
          Post post;
          string sql = "SELECT * FROM posts p " +
            "INNER JOIN bloggers b ON p.blogger_id = b.blogger_id " +
            "INNER JOIN category c ON p.post_type = c.category_id " +
            "WHERE b.blogger_id = ?blogger_id";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?blogger_id", id);

          var reader = cmd.ExecuteReader();

          while (reader.Read())
          {
            post = new Post()
            {
              Post_id = Convert.ToInt32(reader["post_id"]),
              Post_title = reader["post_title"].ToString(),
              Post_feature_img = reader["post_feature_img"].ToString() ?? null,
              Post_date = GetDate(reader["post_date"].ToString()),
              Article = reader["article"].ToString(),
              Post_status = reader["post_status"].ToString(),
              author = reader["fname"].ToString() + " " + reader["lname"].ToString(),
              category = reader["category"].ToString(),
              Post_type = Convert.ToInt32(reader["post_type"]),
              Post_like_count = reader["post_like_count"] is DBNull ? 0 : Convert.ToInt32(reader["post_like_count"]),
              Post_comment_count = GetCommentCount(Convert.ToInt32(reader["post_id"])),
              Post_has_article = reader["post_has_article"] is DBNull ? false : Convert.ToBoolean(reader["post_has_article"]),
              Blogger_id = Convert.ToInt32(reader["blogger_id"])
            };
            post.setComments(GetComments(Convert.ToInt32(reader["post_id"])));

            list.Add(post);
          }
          reader.Close();

          return list;
        }
        catch (MySqlException ex)
        {
          return "Error inserting mysql row. Error: " + ex.Message;
        }

      }
    }

    public dynamic AddComment(Comment comment)
    {
      try
      {
        using (MySqlConnection conn = GetConnection())
        {
          conn.Open();
          string sql = "INSERT INTO comments(post_id, blogger_id, comment) " +
            "VALUES(?post_id, ?blogger_id, ?comment)";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?post_id", comment.Post_id);
          cmd.Parameters.AddWithValue("?blogger_id", comment.Blogger_id);
          cmd.Parameters.AddWithValue("?comment", comment.Comment_text);
          cmd.ExecuteNonQuery();
          conn.Close();

          return GetComments(comment.Post_id);
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.ToString());
        return ex.Message;
      }

    }

    public dynamic AddReply(Comment comment)
    {
      try
      {
        using (MySqlConnection conn = GetConnection())
        {
          conn.Open();
          string sql = "INSERT INTO comments(post_id, blogger_id, reply_to_id, comment) " +
            "VALUES(?post_id, ?blogger_id, ?reply_to_id, ?comment)";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?post_id", comment.Post_id);
          cmd.Parameters.AddWithValue("?blogger_id", comment.Blogger_id);
          cmd.Parameters.AddWithValue("?reply_to_id", comment.Comment_id);
          cmd.Parameters.AddWithValue("?comment", comment.Comment_text);
          cmd.ExecuteNonQuery();
          conn.Close();

          return GetComments(comment.Post_id);
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.ToString());
        return ex.Message;
      }

    }

    public dynamic GetComments(int post_id)
    {

      using (MySqlConnection conn = GetConnection())
      {
        try
        {
          conn.Open();
          Comment comment;
          List<Comment> list = new List<Comment>();
          string sql = "SELECT * FROM comments c " +
            "INNER JOIN bloggers b ON c.blogger_id = b.blogger_id " +
            "INNER JOIN posts p ON c.post_id = p.post_id " +
            "WHERE p.post_id = ?id AND reply_to_id IS NULL " +
            "ORDER BY c.comment_id DESC";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?id", post_id);

          using (var reader = cmd.ExecuteReader())
          {
            while (reader.Read())
            {
              comment = new Comment()
              {
                Comment_id = Convert.ToInt32(reader["comment_id"]),
                Post_id = Convert.ToInt32(reader["post_id"]),
                Username = reader["username"].ToString(),
                Bloggers_img = reader["blogger_img"].ToString() ?? null,
                CommentLikeCount = GetCommentLikeCount(Convert.ToInt32(reader["comment_id"])),
                Comment_text = reader["comment"].ToString(),
                Comment_date = CalculateTimeSinceInserted(reader["comment_date"].ToString()),
              };
              comment.SetReplies(GetReplies(Convert.ToInt32(reader["comment_id"])));

              list.Add(comment);
            }
          }

          return list;
        }
        catch (MySqlException ex)
        {
          System.Diagnostics.Debug.WriteLine("GetComments: Error inserting mysql row. Error: " + ex.Message);
          return null;
        }

      }
    }

    public dynamic GetReplies(int comment_id)
    {

      using (MySqlConnection conn = GetConnection())
      {
        try
        {
          conn.Open();
          Comment comment;
          List<Comment> list = new List<Comment>();
          string sql = "SELECT * FROM comments c " +
            "INNER JOIN bloggers b ON c.blogger_id = b.blogger_id " +
            "INNER JOIN posts p ON c.post_id = p.post_id " +
            "WHERE c.reply_to_id = ?id";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?id", comment_id);

          using (var reader = cmd.ExecuteReader())
          {
            while (reader.Read())
            {
              comment = new Comment()
              {
                Comment_id = Convert.ToInt32(reader["comment_id"]),
                Username = reader["username"].ToString(),
                Bloggers_img = reader["blogger_img"].ToString() ?? null,
                CommentLikeCount = GetCommentLikeCount(Convert.ToInt32(reader["comment_id"])),
                Comment_text = reader["comment"].ToString(),
                Comment_date = CalculateTimeSinceInserted(reader["comment_date"].ToString()),
              };
              list.Add(comment);
            }
          }

          return list;
        }
        catch (MySqlException ex)
        {
          System.Diagnostics.Debug.WriteLine("GetReplies: Error inserting mysql row. Error: " + ex.Message);
          return null;
        }

      }
    }

    public dynamic GetCommentCount(int post_id)
    {

      using (MySqlConnection conn = GetConnection())
      {
        try
        {
          conn.Open();
          int result = 0;
          string sql = "SELECT COUNT(*) AS comment_count FROM comments c " +
            "INNER JOIN bloggers b ON c.blogger_id = b.blogger_id " +
            "INNER JOIN posts p ON c.post_id = p.post_id " +
            "WHERE p.post_id = ?id";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?id", post_id);

          using (var reader = cmd.ExecuteReader())
          {
            if (reader.Read())
            {
              result = Convert.ToInt32(reader["comment_count"]);
            }
          }
          return result;
        }
        catch (MySqlException ex)
        {
          System.Diagnostics.Debug.WriteLine("GetCommentCount: Error inserting mysql row. Error: " + ex.Message);
          return null;
        }

      }
    }

    public dynamic GetCommentLikeCount(int comment_id)
    {

      using (MySqlConnection conn = GetConnection())
      {
        try
        {
          conn.Open();
          int result = 0;
          string sql = "SELECT c.comment_like_count FROM comments c " +
            "INNER JOIN bloggers b ON c.blogger_id = b.blogger_id " +
            "INNER JOIN posts p ON c.post_id = p.post_id " +
            "WHERE c.comment_id = ?id";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?id", comment_id);

          using (var reader = cmd.ExecuteReader())
          {
            if (reader.Read())
            {
              result = Convert.ToInt32(reader["comment_like_count"]);
            }
          }

          return result;
        }
        catch (MySqlException ex)
        {
          System.Diagnostics.Debug.WriteLine("GetLikeCount: Error inserting mysql row. Error: " + ex.Message);
          return null;
        }

      }
    }

    public dynamic AddCommentLike(Comment comment)
    {
      try
      {
        using (MySqlConnection conn = GetConnection())
        {
          conn.Open();
          string sql = "INSERT INTO comment_like(comment_id, blogger_id) " +
            "VALUES(?comment_id, ?blogger_id)";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?comment_id", comment.Comment_id);
          cmd.Parameters.AddWithValue("?blogger_id", comment.Blogger_id);
          cmd.ExecuteNonQuery();
          conn.Close();

          return GetComments(comment.Post_id);
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.ToString());
        return ex.Message;
      }
    }

    public dynamic AddPostLike(Comment comment)
    {
      try
      {
        using (MySqlConnection conn = GetConnection())
        {
          conn.Open();
          string sql = "INSERT INTO comments(post_id, blogger_id, reply_to_id, comment) " +
            "VALUES(?post_id, ?blogger_id, ?reply_to_id, ?comment)";
          MySqlCommand cmd = new MySqlCommand(sql, conn);
          cmd.Parameters.AddWithValue("?post_id", comment.Post_id);
          cmd.Parameters.AddWithValue("?blogger_id", comment.Blogger_id);
          cmd.Parameters.AddWithValue("?reply_to_id", comment.Comment_id);
          cmd.Parameters.AddWithValue("?comment", comment.Comment_text);
          cmd.ExecuteNonQuery();
          conn.Close();

          return GetReplies(comment.Comment_id);
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.ToString());
        return ex.Message;
      }

    }
    
  }
}
