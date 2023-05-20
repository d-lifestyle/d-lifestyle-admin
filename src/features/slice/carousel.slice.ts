import { createSlice } from "@reduxjs/toolkit";
import { CarouselProps } from "../../interface";
import { GetAllCarousel, GetCarouselById, UpdateCarouselById } from "../action";
import { useSelector } from "react-redux";
import { RootState } from "..";

interface InitialMenuProps {
     loading: boolean;
     data: CarouselProps[];
     error: string;
     success: string;
     single?: CarouselProps;
}

const InitialCarouselState: InitialMenuProps = {
     loading: false,
     data: [],
     error: "",
     success: "",
     single: {} as CarouselProps,
};

const CarouselSlice = createSlice({
     name: "carousel",
     initialState: InitialCarouselState,
     reducers: {
          ClearSingleState: (state) => {
               state.single = {} as CarouselProps;
          },
     },
     extraReducers(builder) {
          builder
               .addCase(GetAllCarousel.fulfilled, (state, action) => {
                    state.data = action.payload;
                    state.loading = false;
               })
               .addCase(GetAllCarousel.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetAllCarousel.rejected, (state, action) => {
                    state.error = action.payload as string;
                    state.loading = false;
               });
          builder.addCase(GetCarouselById.fulfilled, (state, action) => {
               state.single = action.payload;
          });
          builder.addCase(UpdateCarouselById.fulfilled, (state) => {
               state.single = {} as CarouselProps;
          });
     },
});

export const CarouselReducer = CarouselSlice.reducer;
export const { ClearSingleState } = CarouselSlice.actions;
export const useCarouselSelector = () =>
     useSelector((state: RootState) => {
          return state.carousel;
     });
