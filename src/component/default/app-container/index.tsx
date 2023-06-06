import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";

export interface AppContainerProps {
     children: ReactNode;
     width?: string;
}

export const AppContainer: FC<AppContainerProps> = ({ children, width }) => {
     return (
          <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
               <Box p={3} width={width ? width : "50%"}>
                    {children}
               </Box>
          </Box>
     );
};
