import React, { useEffect, useState } from "react";

import { Toolbar, Drawer, CssBaseline, Box, useTheme } from "@mui/material";
import Head from "react-helmet";
import { Appbar, DrawerItems } from "../../component";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features";
import {
     GetAdminUsers,
     GetAllAccommodation,
     GetAllCarousel,
     GetAllCategory,
     GetAllMainCategory,
     GetAllSubCategory,
     GetAllToursTravel,
     GetUserProfile,
} from "../../features/action";
import { getUser } from "../../utils";

interface LayoutProps {
     pagetitle: string;
}

var drawerWidth: number = 280;

export const DefaultLayout: React.FC<LayoutProps> = ({ children, pagetitle }) => {
     const { spacing } = useTheme();
     const [mobileOpen, setMobileOpen] = useState<boolean>(false);
     const [collapsible, setCollapsible] = useState<boolean>(false);
     const dispatch = useDispatch<AppDispatch>();
     const user = getUser();
     useEffect(() => {
          (async () => {
               await dispatch(GetAdminUsers());
               await dispatch(GetAllCarousel());
               await dispatch(GetAllMainCategory());
               await dispatch(GetAllSubCategory());
               await dispatch(GetAllCategory());
               await dispatch(GetAllAccommodation());
               await dispatch(GetAllToursTravel());
               await dispatch(GetUserProfile());
          })();
     }, [dispatch]);

     const handleDrawerToggle = () => {
          setMobileOpen(!mobileOpen);
     };

     const handleCollapsible = () => {
          setCollapsible(!collapsible);
     };
     return (
          <Box sx={{ display: "flex" }}>
               <Head>
                    <title>{pagetitle} | BookMyLook</title>
               </Head>
               <CssBaseline />
               <Appbar user={user} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
               <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                    <Drawer
                         variant="temporary"
                         open={mobileOpen}
                         onClose={handleDrawerToggle}
                         ModalProps={{
                              keepMounted: true,
                         }}
                         sx={{
                              display: { xs: "block", sm: "none" },
                              "& .MuiDrawer-paper": {
                                   boxSizing: "border-box",
                                   width: drawerWidth,
                              },
                         }}
                    >
                         <DrawerItems user={user} collapsible={collapsible} handleCollapsible={handleCollapsible} />
                    </Drawer>
                    <Drawer
                         variant="permanent"
                         sx={{
                              padding: spacing(2),
                              display: { xs: "none", sm: "block" },
                              "& .MuiDrawer-paper": {
                                   boxSizing: "border-box",
                                   borderRightStyle: "dashed",
                                   width: drawerWidth,
                              },
                         }}
                         open
                    >
                         <DrawerItems user={user} collapsible={collapsible} handleCollapsible={handleCollapsible} />
                    </Drawer>
               </Box>
               <Box
                    component="main"
                    sx={{
                         flexGrow: 1,
                         paddingTop: {
                              sm: spacing(5),
                              xs: spacing(5),
                         },
                         paddingLeft: {
                              sm: spacing(2),
                              xs: spacing(2),
                         },

                         paddingRight: {
                              sm: spacing(2),
                              xs: spacing(2),
                         },
                         padding: {
                              lg: spacing(4),
                              xl: spacing(4),
                              md: spacing(3),
                         },
                         width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
               >
                    <Toolbar />
                    {children}
               </Box>
          </Box>
     );
};
