import { createAsyncThunk } from "@reduxjs/toolkit";
import CruiseService from "../../service/cruise.service";
import { NewCruisePackageProps, UpdateCruiseProps } from "../../interface";

export const ListCruiseAction = createAsyncThunk("cruise/all", async (_, { rejectWithValue }) => {
     try {
          const data = await CruiseService.CruiseList();
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const ListCruiseByIdAction = createAsyncThunk("cruise/id", async (props: string, { rejectWithValue }) => {
     try {
          const data = await CruiseService.CruiseListById(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const DeleteCruiseAction = createAsyncThunk("cruise/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await CruiseService.DeleteCruiseListById(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const UploadCruiseAction = createAsyncThunk(
     "cruise/new",
     async (props: NewCruisePackageProps, { rejectWithValue }) => {
          try {
               console.log("FROM ACTION", props);

               const data = await CruiseService.UploadCruise(props as any);

               return await data.data;
          } catch (err: any) {
               if (err.response) {
                    console.log(err.response.data.message);
                    return rejectWithValue(err.response.data.message);
               } else {
                    console.log(err.message);
                    return rejectWithValue(err.message);
               }
          }
     }
);

export const UpdateCruiseAction = createAsyncThunk(
     "cruise/update",
     async (props: UpdateCruiseProps, { rejectWithValue }) => {
          try {
               const data = await CruiseService.UpdateCruiseById(props);
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
