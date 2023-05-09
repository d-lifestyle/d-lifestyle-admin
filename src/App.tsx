import React, { Suspense, useEffect } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Theme } from "./theme";

import { useAuth } from "./context/auth.context";
import { Loader, RequireAuth } from "./component";

import {
     AddAccommodationPage,
     AddCarouselPage,
     AddCategoryPage,
     AddMainCategoryPage,
     AddSubCategoryPage,
     AddToursTravelPage,
     ManageAccommodationPage,
     ManageCarouselPage,
     ManageCategoryPage,
     ManageMainCategoryPage,
     ManageSubCategoryPage,
     ManageToursTravelPage,
     WebPageAnalyticsPage,
     AdminProfilePage,
     AdminUserPage,
     DashboardPage,
     DatabaseAnalyticsPage,
     LoginPage,
} from "./pages";

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
                         <Route
                              path="/"
                              element={
                                   <Suspense fallback={<Loader />}>
                                        <DashboardPage />
                                   </Suspense>
                              }
                         />

                         <Route path="manage">
                              <Route
                                   path="carousel"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <ManageCarouselPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="category"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <ManageCategoryPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="main-category"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <ManageMainCategoryPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="sub-category"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <ManageSubCategoryPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="accommodation"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <ManageAccommodationPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="tours-travel"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <ManageToursTravelPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="users"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <AdminUserPage />
                                        </Suspense>
                                   }
                              />
                         </Route>
                         <Route path="add">
                              <Route
                                   path="carousel"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <AddCarouselPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="category"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <AddCategoryPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="main-category"
                                   element={
                                        <Suspense fallback={<div>loading</div>}>
                                             <AddMainCategoryPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="sub-category"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <AddSubCategoryPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="accommodation"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <AddAccommodationPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="tours-travel"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <AddToursTravelPage />
                                        </Suspense>
                                   }
                              />
                         </Route>
                         <Route path="analytics">
                              <Route
                                   path="database"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <DatabaseAnalyticsPage />
                                        </Suspense>
                                   }
                              />
                              <Route
                                   path="webpage"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <WebPageAnalyticsPage />
                                        </Suspense>
                                   }
                              />
                         </Route>
                         <Route path="admin">
                              <Route
                                   path="profile"
                                   element={
                                        <Suspense fallback={<Loader />}>
                                             <AdminProfilePage />
                                        </Suspense>
                                   }
                              />
                         </Route>
                    </Route>

                    <Route
                         path="/login"
                         element={
                              <Suspense fallback={<Loader />}>
                                   <LoginPage />
                              </Suspense>
                         }
                    />
               </Routes>
          </ThemeProvider>
     );
}
