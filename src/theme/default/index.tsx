import { createTheme } from "@mui/material";
import { Palette } from "./palette";
import { Shadow } from "./shadow";
import { Typography } from "./typography";

export const Theme = createTheme({
     palette: Palette,
     typography: Typography,
     shadows: Shadow,
     shape: {
          borderRadius: 10,
     },
     components: {
          MuiDivider: {
               styleOverrides: {
                    root: {
                         borderStyle: "dashed",
                    },
               },
          },
          MuiCard: {
               styleOverrides: {
                    root: {
                         boxShadow: `rgb(145 158 171 / 20%) 0px 2px 4px -1px, rgb(145 158 171 / 14%) 0px 4px 5px 0px, rgb(145 158 171 / 12%) 0px 1px 10px 0px`,
                    },
               },
          },
          MuiButton: {
               styleOverrides: {
                    contained: {
                         boxShadow: `rgb(145 158 171 / 20%) 0px 6px 7px -4px, rgb(145 158 171 / 14%) 0px 11px 15px 1px, rgb(145 158 171 / 12%) 0px 4px 20px 3px`,
                         color: "#fff",
                         fontWeight: 500,
                         textTransform: "capitalize",
                         borderRadius: 5,
                         "&:hover": {
                              boxShadow: "none",
                         },
                    },
                    outlined: {
                         textTransform: "capitalize",

                         borderRadius: 10,
                         "&:hover": {
                              boxShadow: "none",
                         },
                    },
               },
               defaultProps: {
                    disableRipple: true,
                    disableTouchRipple: true,
               },
          },
          MuiTab: {
               defaultProps: {
                    disableFocusRipple: true,
                    disableRipple: true,
                    disableTouchRipple: true,
               },
               styleOverrides: {
                    root: {
                         textTransform: "capitalize",
                    },
               },
          },
          MuiTabs: {
               defaultProps: {
                    disableRipple: true,
                    disableTouchRipple: true,
               },
               styleOverrides: {
                    indicator: {
                         border: `2px solid #00AB55`,
                    },
               },
          },
          MuiTableContainer: {
               styleOverrides: {
                    root: {
                         borderRadius: 0,
                    },
               },
          },
          MuiTableCell: {
               styleOverrides: {
                    root: {
                         paddingTop: "5px",
                         paddingBottom: "5px",
                    },
               },
          },
     },
});
