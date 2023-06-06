import { AxiosInstance } from "../utils";
import { NewSubCategoryProps, UpdateSubCategoryProps } from "../interface";

class SubCategoryServices {
     public async SubCategoryList() {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/sub-category`);
     }

     public async SubCategoryListById(id: string) {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/sub-category/${id}`);
     }

     public async ListSubCategoriesByCategoryId(categoryId: string) {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/sub-category/category/${categoryId}`);
     }
     public async UploadSubCategory({ CategoryId, displayName }: NewSubCategoryProps) {
          return await AxiosInstance().post(`${process.env.REACT_APP_BACKEND}/sub-category/`, {
               CategoryId,
               displayName,
          });
     }
     public async UpdateSubCategory({ data, id }: UpdateSubCategoryProps) {
          return await AxiosInstance().put(`${process.env.REACT_APP_BACKEND}/sub-category/${id}`, {
               CategoryId: data.CategoryId,
               displayName: data.displayName,
          });
     }

     public async DeleteSubCategory(id: string) {
          return await AxiosInstance().delete(`${process.env.REACT_APP_BACKEND}/sub-category/${id}`);
     }
}

const SubCategoryService = new SubCategoryServices();

export default SubCategoryService;
