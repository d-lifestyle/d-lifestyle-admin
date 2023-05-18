import axios from "axios";
import { NewCategoryProps, UpdateCategoryProps } from "../interface";

class CategoryServices {
     public async GetCategory() {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/categories`, {
               withCredentials: true,
               headers: {
                    "Access-Control-Allow-Credentials": true,
               },
          });
     }

     public async GetCategoryById(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/categories/${id}`, {
               withCredentials: true,
               headers: {
                    "Access-Control-Allow-Credentials": true,
               },
          });
     }
     public async AddCategory(data: NewCategoryProps) {
          return await axios.post(
               `${process.env.REACT_APP_BACKEND}/categories/`,
               {
                    name: data.name as string,
                    parentCategory: data.parentCategory,
               },
               {
                    withCredentials: true,
                    headers: {
                         "Access-Control-Allow-Credentials": true,
                    },
               }
          );
     }
     public async UpdateCategoryById(data: UpdateCategoryProps) {
          return await axios.put(
               `${process.env.REACT_APP_BACKEND}/categories/${data.id}`,
               {
                    name: data.data.name as string,
               },
               {
                    withCredentials: true,
                    headers: {
                         "Access-Control-Allow-Credentials": true,
                    },
               }
          );
     }
     public async DeleteCategoryById(data: string) {
          return await axios.delete(`${process.env.REACT_APP_BACKEND}/categories/${data}`, {
               withCredentials: true,
          });
     }
}

export default new CategoryServices();
