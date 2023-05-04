import { createSlice } from "@reduxjs/toolkit";
import { UserDataProps } from "../../../interface";
import { useSelector } from "react-redux";
import { GetUserProfile, UpdateAdminProfile } from "../../action";

interface InitialUserProps {
     data: UserDataProps;
     loading: boolean;
     error?: string;
     success?: string;
}

const userInitial: InitialUserProps = {
     data: {
          email: "",
          isAdmin: true,
          password: "",
          aboutInfo: {
               logo: "",
               aboutText: "",
               privacyPolicy: "",
               support: "",
               termsCondition: "",
               slogan: "",
          },
          contactInfo: {
               address: "",
               phone: "",
               fbLink: "",
               instaLink: "",
          },
          firstName: "",
          lastName: "",
     },
     loading: false,
};

const UserSlice = createSlice({
     name: "user",
     initialState: userInitial,
     reducers: {},
     extraReducers({ addCase }) {
          addCase(GetUserProfile.fulfilled, (state, { payload }) => {
               state.data = payload;
               state.loading = false;
          })
               .addCase(GetUserProfile.pending, (state) => {
                    state.loading = false;
               })
               .addCase(UpdateAdminProfile.fulfilled, (state, { payload }) => {
                    state.success = payload;
                    state.loading = false;
               })
               .addCase(UpdateAdminProfile.pending, (state) => {
                    state.loading = true;
               })
               .addCase(UpdateAdminProfile.rejected, (state, { payload }) => {
                    state.error = payload as string;
                    state.loading = false;
               });
     },
});

export const UserReducer = UserSlice.reducer;
export const useUserSelector = () =>
     useSelector((state: any) => {
          return state.user;
     });
