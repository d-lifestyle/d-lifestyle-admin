import React from "react";

import { ChevronRight, Circle, ExpandMore } from "@mui/icons-material";
import {
     Collapse,
     List,
     ListItemButton,
     ListItemIcon,
     ListItemText,
     useTheme,
     Typography,
} from "@mui/material";
import { MenuItem } from "../menu-item";

export interface CollapsibleMenuProps {
     menu: boolean;
     handleCollapsible: () => void;
     title: string;
     icon: JSX.Element;
     menus: MenuProps[];
}

export interface MenuProps {
     title: string;

     path: string;
}

export const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({
     handleCollapsible,
     icon,
     menu,
     title,
     menus,
}) => {
     const { palette } = useTheme();
     return (
          <React.Fragment>
               <ListItemButton onClick={handleCollapsible}>
                    <ListItemIcon
                         sx={{
                              color: palette.grey[500],
                         }}
                    >
                         {icon}
                    </ListItemIcon>
                    <ListItemText
                         sx={{
                              textTransform: "capitalize",
                              color: palette.grey[600],
                         }}
                    >
                         <Typography variant="body2">{title}</Typography>
                    </ListItemText>
                    {menu ? (
                         <ExpandMore
                              sx={{
                                   color: palette.grey[600],
                              }}
                         />
                    ) : (
                         <ChevronRight
                              sx={{
                                   color: palette.grey[600],
                              }}
                         />
                    )}
               </ListItemButton>
               <Collapse in={menu} timeout="auto" unmountOnExit>
                    <List>
                         {menus.map(({ path, title }, i) => (
                              <MenuItem
                                   key={i}
                                   path={path}
                                   title={title}
                                   icon={<Circle sx={{ fontSize: 10 }} />}
                              />
                         ))}
                    </List>
               </Collapse>
          </React.Fragment>
     );
};
