import AuthService from "../services/auth.service";

export const getUser = () => {
     const data = localStorage.getItem("token");
     if (data) {
          return JSON.parse(data as string);
     }
     return null;
};

export const logOutUser = async () => {
     try {
          localStorage.removeItem("token");
          const data = await AuthService.Logout();
          return data.data;
     } catch (err: any) {
          if (err) {
               console.log(err.response.data.message);
          } else {
               console.log(err.message);
          }
     }
};
