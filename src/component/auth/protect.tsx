import { Navigate, Outlet, useLocation, } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features";
import { GetUserProfile, Logout } from "../../features/action";
import { getUser } from "../../utils";

export const RequireAuth = () => {
  const { setAuthorization, setUser } = useAuth();
  let location = useLocation();
  const localStore = getUser()
  const dispatch = useDispatch<AppDispatch>();
  useLayoutEffect(() => {
    (async () => {
      if (!localStore.length) {
        setAuthorization(false);
        setUser("");
        await dispatch(Logout());
      } else {
        setAuthorization(true);
        await dispatch(GetUserProfile());
        setUser(localStore as string);
      }
    })();
  }, [localStore, dispatch, setAuthorization, setUser]);

  if (!localStore) {
    return <Navigate to="/login" state={{ replace: true, from: location }} />;
  } else return <Outlet />;
};
