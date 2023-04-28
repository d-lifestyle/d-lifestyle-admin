export interface UserDataProps {
     email: string;
     password: string;
     isAdmin: boolean;
}

export interface AuthContextProps {
     authorization: boolean;
     user: string;
     setAuthorization: React.Dispatch<React.SetStateAction<boolean>>;
     setUser: React.Dispatch<React.SetStateAction<string>>;
}

export interface AuthDataResponse {
     email: string;
     token: string;
}
