import axios from "axios";
import { NewSubCategoryProps, UpdateSubCategoryProps } from "../interface";
import { AxiosOptions } from "../utils";
axios.defaults.withCredentials = true;

class SubCategoryService {
     public async GetSubCategory() {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/sub-category`, AxiosOptions);
     }

     public async GetSubCategoryById(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/sub-category/${id}`, AxiosOptions);
     }

     public async AddSubCategory({ CategoryId, name }: NewSubCategoryProps) {
          return await axios.post(
               `${process.env.REACT_APP_BACKEND}/sub-category`,
               {
                    CategoryId,
                    name,
               },
               AxiosOptions
          );
     }

     public async UpdateSubCategoryById({ id, data }: UpdateSubCategoryProps) {
          return await axios.put(
               `${process.env.REACT_APP_BACKEND}/sub-category/${id}`,
               {
                    CategoryId: data.CategoryId,
                    name: data.name,
               },
               AxiosOptions
          );
     }
     public async DeleteSubCategoryById(id: string) {
          return await axios.delete(`${process.env.REACT_APP_BACKEND}/sub-category/${id}`, AxiosOptions);
     }

     public async GetSubCategoryWithCategoryId(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/sub-category/category/${id}`, AxiosOptions);
     }
}

export default new SubCategoryService();
