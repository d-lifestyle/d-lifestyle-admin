import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getUser } from "../../utils";
import { useEffect } from "react";
import { GlobalLogin, useAppDispatch, useAuthSelector } from "../../redux";

export const RequireAuth = () => {
     let location = useLocation();
     const dispatch = useAppDispatch();
     const localStore = getUser();
     const auth = useAuthSelector();
     useEffect(() => {
          dispatch(
               GlobalLogin({
                    token: localStorage.getItem("token"),
                    user: localStorage.getItem("user"),
               })
          );
     }, []);

     if (!localStore) {
          return <Navigate to="/login" state={{ replace: true, from: location }} />;
     } else return <Outlet />;
};
