import axios from "axios";
import { NewSubCategoryProps, UpdateSubCategoryProps } from "../interface";
import { AxiosInstance } from "../utils";
axios.defaults.withCredentials = true;

class SubCategoryService {
     public async GetSubCategory() {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/sub-category`);
     }

     public async GetSubCategoryById(id: string) {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/sub-category/${id}`);
     }

     public async AddSubCategory({ CategoryId, name }: NewSubCategoryProps) {
          return await AxiosInstance.post(`${process.env.REACT_APP_BACKEND}/sub-category`, {
               CategoryId,
               name,
          });
     }

     public async UpdateSubCategoryById({ id, data }: UpdateSubCategoryProps) {
          return await AxiosInstance.put(`${process.env.REACT_APP_BACKEND}/sub-category/${id}`, {
               CategoryId: data.CategoryId,
               name: data.name,
          });
     }
     public async DeleteSubCategoryById(id: string) {
          return await AxiosInstance.delete(`${process.env.REACT_APP_BACKEND}/sub-category/${id}`);
     }

     public async GetSubCategoryWithCategoryId(id: string) {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/sub-category/category/${id}`);
     }
}

export default new SubCategoryService();
