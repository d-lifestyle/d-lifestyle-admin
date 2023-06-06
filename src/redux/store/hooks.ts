import { combineReducers } from "@reduxjs/toolkit";
import { store } from "./store";
import {
     TourPackageReducer,
     AccommodationReducer,
     CategoryReducer,
     SubCategoryReducer,
     CarouselReducer,
     ContactReducer,
     CruiseReducer,
     BlogReducer,
     RentalReducer,
} from "../slice";
import { useDispatch } from "react-redux";
import { AuthReducer } from "../slice/auth.slice";

export const rootReducer = combineReducers({
     accommodation: AccommodationReducer,
     tours_package: TourPackageReducer,
     category: CategoryReducer,
     sub_category: SubCategoryReducer,
     carousel: CarouselReducer,
     auth: AuthReducer,
     contact: ContactReducer,
     cruise: CruiseReducer,
     blog: BlogReducer,
     rental: RentalReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
