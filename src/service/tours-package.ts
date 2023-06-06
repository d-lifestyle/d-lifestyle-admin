import { AxiosInstance } from "../utils";
import { NewToursTravelProps, UpdateToursTravelProps } from "../interface";

class ToursPackageServices {
     public async ToursPackageList() {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/tours-travel`);
     }

     public async ToursPackageListById(id: string) {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/tours-travel/${id}`);
     }

     public async UploadTouPackages(data: NewToursTravelProps) {
          return await AxiosInstance().post(`${process.env.REACT_APP_BACKEND}/tours-travel`, { ...data });
     }
     public async UpdateTouPackagesById({ data, id }: UpdateToursTravelProps) {
          return await AxiosInstance().put(`${process.env.REACT_APP_BACKEND}/tours-travel/${id}`, { ...data });
     }
     public async DeleteTouPackagesById(id: string) {
          return await AxiosInstance().delete(`${process.env.REACT_APP_BACKEND}/tours-travel/${id}`);
     }
}

const ToursPackageService = new ToursPackageServices();

export default ToursPackageService;
