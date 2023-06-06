import { Box, Typography } from "@mui/material";
import React from "react";

export const NotFound = () => {
     return (
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="100vh">
               <Box width="50%" textAlign="center">
                    <Typography variant="h3">Page 404! Not Found</Typography>
               </Box>
          </Box>
     );
};
