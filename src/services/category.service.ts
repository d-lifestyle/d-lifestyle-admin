import axios from "axios";
import { NewCategoryProps, UpdateCategoryProps } from "../interface";
import { AxiosInstance, AxiosOptions } from "../utils";
axios.defaults.withCredentials = true;

class CategoryServices {
     public async GetCategory() {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/categories`);
     }

     public async GetCategoryById(id: string) {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/categories/${id}`);
     }
     public async AddCategory(data: NewCategoryProps) {
          return await AxiosInstance.post(`${process.env.REACT_APP_BACKEND}/categories/`, {
               name: data.name as string,
               parentCategory: data.parentCategory,
          });
     }
     public async UpdateCategoryById(data: UpdateCategoryProps) {
          return await AxiosInstance.put(`${process.env.REACT_APP_BACKEND}/categories/${data.id}`, {
               name: data.data.name as string,
          });
     }
     public async DeleteCategoryById(data: string) {
          return await AxiosInstance.delete(`${process.env.REACT_APP_BACKEND}/categories/${data}`);
     }
}

export default new CategoryServices();
