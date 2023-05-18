import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Store } from "./features";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth.context";
import { EditorProvider } from "react-simple-wysiwyg";
import { SnackbarProvider } from "notistack";
import axios from "axios";

axios.defaults.withCredentials = true;
// For GET requests
axios.interceptors.request.use(
     (req) => {
          // Add configurations here
          return req;
     },
     (err) => {
          return Promise.reject(err);
     }
);

// For POST requests
axios.interceptors.response.use(
     (res) => {
          res.headers = {
               "set-cookie": [localStorage.getItem("token") as string] as any,
          };
          // Add configurations here
          if (res.status === 201) {
               console.log("Posted Successfully");
          }
          return res;
     },
     (err) => {
          return Promise.reject(err);
     }
);
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
