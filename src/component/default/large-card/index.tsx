import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export interface LargeCardProps {
     image: string;
     name: string;
     value: string;
}

export const LargeCard: React.FC<LargeCardProps> = ({ image, name, value }) => {
     const { spacing, palette } = useTheme();
     return (
          <Box
               borderRadius={spacing(2)}
               px={spacing(5)}
               py={spacing(3)}
               border={`1px solid ${palette.grey[300]}`}
               // boxShadow={shadows[10]}
               display="flex"
               alignItems="center"
               flexDirection="column"
               justifyContent="center"
               flexWrap="wrap"
               bgcolor={palette.primary.light}
               height="100%"
          >
               <Typography
                    sx={{
                         textTransform: "capitalize",
                         color: palette.grey[900],
                         fontWeight: 700,
                    }}
                    variant="h4"
               >
                    {name}
               </Typography>
               <Typography
                    variant="h3"
                    sx={{ marginTop: spacing(1) }}
                    color={palette.grey[900]}
               >
                    {value}
               </Typography>
               <img src={image} alt="" />
          </Box>
     );
};
