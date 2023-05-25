import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/auth.service";

const LoginAccount = createAsyncThunk("auth/login", async (props: any, { rejectWithValue }) => {
     try {
          const data = await AuthService.Login(props.data);
          props.navigate("/", { replace: true });
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const Logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
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

export { LoginAccount, Logout };
