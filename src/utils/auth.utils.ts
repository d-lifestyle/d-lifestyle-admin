import AuthService from "../services/auth.service";

export const getUser = () => {
     const data = localStorage.getItem("token");
     if (data) {
          return data;
     }
     return null;
};

export const logOutUser = async (props: any) => {
     try {
          localStorage.removeItem("token");
          const data = await AuthService.Logout();
          return data.data;
     } catch (err: any) {
          if (err.response) {
               if (err.response.status === 403) {
                    return 403;
               }
               return err.response.data.message;
          } else {
               return err.message;
          }
     }
};

export const AxiosOptions = {
     withCredentials: true,
};
