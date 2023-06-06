import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { EditorProvider } from "react-simple-wysiwyg";
import { SnackbarProvider } from "notistack";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./redux";

axios.defaults.withCredentials = true;

ReactDOM.render(
     <React.StrictMode>
          <Provider store={store}>
               <BrowserRouter>
                    <SnackbarProvider autoHideDuration={2000} anchorOrigin={{ horizontal: "right", vertical: "top" }}>
                         <EditorProvider>
                              <App />
                         </EditorProvider>
                    </SnackbarProvider>
               </BrowserRouter>
          </Provider>
     </React.StrictMode>,
     document.getElementById("root")
);
