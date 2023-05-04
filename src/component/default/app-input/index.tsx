import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

export const AppInput: React.FC<TextFieldProps> = ({ inputProps, ...rest }) => {
     return (
          <TextField
               margin="dense"
               fullWidth
               FormHelperTextProps={{
                    style: {
                         textTransform: "uppercase",
                         marginTop: 10,
                         fontSize: 10,
                         textAlign: "right",
                    },
               }}
               inputProps={inputProps}
               color="primary"
               variant="outlined"
               {...rest}
          />
     );
};
