import { NewBlogProps, UpdateBlogProps } from "../interface";
import { AxiosInstance } from "../utils";

class BlogServices {
     public async GetBlog() {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/blogs`);
     }

     public async GetBlogById(id: string) {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/blogs/${id}`);
     }
     public async AddBlog({ label, body, images }: NewBlogProps) {
          return await AxiosInstance.post(`${process.env.REACT_APP_BACKEND}/blogs/`, {
               label,
               images,
               body,
          });
     }
     public async UpdateBlogById({ id, data }: UpdateBlogProps) {
          return await AxiosInstance.put(`${process.env.REACT_APP_BACKEND}/blogs/${id}`, {
               label: data.label,
               images: data.images,
               body: data.body,
          });
     }
     public async DeleteBlogById(data: string) {
          return await AxiosInstance.delete(`${process.env.REACT_APP_BACKEND}/blogs/${data}`);
     }
}

const BlogService = new BlogServices();

export default BlogService;
