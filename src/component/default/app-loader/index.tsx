import { Box, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import { TbLoader2 } from "react-icons/tb";

export const Loader: FC = () => {
     const { palette } = useTheme();
     return (
          <Box height="70vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
               <TbLoader2 className="loading" size={150} color={palette.primary.main} />
               <Typography variant="h6">Swapping time and space...</Typography>
          </Box>
     );
};
