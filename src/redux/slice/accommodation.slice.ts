import { createSlice } from "@reduxjs/toolkit";
import { AccommodationProps } from "../../interface";
import { ListAccommodationAction, ListAccommodationByIdAction, UpdateAccommodationAction } from "../action";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface DataStateProps<T> {
     data: T[];
     single: T;
     error: string;
     success: string;
     loading: boolean;
     image: imageProps[];
}

interface imageProps {
     image: string;
     title: string;
}

const InitialState: DataStateProps<AccommodationProps> = {
     data: [] as AccommodationProps[],
     error: "",
     loading: false,
     single: {} as AccommodationProps,
     success: "",
     image: [] as imageProps[],
};

const AccommodationSlice = createSlice({
     initialState: InitialState,
     name: "accommodation",
     reducers: {
          addImage: (state, action) => {
               state?.image?.push({
                    title: action.payload.title,
                    image: action.payload.image,
               });
          },
          removeImage: (state, action) => {
               state?.image?.splice(action.payload, 1);
          },
          clearImages: (state) => {
               state.image = [];
          },
     },
     extraReducers(builder) {
          builder
               .addCase(ListAccommodationAction.fulfilled, (state, action) => {
                    state.data = action.payload;
                    state.loading = false;
               })
               .addCase(ListAccommodationAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListAccommodationAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder
               .addCase(ListAccommodationByIdAction.fulfilled, (state, action) => {
                    state.single = action.payload.data;
                    action.payload?.data.image.map(({ title, image }: any) => {
                         return state.image?.push({ title, image });
                    });
               })
               .addCase(ListAccommodationByIdAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListAccommodationByIdAction.rejected, (state, action) => {
                    state.error = (action.payload as any).data as string;
               });
          builder.addCase(UpdateAccommodationAction.fulfilled, (state) => {
               state.image = [{} as imageProps];
          });
     },
});

export const AccommodationReducer = AccommodationSlice.reducer;
export const { addImage, removeImage, clearImages } = AccommodationSlice.actions;
export const useAccommodationSelector = () =>
     useSelector((state: RootState) => {
          return state.accommodation;
     });
