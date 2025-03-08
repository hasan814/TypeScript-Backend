import { Controller, Delete, Get, Post } from "../../decorators/router.decorators";
import { BlogService } from "./blog.service";

const blogService: BlogService = new BlogService()

@Controller("/blog")
export class BlogController {
  @Post()
  createBlog() { }
  @Get()
  GetAllBlogs() { }
  @Get()
  GetBlogByID() { }
  @Delete()
  RemoveBlogByID() { }
}