import axios from "axios";
import { NewCategoryProps, NewMainCategoryProps, UpdateCategoryProps, UpdateMainCategoryProps } from "../interface";

class MainCategoryServices {
     public async GetMainCategory() {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/main-categories`);
     }

     public async GetMainCategoryById(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/main-categories/${id}`);
     }
     public async AddMainCategory({ displayName }: NewMainCategoryProps) {
          return await axios.post(
               `${process.env.REACT_APP_BACKEND}/main-categories/`,
               {
                    displayName,
               },
               {
                    withCredentials: true,
               }
          );
     }
     public async UpdateMainCategoryById({ data, id }: UpdateMainCategoryProps) {
          return await axios.put(
               `${process.env.REACT_APP_BACKEND}/main-categories/${id}`,
               {
                    displayName: data.displayName,
               },
               {
                    withCredentials: true,
               }
          );
     }
     public async DeleteMainCategoryById(data: string) {
          return await axios.delete(`${process.env.REACT_APP_BACKEND}/main-categories/${data}`, {
               withCredentials: true,
          });
     }
}

const MainCategoryService = new MainCategoryServices();
export default MainCategoryService;
