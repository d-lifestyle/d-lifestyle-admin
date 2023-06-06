import React, { Fragment } from "react";

import { useTheme, Box, List, ListItemButton, ListItemIcon, Typography, ListItemText } from "@mui/material";
import { MenuItem, MenuTitle } from "../";
import { ProfileCard } from "../profile-card";
import { Link, useNavigate } from "react-router-dom";
import {
     AiOutlineCar,
     AiOutlineLogout,
     AiOutlineMessage,
     AiOutlineOrderedList,
     AiOutlinePieChart,
     AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsFileEarmarkPerson, BsListStars, BsPen } from "react-icons/bs";
import { MdTravelExplore } from "react-icons/md";
import { BiCarousel, BiHotel, BiMessageAlt } from "react-icons/bi";

import { RiShipLine } from "react-icons/ri";
import { LogOutAction, useAppDispatch } from "../../../redux";
import { enqueueSnackbar } from "notistack";

export interface DrawerItemsProps {
     handleCollapsible: () => void;
     collapsible: boolean;
     user: {
          name: string;
          email: string;
     };
}

const iconSize: number = 22;

export const DrawerItems: React.FC<DrawerItemsProps> = ({ user }) => {
     const { spacing } = useTheme();

     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     const LogoutUser = async () => {
          const data = await dispatch(LogOutAction());
          if (data.type === "auth/logout/fulfilled") {
               navigate("/", { replace: true });
               return enqueueSnackbar(data.payload);
          }
          if (data.type === "auth/logout/fulfilled") {
               return enqueueSnackbar(data.payload, { variant: "error" });
          }
     };

     return (
          <Fragment>
               <Box p={spacing(2)} pb={spacing(5)}>
                    <Link to="/admin/profile" style={{ textDecoration: "none", color: "inherit" }}>
                         <ProfileCard
                              image={
                                   "https://png.pngtree.com/png-clipart/20220806/ourmid/pngtree-bearded-man-logo-png-image_6100735.png"
                              }
                              adminemail={user.email}
                              adminname={user.name}
                         />
                    </Link>
                    <Box mt={spacing(3)}>
                         <MenuTitle title="general" />
                         <List disablePadding>
                              <MenuItem path="/" title="dashboard" icon={<AiOutlinePieChart size={iconSize} />} />
                         </List>
                    </Box>

                    {/* main content */}
                    <Box mt={spacing(3)}>
                         <MenuTitle title="Tour Packages" />
                         <List disablePadding>
                              <MenuItem
                                   path="/table/accommodations"
                                   title="accommodations"
                                   icon={<BiHotel size={iconSize} />}
                              />

                              <MenuItem
                                   path="/table/travel-packages"
                                   title="travel packages"
                                   icon={<MdTravelExplore size={iconSize} />}
                              />
                              <MenuItem
                                   path="/table/cruise-packages"
                                   title="cruise"
                                   icon={<RiShipLine size={iconSize} />}
                              />
                              <MenuItem path="/table/rental" title="Rentals" icon={<AiOutlineCar size={iconSize} />} />
                         </List>
                    </Box>
                    {/* CMS */}
                    <Box mt={spacing(3)}>
                         <MenuTitle title="customer enquiries" />
                         <List disablePadding>
                              <MenuItem
                                   path="/enquiry/user-contacts"
                                   title="from contacts"
                                   icon={<BiMessageAlt size={iconSize} />}
                              />

                              <MenuItem
                                   path="/enquiry/user-enquiries"
                                   title="other enquiries"
                                   icon={<AiOutlineMessage size={iconSize} />}
                              />
                         </List>
                    </Box>
                    {/* CMS */}
                    <Box mt={spacing(3)}>
                         <MenuTitle title="categories" />
                         <List disablePadding>
                              <MenuItem
                                   path="/table/normal-category"
                                   title="categories"
                                   icon={<AiOutlineOrderedList size={iconSize} />}
                              />
                              <MenuItem
                                   path="/table/sub-category"
                                   title="sub categories"
                                   icon={<BsListStars size={iconSize} />}
                              />
                         </List>
                    </Box>

                    {/* Other */}
                    <Box mt={spacing(3)}>
                         <MenuTitle title="content" />
                         <List disablePadding>
                              <MenuItem path="/table/slider" title="slider" icon={<BiCarousel size={iconSize} />} />
                              <MenuItem path="/table/blogs" title="Blogs" icon={<BsPen size={iconSize} />} />
                              <MenuItem
                                   path="/table/clients"
                                   title="Clients"
                                   icon={<BsFileEarmarkPerson size={iconSize} />}
                              />
                         </List>
                    </Box>

                    <Box mt={spacing(3)}>
                         <MenuTitle title="Account settings" />
                         <List disablePadding>
                              <ListItemButton
                                   onClick={LogoutUser}
                                   sx={{
                                        borderRadius: spacing(1.5),
                                        marginTop: spacing(0.5),
                                   }}
                              >
                                   <ListItemIcon>
                                        <AiOutlineLogout size={iconSize} />
                                   </ListItemIcon>
                                   <ListItemText
                                        sx={{
                                             textTransform: "capitalize",
                                             marginLeft: -3,
                                        }}
                                   >
                                        <Typography fontWeight="600" variant="body2">
                                             Logout
                                        </Typography>
                                   </ListItemText>
                              </ListItemButton>
                         </List>
                    </Box>
               </Box>
          </Fragment>
     );
};
