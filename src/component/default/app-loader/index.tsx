import { Box } from "@mui/material";
import React, { FC } from "react";

export const Loader: FC = () => {
     return (
          <Box display="flex" height="100vh" flexDirection="row" justifyContent="center" alignItems="cen">
               <img src="/images/loading.gif" alt="loading" />
          </Box>
     );
};
