import { createSlice } from "@reduxjs/toolkit";
import { RentalProps } from "../../interface";
import { ListRentalAction, ListRentalByIdAction } from "../action/rental.action";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export interface RentalDataStateProps<T> {
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

const InitialState: RentalDataStateProps<RentalProps> = {
     data: [] as RentalProps[],
     error: "",
     loading: false,
     single: {} as RentalProps,
     success: "",
     image: [] as imageProps[],
};

const RentalSlice = createSlice({
     initialState: InitialState,
     name: "rental",
     reducers: {
          addRentalImage: (state, action) => {
               state?.image?.push({
                    title: action.payload.title,
                    image: action.payload.image,
               });
          },
          removeRentalImage: (state, action) => {
               state?.image?.splice(action.payload, 1);
          },
     },
     extraReducers(builder) {
          builder
               .addCase(ListRentalAction.fulfilled, (state, action) => {
                    state.data = action.payload.data;
                    state.loading = false;
               })
               .addCase(ListRentalAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListRentalAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder
               .addCase(ListRentalByIdAction.fulfilled, (state, action) => {
                    state.single = action.payload.data;
               })
               .addCase(ListRentalByIdAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListRentalByIdAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const RentalReducer = RentalSlice.reducer;
export const { addRentalImage, removeRentalImage } = RentalSlice.actions;
export const useRentalSelector = () =>
     useSelector((state: RootState) => {
          return state.rental;
     });
