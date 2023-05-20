import { useTheme, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export interface MediumCardProps {
     icon?: JSX.Element;
     title: string;
     value: number;
     path: string;
}

export const MediumCard: React.FC<MediumCardProps> = ({ icon, title, value, path }) => {
     const { spacing, shadows, palette } = useTheme();
     return (
          <Link style={{ color: "inherit", textDecoration: "none" }} to={path}>
               <Box
                    borderRadius={spacing(2)}
                    px={spacing(5)}
                    py={spacing(3)}
                    border={`1px solid ${palette.grey[300]}`}
                    boxShadow={shadows[10]}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    height="100%"
               >
                    <Box display="flex" flexDirection="column" gap={spacing(1)}>
                         <Typography
                              sx={{
                                   textTransform: "capitalize",
                                   color: palette.grey[900],
                                   fontWeight: 500,
                              }}
                              variant="body2"
                         >
                              {title}
                         </Typography>
                         <Typography variant="h3" sx={{ marginTop: spacing(1) }} color={palette.grey[900]}>
                              {value}
                         </Typography>
                    </Box>
                    {icon && icon}
               </Box>
          </Link>
     );
};
