import { createSlice } from "@reduxjs/toolkit";
import { ToursTravelProps } from "../../interface";
import { ListToursPackageAction, ListToursPackageByIdAction, UpdateTourPackagesByIdAction } from "../action";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface PackageDataStateProps<T> {
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

const InitialState: PackageDataStateProps<ToursTravelProps> = {
     data: [] as ToursTravelProps[],
     error: "",
     loading: false,
     single: {} as ToursTravelProps,
     success: "",
     image: [] as imageProps[],
};

const TourPackageSlice = createSlice({
     initialState: InitialState,
     name: "tours_package",
     reducers: {
          addPackageImage: (state, action) => {
               state?.image?.push({
                    title: action.payload.title,
                    image: action.payload.image,
               });
          },
          removePackageImage: (state, action) => {
               state?.image?.splice(action.payload, 1);
          },
     },
     extraReducers(builder) {
          builder
               .addCase(ListToursPackageAction.fulfilled, (state, action) => {
                    state.data = action.payload.data;
                    state.loading = false;
               })
               .addCase(ListToursPackageAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListToursPackageAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder
               .addCase(ListToursPackageByIdAction.fulfilled, (state, action) => {
                    state.single = action.payload.data;
                    action.payload?.data?.image.map(({ title, image }: any) => {
                         return state.image?.push({ title, image });
                    });
               })
               .addCase(ListToursPackageByIdAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListToursPackageByIdAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder.addCase(UpdateTourPackagesByIdAction.fulfilled, (state) => {
               state.image = [] as imageProps[];
          });
     },
});

export const TourPackageReducer = TourPackageSlice.reducer;
export const { addPackageImage, removePackageImage } = TourPackageSlice.actions;
export const useTourPackageSelector = () =>
     useSelector((state: RootState) => {
          return state.tours_package;
     });
