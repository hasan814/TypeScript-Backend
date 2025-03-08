import { BlogIdDto, CreateBlogDto } from "./blog.dto";
import { IBlog } from "../../types/blog.types";


export class BlogService {
  async create(blogDto: CreateBlogDto): Promise<string> { return "" }
  async fetchAll(): Promise<IBlog[]> { return [] }
  async fetchByID(blogId: BlogIdDto): Promise<IBlog | undefined> { return undefined }
  async removeByID(blogId: BlogIdDto): Promise<string> { return "" }
}