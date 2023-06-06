import { AxiosInstance } from "../utils";
import { CategoriesProps, UpdateCategoryProps } from "../interface";

class CategoryServices {
     public async CategoryList() {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/categories`);
     }

     public async CategoryListById(id: string) {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/categories/${id}`);
     }

     public async UploadCategory(props: CategoriesProps) {
          return await AxiosInstance().post(`${process.env.REACT_APP_BACKEND}/categories`, {
               displayName: props.displayName,
          });
     }

     public async UpdateCategory({ id, data }: UpdateCategoryProps) {
          return await AxiosInstance().put(`${process.env.REACT_APP_BACKEND}/categories/${id}`, {
               displayName: data.displayName,
          });
     }

     public async DeleteCategory(id: string) {
          return AxiosInstance().delete(`${process.env.REACT_APP_BACKEND}/categories/${id}`);
     }
}

const CategoryService = new CategoryServices();

export default CategoryService;
