import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface InitalImageProps {
     data: any[];
}

const initialState: InitalImageProps = {
     data: [],
};

const ImagesSlice = createSlice({
     name: "images",
     initialState: initialState,
     reducers: {
          AddImages: (state, { payload }: any) => {
               state.data.push(payload);
          },
     },
});

export const ImageReducer = ImagesSlice.reducer;
export const { AddImages } = ImagesSlice.actions;
export const useImageSelector = () => {
     return useSelector((state: any) => state.images);
};
