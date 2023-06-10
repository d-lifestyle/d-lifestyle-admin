import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { GetAdminContentAction, useAppDispatch, useAuthSelector } from "../../../redux";
import { AppContainer, AppInput, AppTitleBar } from "../../../component";
import { Box } from "@mui/material";

export const AdminProfile = () => {
     const dispatch = useAppDispatch();
     const auth = useAuthSelector();

     useEffect(() => {
          (async () => {
               await dispatch(GetAdminContentAction());
          })();
     }, []);

     return (
          <DefaultLayout pagetitle="Manage your admin profile">
               <AppTitleBar
                    title={`Manage Profile ${auth.content.firstName} ${auth.content.lastName}`}
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "table",
                         },
                         {
                              pagepath: "/admin/profile",
                              activepage: false,
                              activetitle: "manage profile",
                         },
                    ]}
               />

               <AppContainer width="100%">
                    <Box display="flex" gap={3}>
                         <AppInput
                              label="your name"
                              value={auth.content.firstName}
                              onChange={(e) => {
                                   console.log(e.target.value);
                              }}
                         />
                         <AppInput
                              label="last name"
                              value={auth.content.lastName}
                              onChange={(e) => {
                                   console.log(e.target.value);
                              }}
                         />
                    </Box>
                    <Box>
                         <AppInput
                              onChange={(e) => {
                                   console.log(e.target.value);
                              }}
                              value={auth.content.email}
                         />
                    </Box>
               </AppContainer>
          </DefaultLayout>
     );
};
