import React, { useEffect } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Theme } from "./theme";
import {
     Dashboard,
     Login,
     AddCarousel,
     AddSubCategory,
     CreateAccommodation,
     CreateToursTravel,
     AddCategory,
     ManageAccommodation,
     ManageToursTravel,
     ManageCarousel,
     ManageSubCategory,
     ManageCategory,
     DatabaseAnalytics,
     WebPageAnalytics,
     AddMainCategory,
     ManageMainCategory,
     AdminProfile,
     AdminUser,
} from "./pages";
import { useAuth } from "./context/auth.context";
import { RequireAuth } from "./component";

export default function App() {
     const { setUser, setAuthorization } = useAuth();
     useEffect(() => {
          if (localStorage.getItem("token")) {
               setAuthorization(true);
               setUser(localStorage.getItem("token")?.toString() as string);
          } else {
               setAuthorization(false);
               setUser("");
          }
     }, [setAuthorization, setUser]);
     return (
          <ThemeProvider theme={Theme}>
               <CssBaseline />
               <Routes>
                    <Route element={<RequireAuth />}>
                         <Route path="/" element={<Dashboard />} />
                         <Route path="manage">
                              <Route path="carousel" element={<ManageCarousel />} />
                              <Route path="category" element={<ManageCategory />} />
                              <Route path="main-category" element={<ManageMainCategory />} />
                              <Route path="sub-category" element={<ManageSubCategory />} />
                              <Route path="accommodation" element={<ManageAccommodation />} />
                              <Route path="tours-travel" element={<ManageToursTravel />} />
                              <Route path="users" element={<AdminUser />} />
                         </Route>
                         <Route path="add">
                              <Route path="carousel" element={<AddCarousel />} />
                              <Route path="category" element={<AddCategory />} />
                              <Route path="main-category" element={<AddMainCategory />} />
                              <Route path="sub-category" element={<AddSubCategory />} />
                              <Route path="accommodation" element={<CreateAccommodation />} />
                              <Route path="tours-travel" element={<CreateToursTravel />} />
                         </Route>
                         <Route path="analytics">
                              <Route path="database" element={<DatabaseAnalytics />} />
                              <Route path="webpage" element={<WebPageAnalytics />} />
                         </Route>
                         <Route path="admin">
                              <Route path="profile" element={<AdminProfile />} />
                         </Route>
                    </Route>

                    <Route path="/login" element={<Login />} />
               </Routes>
          </ThemeProvider>
     );
}
