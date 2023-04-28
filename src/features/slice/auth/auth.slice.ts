import { createSlice } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import { AccommodationProps } from "../../../interface";
import { GetAllAccommodation, LoginAccount } from "../../action";

interface AuthProps {
     token: string;
     isLoggedIn: boolean;
     user: UserProps;
}

interface UserProps {
     _id: string;
     email: string;
     password: string;
}

interface InitialLoginProps {
     loading: boolean;
     data: AuthProps;
     error?: string;
     success?: string;
}

const InitialLoginState: InitialLoginProps = {
     loading: false,
     data: {
          isLoggedIn: false,
          user: {
               _id: "",
               email: "",
               password: "",
          },
          token: "",
     },
     error: "",
     success: "",
};

const AuthSlice = createSlice({
     name: "auth",
     initialState: InitialLoginState,
     reducers: {},
     extraReducers(builder) {
          builder
               .addCase(LoginAccount.fulfilled, (state, action) => {
                    state.error = "";
                    console.log("user login", action.payload);
                    state.loading = false;
                    state.data.token = action.payload.token;
                    state.data.user = action.payload.user;
                    state.data.isLoggedIn = true;
                    localStorage.setItem("access_token", JSON.stringify(state.data));
               })
               .addCase(LoginAccount.pending, (state) => {
                    state.loading = true;
               })
               .addCase(LoginAccount.rejected, (state, action) => {
                    state.loading = false;
                    console.log("login data", action.payload);

                    state.error = action.payload as string;
                    state.data.isLoggedIn = false;
               });
     },
});

export const AuthReducer = AuthSlice.reducer;
// export const { KeepLogin, PullOutUser } = AuthSlice.actions;
export const useAuthSelector = () =>
     useSelector((state: any) => {
          return state.auth;
     });
