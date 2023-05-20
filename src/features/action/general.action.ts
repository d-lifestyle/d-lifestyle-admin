import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactFormProps } from "../../interface";
import GeneralService from "../../services/general.service";

export const GetContactAction = createAsyncThunk("general/contact", async (_, { rejectWithValue }) => {
     try {
          const data = await GeneralService.GetCustomerContact();
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const MakeFavoriteAction = createAsyncThunk(
     "general/contact_favorite",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await GeneralService.MakeFavorite(props);
               return data.data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

export const DeleteCustomerAction = createAsyncThunk(
     "general/contact_delete",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await GeneralService.DeleteCustomer(props);
               return data.data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);
