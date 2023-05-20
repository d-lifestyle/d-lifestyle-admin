import React, { Fragment } from "react";

import { AccountCircle } from "@mui/icons-material";
import { useTheme, Box, List } from "@mui/material";
import { MenuItem, MenuTitle } from "../";
import { ProfileCard } from "../profile-card";
import { Link } from "react-router-dom";
import { AiOutlineDatabase, AiOutlineForm, AiOutlinePieChart, AiOutlineUserAdd } from "react-icons/ai";
import { BsCardChecklist, BsWebcam } from "react-icons/bs";
import { MdOutlineCategory, MdTravelExplore } from "react-icons/md";
import { BiCarousel, BiCategoryAlt, BiJoystickAlt, BiUserCheck } from "react-icons/bi";

export interface DrawerItemsProps {
     handleCollapsible: () => void;
     collapsible: boolean;
     user: any;
}

const iconSize: number = 22;

export const DrawerItems: React.FC<DrawerItemsProps> = ({ collapsible, handleCollapsible, user }) => {
     const { spacing } = useTheme();

     return (
          <Fragment>
               <Box px={spacing(2)} pb={spacing(5)} pt={spacing(5)}>
                    <Link to="/admin/profile" style={{ textDecoration: "none", color: "inherit" }}>
                         <ProfileCard
                              image={user.data.aboutInfo.logo}
                              adminemail={user?.data?.email}
                              adminname={`${user?.data?.firstName} ${user?.data?.lastName}`}
                         />
                    </Link>
                    <Box mt={spacing(3)}>
                         <MenuTitle title="general" />
                         <List disablePadding>
                              <MenuItem path="/" title="dashboard" icon={<AiOutlinePieChart size={iconSize} />} />
                              <MenuItem
                                   path="/general/contact"
                                   title="customers"
                                   icon={<AiOutlineUserAdd size={iconSize} />}
                              />
                              <MenuItem
                                   path="/general/enquiry"
                                   title="Enquiry"
                                   icon={<AiOutlineForm size={iconSize} />}
                              />
                         </List>
                    </Box>
                    <Box mt={spacing(3)}>
                         <MenuTitle title="analysis" />
                         <MenuItem
                              path="/analytics/database"
                              title="database"
                              icon={<AiOutlineDatabase size={iconSize} />}
                         />
                         <MenuItem path="/analytics/webpage" title="website" icon={<BsWebcam size={iconSize} />} />
                    </Box>
                    <Box mt={spacing(3)}>
                         <MenuTitle title="content management system" />
                         <List disablePadding>
                              <MenuItem
                                   path="/manage/carousel"
                                   title="carousel"
                                   icon={<BiCarousel size={iconSize} />}
                              />
                              <MenuItem
                                   path="/manage/main-category"
                                   title="main category"
                                   icon={<MdOutlineCategory size={iconSize} />}
                              />
                              <MenuItem
                                   path="/manage/category"
                                   title="category"
                                   icon={<BsCardChecklist size={iconSize} />}
                              />
                              <MenuItem
                                   path="/manage/sub-category"
                                   title="sub category"
                                   icon={<BiCategoryAlt size={iconSize} />}
                              />
                         </List>
                    </Box>
                    <Box mt={spacing(3)}>
                         <MenuTitle title="blog" />
                         <List disablePadding>
                              <MenuItem path="/manage/blog" title="Blogs" icon={<MdTravelExplore size={iconSize} />} />
                              <MenuItem
                                   path="/add/blog"
                                   title="Write new blog"
                                   icon={<BiJoystickAlt size={iconSize} />}
                              />
                         </List>
                    </Box>
                    <Box mt={spacing(3)}>
                         <MenuTitle title="content" />
                         <List disablePadding>
                              <MenuItem
                                   path="/manage/accommodation"
                                   title="accommodation"
                                   icon={<MdTravelExplore size={iconSize} />}
                              />
                              <MenuItem
                                   path="/manage/tours-travel"
                                   title="tours & travel"
                                   icon={<BiJoystickAlt size={iconSize} />}
                              />
                         </List>
                    </Box>
                    <Box mt={spacing(3)}>
                         <List disablePadding>
                              <MenuTitle title="Admin connected users" />
                              <MenuItem path="/manage/users" title="users" icon={<BiUserCheck size={iconSize} />} />
                         </List>
                    </Box>
                    <Box mt={spacing(3)}>
                         <MenuTitle title="Account settings" />
                         <List disablePadding>
                              <MenuItem path="/admin/profile" title="My Profile" icon={<AccountCircle />} />
                         </List>
                    </Box>
               </Box>
          </Fragment>
     );
};
