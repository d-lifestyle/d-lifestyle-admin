import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginProps } from "../../../interface";
import AuthService from "../../../services/auth.service";

const LoginAccount = createAsyncThunk("auth/login", async (props: any, { rejectWithValue }) => {
     try {
          console.log("props", props);
          const data = await AuthService.Login(props.data);
          props.navigate("/", { replace: true });
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const Logout = createAsyncThunk("auth/logout", async ({}, { rejectWithValue }) => {
     try {
          const data = await AuthService.Logout();
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const GetUserProfile = createAsyncThunk("auth/profile", async (x, { rejectWithValue }) => {
     try {
          const data = await AuthService.Profile();
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export { LoginAccount, Logout, GetUserProfile };
