import axios from "axios";
import { NewCategoryProps, NewMainCategoryProps, UpdateCategoryProps, UpdateMainCategoryProps } from "../interface";
import { AxiosInstance } from "../utils";
axios.defaults.withCredentials = true;

class MainCategoryServices {
     public async GetMainCategory() {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/main-categories`);
     }

     public async GetMainCategoryById(id: string) {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/main-categories/${id}`);
     }
     public async AddMainCategory({ displayName }: NewMainCategoryProps) {
          return await AxiosInstance.post(`${process.env.REACT_APP_BACKEND}/main-categories/`, {
               displayName,
          });
     }
     public async UpdateMainCategoryById({ data, id }: UpdateMainCategoryProps) {
          return await AxiosInstance.put(
               `${process.env.REACT_APP_BACKEND}/main-categories/${id}`,

               {
                    displayName: data.displayName,
               }
          );
     }
     public async DeleteMainCategoryById(data: string) {
          return await AxiosInstance.delete(`${process.env.REACT_APP_BACKEND}/main-categories/${data}`);
     }
}

const MainCategoryService = new MainCategoryServices();
export default MainCategoryService;
