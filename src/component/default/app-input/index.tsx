import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

export const AppInput: React.FC<TextFieldProps> = ({ ...rest }) => {
     return (
          <TextField
               InputLabelProps={{
                    margin: "dense",
               }}
               margin="dense"
               fullWidth
               FormHelperTextProps={{
                    style: {
                         textTransform: "capitalize",
                         marginTop: 10,
                         textAlign: "right",
                    },
               }}
               InputProps={{
                    color: "primary",
               }}
               {...rest}
          />
     );
};
