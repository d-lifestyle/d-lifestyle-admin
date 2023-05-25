import { createSlice } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import { ToursTravelProps } from "../../../interface";
import { GetAllToursTravel, GetToursTravelById } from "../../action";

interface InitialToursTravelProps {
     loading: boolean;
     data: ToursTravelProps[];
     error: string;
     success: string;
     image: {
          title: string;
          image: string;
     }[];
     single: ToursTravelProps;
}

const InitialToursTravelState: InitialToursTravelProps = {
     loading: false,
     data: [],
     error: "",
     success: "",
     image: [
          {
               image: "https://dummyimage.com/1260x720/000/fff",
               title: "image size should be like this",
          },
     ],
     single: {} as ToursTravelProps,
};

const ToursPackagesSlice = createSlice({
     name: "toursTravel",
     initialState: InitialToursTravelState,
     reducers: {
          addToursPackageImages: (state, action) => {
               state.image.push({
                    title: action.payload.title,
                    image: action.payload.image,
               });
          },
          removeToursPackageImage: (state, action) => {
               state.image.splice(action.payload, 1);
          },
          emptyToursPackageImage: (state) => {
               state.image = [
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
          builder
               .addCase(GetToursTravelById.fulfilled, (state, action) => {
                    state.single = action.payload;
                    state.image = action.payload.image;
                    state.loading = false;
               })
               .addCase(GetToursTravelById.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetToursTravelById.rejected, (state, action) => {
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
