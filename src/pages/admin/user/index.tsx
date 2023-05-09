import React from "react";
import { DefaultLayout } from "../../../layout";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { AppButton, AppTitleBar } from "../../../component";
import { useAdminSelector } from "../../../features/slice";
import { UserDataProps } from "../../../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { DeleteUser } from "../../../features/action";

export const AdminUser = () => {
     const users = useAdminSelector();
     const dispatch = useDispatch<AppDispatch>();
     const { shadows } = useTheme();

     const DeleteAdminUser = async (id: string) => {
          await dispatch(DeleteUser(id));
     };
     return (
          <DefaultLayout pagetitle="Manage your users">
               <AppTitleBar
                    title="Manage your website users"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/manage/users",
                              activepage: false,
                              activetitle: "manage",
                         },
                         {
                              pagepath: "/manage/users",
                              activepage: true,
                              activetitle: "users",
                         },
                    ]}
               />
               <Grid container spacing={3} mt={3}>
                    {users.data.map(
                         ({ firstName, lastName, email, isAdmin, createdAt, contactInfo, _id }: UserDataProps) => (
                              <Grid item xs={12} sm={12} md={6} xl={3} lg={3}>
                                   <Box boxShadow={shadows[20]} borderRadius={1} p={3}>
                                        <Typography variant="h6">
                                             {lastName} {firstName}
                                        </Typography>
                                        <Typography color="gray" variant="body1">
                                             {email}
                                        </Typography>
                                        <Typography color="gray" variant="body1">
                                             {contactInfo?.phone}
                                        </Typography>
                                   </Box>
                                   <Box mt={1}>
                                        <AppButton
                                             onClick={() => DeleteAdminUser(_id as string)}
                                             fullWidth
                                             type="button"
                                        >
                                             delete
                                        </AppButton>
                                   </Box>
                              </Grid>
                         )
                    )}
               </Grid>
          </DefaultLayout>
     );
};
