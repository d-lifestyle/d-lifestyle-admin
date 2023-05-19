import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { Store } from "./features";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth.context";
import { EditorProvider } from "react-simple-wysiwyg";
import { SnackbarProvider } from "notistack";
import axios from "axios";

axios.defaults.withCredentials = true;

ReactDOM.render(
     <React.StrictMode>
          <Provider store={Store}>
               <AuthContextProvider>
                    <BrowserRouter>
                         <SnackbarProvider
                              autoHideDuration={2000}
                              anchorOrigin={{ horizontal: "right", vertical: "top" }}
                         >
                              <EditorProvider>
                                   <App />
                              </EditorProvider>
                         </SnackbarProvider>
                    </BrowserRouter>
               </AuthContextProvider>
          </Provider>
     </React.StrictMode>,
     document.getElementById("root")
);
