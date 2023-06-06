import { createAsyncThunk } from "@reduxjs/toolkit";
import ToursPackageService from "../../service/tours-package";
import { NewToursTravelProps, UpdateToursTravelProps } from "../../interface";

export const ListToursPackageAction = createAsyncThunk("tours_package/all", async (_, { rejectWithValue }) => {
     try {
          const data = await ToursPackageService.ToursPackageList();
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const ListToursPackageByIdAction = createAsyncThunk(
     "tours_package/id",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await ToursPackageService.ToursPackageListById(props);
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

export const UploadTourPackagesAction = createAsyncThunk(
     "tours_package/new",
     async (props: NewToursTravelProps, { rejectWithValue }) => {
          try {
               const data = await ToursPackageService.UploadTouPackages(props);
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

export const UpdateTourPackagesByIdAction = createAsyncThunk(
     "tours_package/update",
     async (props: UpdateToursTravelProps, { rejectWithValue }) => {
          try {
               const data = await ToursPackageService.UpdateTouPackagesById(props);
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

export const DeleteTourPackagesByIdAction = createAsyncThunk(
     "tours_package/delete",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await ToursPackageService.DeleteTouPackagesById(props);
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
