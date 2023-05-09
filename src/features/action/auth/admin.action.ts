import { createAsyncThunk } from "@reduxjs/toolkit";
import AdminService from "../../../services/admin.service";

const GetAdminUsers = createAsyncThunk("admin/user", async (_, { rejectWithValue }) => {
     try {
          const data = await AdminService.GetAllUsers();
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const DeleteUser = createAsyncThunk("admin/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await AdminService.DeleteUserAdmin(props);
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export { GetAdminUsers, DeleteUser };
