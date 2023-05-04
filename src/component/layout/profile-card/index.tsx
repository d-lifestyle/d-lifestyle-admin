import { Avatar, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export interface ProfileCardProps {
     image: string;
     adminname: string;
     adminemail: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
     adminemail,
     adminname,
     image,
}) => {
     const { spacing, palette } = useTheme();

     return (
          <Box
               component="div"
               display="flex"
               py={spacing(2)}
               px={spacing(1)}
               alignItems="center"
               borderRadius={spacing(1.5)}
               bgcolor={palette.grey[300]}
               gap={spacing(2)}
          >
               <Avatar src={image} alt={adminname} />
               <Box component="span">
                    <Typography textTransform="capitalize" sx={{ fontSize: 14 }}>
                         {adminname}
                    </Typography>
                    <Typography variant="caption">{adminemail}</Typography>
               </Box>
          </Box>
     );
};
