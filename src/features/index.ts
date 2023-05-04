import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
     AccommodationReducer,
     CarouselReducer,
     CategoryReducer,
     MainCategoryReducer,
     SubCategoryReducer,
     ToursTravelReducer,
     AuthReducer,
     UserReducer,
     AdminReducer,
} from "./slice";

const rootReducer = combineReducers({
     // content
     category: CategoryReducer,
     carousel: CarouselReducer,
     subcategory: SubCategoryReducer,
     mainCategory: MainCategoryReducer,
     // inventories
     accommodation: AccommodationReducer,
     toursTravel: ToursTravelReducer,
     // auth
     auth: AuthReducer,
     user: UserReducer,
     admin: AdminReducer,
});

const Store = configureStore({
     reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof Store.dispatch;
export { Store };
