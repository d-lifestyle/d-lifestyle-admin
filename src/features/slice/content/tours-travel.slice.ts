import { createSlice } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import { ToursTravelProps } from "../../../interface";
import { GetAllToursTravel } from "../../action";

interface InitialToursTravelProps {
     loading: boolean;
     data: ToursTravelProps[];
     error: string;
     success: string;
     images: {
          title: string;
          image: string;
     }[];
}

const InitialToursTravelState: InitialToursTravelProps = {
     loading: false,
     data: [],
     error: "",
     success: "",
     images: [
          {
               image: "https://dummyimage.com/1260x720/000/fff",
               title: "image size should be like this",
          },
     ],
};

const ToursPackagesSlice = createSlice({
     name: "toursTravel",
     initialState: InitialToursTravelState,
     reducers: {
          addToursPackageImages: (state, action) => {
               state.images.push({
                    title: action.payload.title,
                    image: action.payload.image,
               });
               console.log("data", state.images);
          },
          removeToursPackageImage: (state, action) => {
               state.images.splice(action.payload, 1);
          },
          emptyToursPackageImage: (state) => {
               state.images = [
                    { image: "https://dummyimage.com/1260x720/000/fff", title: "image size should be like this" },
               ];
          },
     },
     extraReducers(builder) {
          builder
               .addCase(GetAllToursTravel.fulfilled, (state, action) => {
                    state.data = action.payload;
                    state.loading = false;
               })
               .addCase(GetAllToursTravel.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetAllToursTravel.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const ToursTravelReducer = ToursPackagesSlice.reducer;
export const { addToursPackageImages, emptyToursPackageImage, removeToursPackageImage } = ToursPackagesSlice.actions;
export const useToursTravelSelector = () =>
     useSelector((state: any) => {
          return state.toursTravel;
     });
