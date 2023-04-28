import React from "react";

import { Button, ButtonProps } from "@mui/material";

export const AppButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
     return (
          <Button variant="contained" color="primary" {...rest}>
               {children}
          </Button>
     );
};
