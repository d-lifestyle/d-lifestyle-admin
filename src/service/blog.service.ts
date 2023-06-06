import { NewBlogProps, UpdateBlogProps } from "../interface";
import { AxiosInstance } from "../utils";

class BlogServices {
     public async ListBlogs() {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/blogs`);
     }

     public async ListBlogsById(id: string) {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/blogs/${id}`);
     }
     public async UploadBlogs({ body, images, label }: NewBlogProps) {
          return await AxiosInstance().post(`${process.env.REACT_APP_BACKEND}/blogs`, {
               body,
               images,
               label,
          });
     }

     public async UpdateBlogsById({ data, id }: UpdateBlogProps) {
          return await AxiosInstance().put(`${process.env.REACT_APP_BACKEND}/blogs/${id}`, {
               ...data,
          });
     }

     public async DeleteBlogsById(id: string) {
          return await AxiosInstance().delete(`${process.env.REACT_APP_BACKEND}/blogs/${id}`);
     }
}

const BlogService = new BlogServices();

export default BlogService;
