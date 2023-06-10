import { createSlice } from "@reduxjs/toolkit";
import { CarouselProps, DataStateProps, NewCarouselProps } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
     DeleteCarouselByIdAction,
     ListCarouselAction,
     ListCarouselByIdAction,
     UpdateCarouselByIdAction,
} from "../action/carousel.action";

const InitialState: DataStateProps<CarouselProps> = {
     data: [] as CarouselProps[],
     error: "",
     loading: false,
     single: {} as CarouselProps,
     success: "",
};

const CarouselSlice = createSlice({
     initialState: InitialState,
     name: "carousel",
     reducers: {},
     extraReducers(builder) {
          builder
               .addCase(ListCarouselAction.fulfilled, (state, action) => {
                    state.data = action.payload.data;
                    state.loading = false;
               })
               .addCase(ListCarouselAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListCarouselAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder
               .addCase(ListCarouselByIdAction.fulfilled, (state, action) => {
                    state.single = action.payload.data;
               })
               .addCase(ListCarouselByIdAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListCarouselByIdAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder
               .addCase(UpdateCarouselByIdAction.fulfilled, (state) => {
                    state.single = {} as NewCarouselProps;
               })
               .addCase(UpdateCarouselByIdAction.pending, (state) => {
                    state.loading = true;
               });
          builder.addCase(DeleteCarouselByIdAction.fulfilled, (state) => {
               state.loading = true;
          });
     },
});

export const CarouselReducer = CarouselSlice.reducer;
export const useCarouselSelector = () =>
     useSelector((state: RootState) => {
          return state.carousel;
     });
