import React, { createContext, FC, useContext, useState } from "react";
import { AuthContextProps } from "../interface";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider: FC = ({ children }) => {
     const [user, setUser] = useState<any>(null);
     const [authorization, setAuthorization] = useState<boolean>(false);

     const values = { authorization, user, setAuthorization, setUser };
     return (
          <AuthContext.Provider value={values}>
               <main>{children}</main>
          </AuthContext.Provider>
     );
};

export const useAuth = () => {
     return useContext(AuthContext);
};
