export interface ContactFormProps {
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
     name: string;
     email: string;
     phone: string;
     placeToVisit?: string;
     body?: string;
     favorite: boolean;
}

export interface EnquiryFormProps {
     dataId: any;
     checkIn: string;
     checkOut: string;
     fullName: string;
     email: string;
     phone: string;
     body?: string;
     favorite?: boolean;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}
