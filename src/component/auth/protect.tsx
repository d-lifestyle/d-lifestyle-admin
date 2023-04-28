import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useLayoutEffect } from "react";

export const RequireAuth = () => {
     const { setAuthorization, setUser } = useAuth();
     let location = useLocation();
     const localStore = localStorage.getItem("token");

     useLayoutEffect(() => {
          if (!localStorage.getItem("token")) {
               console.log("goes here user is false");
               setAuthorization(false);
               setUser("");
          } else {
               console.log("goes here user is true");
               setAuthorization(true);
               setUser(JSON.parse(localStore as any));
          }
     }, []);

     if (!localStore) {
          return <Navigate to="/login" state={{ replace: true, from: location }} />;
     } else return <Outlet />;
};
