import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactFormProps } from "../../interface";
import ContactService from "../../service/contact.service";

export const GetContactAction = createAsyncThunk("contact/make", async (_, { rejectWithValue }) => {
     try {
          const data = await ContactService.GetContact();
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const MakeContactFavoriteAction = createAsyncThunk(
     "contact/favorite",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await ContactService.MakeFavoriteContact(props);
               return await data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);
