export interface LoginProps {
     email: string;
     password: string;
}

export interface UserProps {
     token: string;
     email: string;
     password: string;
     isAdmin: boolean;
}
