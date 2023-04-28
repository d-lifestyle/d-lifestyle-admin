import {
     Typography,
     useTheme,
     ListItemButton,
     ListItemIcon,
     ListItemText,
} from "@mui/material";

import React from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

export interface MenuItemProps {
     icon: JSX.Element;
     title: string;
     path: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ icon, title, path }) => {
     const { spacing, palette } = useTheme();
     let resolved = useResolvedPath(path);
     let match = useMatch({ path: resolved.pathname, end: true });
     return (
          <NavLink
               to={path}
               style={{
                    textDecoration: "none",
                    textTransform: "capitalize",
                    color: "#637281",
               }}
          >
               <ListItemButton
                    sx={{
                         background: match && palette.primary.light,
                         borderRadius: spacing(1.5),
                         color: match && palette.primary.main,
                         marginTop: spacing(0.5),
                    }}
               >
                    <ListItemIcon
                         style={{
                              fill: match ? palette.primary.main : "#637281",
                              color: match ? palette.primary.main : "#637281",
                         }}
                    >
                         {icon}
                    </ListItemIcon>
                    <ListItemText
                         sx={{
                              textTransform: "capitalize",
                              color: match ? palette.primary.main : "#637281",
                              marginLeft: -3,
                         }}
                    >
                         <Typography fontWeight="600" variant="body2">
                              {title}
                         </Typography>
                    </ListItemText>
               </ListItemButton>
          </NavLink>
     );
};
