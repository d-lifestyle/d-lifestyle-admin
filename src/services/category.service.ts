import axios from "axios";
import { NewCategoryProps, UpdateCategoryProps } from "../interface";
import { AxiosOptions } from "../utils";

class CategoryServices {
     public async GetCategory() {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/categories`, AxiosOptions);
     }

     public async GetCategoryById(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/categories/${id}`, AxiosOptions);
     }
     public async AddCategory(data: NewCategoryProps) {
          return await axios.post(
               `${process.env.REACT_APP_BACKEND}/categories/`,
               {
                    name: data.name as string,
                    parentCategory: data.parentCategory,
               },
               AxiosOptions
          );
     }
     public async UpdateCategoryById(data: UpdateCategoryProps) {
          return await axios.put(
               `${process.env.REACT_APP_BACKEND}/categories/${data.id}`,
               {
                    name: data.data.name as string,
               },
               AxiosOptions
          );
     }
     public async DeleteCategoryById(data: string) {
          return await axios.delete(`${process.env.REACT_APP_BACKEND}/categories/${data}`, AxiosOptions);
     }
}

export default new CategoryServices();
