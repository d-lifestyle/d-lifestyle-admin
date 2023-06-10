import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Theme } from "./theme";
import { RequireAuth } from "./component";
import {
     AccommodationTable,
     NormalCategoryTable,
     ContactEnquiry,
     CruiseTable,
     Homepage,
     LoginPage,
     NotFound,
     OtherEnquiry,
     SliderTable,
     SubCategoryTable,
     TourPackageTable,
     NewAccommodation,
     NewCruise,
     NewToursTravel,
     NewCarousel,
     NewSubCategory,
     NewNormalCategory,
     BlogTable,
     NewBlog,
     RentalTable,
     NewRental,
     AdminProfile,
     FlightTable,
} from "./pages";
import { BlogDetails } from "./pages/table/blog/blog.details";
import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { RentalEnquiry } from "./pages/table/rental/rental-enquiry";

export default function App() {
     return (
          <ThemeProvider theme={Theme}>
               <CssBaseline />
               <Routes>
                    <Route element={<RequireAuth />}>
                         <Route path="/" element={<Homepage />} />

                         {/* Display */}
                         <Route path="table">
                              <Route path="accommodations" element={<AccommodationTable />} />
                              <Route path="travel-packages" element={<TourPackageTable />} />
                              <Route path="cruise-packages" element={<CruiseTable />} />
                              <Route path="normal-category" element={<NormalCategoryTable />} />
                              <Route path="sub-category" element={<SubCategoryTable />} />
                              <Route path="slider" element={<SliderTable />} />
                              <Route path="blogs" element={<BlogTable />} />
                              <Route path="rental" element={<RentalTable />} />
                              <Route path="blogs/:id" element={<BlogDetails />} />
                              <Route path="flight" element={<FlightTable />} />
                         </Route>

                         {/* Enquiries */}
                         <Route path="enquiry">
                              <Route path="user-contacts" element={<ContactEnquiry />} />
                              <Route path="user-enquiries" element={<OtherEnquiry />} />
                              <Route path="car-enquiries" element={<RentalEnquiry />} />
                         </Route>

                         {/* Upload */}

                         <Route path="new">
                              <Route path="accommodation" element={<NewAccommodation />} />
                              <Route path="tours-travel" element={<NewToursTravel />} />
                              <Route path="cruise" element={<NewCruise />} />
                              <Route path="normal-category" element={<NewNormalCategory />} />
                              <Route path="sub-category" element={<NewSubCategory />} />
                              <Route path="slider" element={<NewCarousel />} />
                              <Route path="blogs" element={<NewBlog />} />
                              <Route path="rental" element={<NewRental />} />
                         </Route>

                         {/* Update */}
                         <Route path="update">
                              <Route path="normal-category/:id" element={<NewNormalCategory />} />
                              <Route path="sub-category/:id" element={<NewSubCategory />} />
                              <Route path="accommodation/:id" element={<NewAccommodation />} />
                              <Route path="slider/:id" element={<NewCarousel />} />
                              <Route path="tours-travel/:id" element={<NewToursTravel />} />
                              <Route path="blogs/:id" element={<NewBlog />} />
                         </Route>
                         <Route path="admin">
                              <Route path="profile" element={<AdminProfile />} />
                         </Route>
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/*" element={<NotFound />} />
               </Routes>
          </ThemeProvider>
     );
}
