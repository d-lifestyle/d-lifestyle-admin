export interface AccommodationProps {
     displayName: string;
     image: {
          image: string;
          title: string;
     }[];
     description: string;
     city: string;
     state: string;
     SubCategory: any;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export interface NewAccommodationProps {
     displayName: string;
     city: string;
     state: string;
     SubCategory: any;
     image: {
          title: string;
          image: string;
     }[];
     description: string;
}

export interface UpdateAccommodationProps {
     id: string;
     data: AccommodationProps;
}
