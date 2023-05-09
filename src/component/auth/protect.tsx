import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features";
import { GetUserProfile } from "../../features/action";

export const RequireAuth = () => {
     const { setAuthorization, setUser } = useAuth();
     let location = useLocation();
     const localStore = localStorage.getItem("token");
     const dispatch = useDispatch<AppDispatch>();
     useLayoutEffect(() => {
          if (!localStorage.getItem("token")) {
               setAuthorization(false);
               setUser("");
          } else {
               setAuthorization(true);
               dispatch(GetUserProfile());
               setUser(JSON.parse(localStore as any));
          }
     }, [localStore, dispatch, setAuthorization, setUser]);

     if (!localStore) {
          return <Navigate to="/login" state={{ replace: true, from: location }} />;
     } else return <Outlet />;
};
