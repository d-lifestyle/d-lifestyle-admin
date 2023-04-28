import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export interface MenuTitleProps {
     title: string;
}

export const MenuTitle: React.FC<MenuTitleProps> = ({ title }) => {
     const { spacing } = useTheme();
     return (
          <Box px={spacing(2)}>
               <Typography
                    sx={{
                         textTransform: "uppercase",
                         fontWeight: 600,
                         fontSize: 11,
                         mb: spacing(1),
                    }}
               >
                    {title}
               </Typography>
          </Box>
     );
};
