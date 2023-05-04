export interface UserDataProps {
     _id?: string;
     email: string;
     password: string;
     isAdmin: boolean;
     firstName: string;
     lastName: string;
     contactInfo: ContactProps;
     aboutInfo: AboutProps;
     createdAt?: string;
     updatedAt?: string;
}

export interface ContactProps {
     address: string;
     phone: string;
     instaLink?: string;
     fbLink?: string;
}

export interface AboutProps {
     aboutText: string;
     logo: string;
     slogan?: string;
     termsCondition: string;
     privacyPolicy: string;
     support: string;
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

export interface UpdateProfileProps {
     id: string;
     data: UserDataProps;
}