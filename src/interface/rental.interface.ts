export interface RentalProps {
     _id?: string;
     createdAt?: string;
     updateAt?: string;
     carRentalName: string;
     image: {
          title: string;
          image: string;
     }[];
     peopleAllowed: string;
     location: {
          from: string;
          to: string;
     };
     options: "self" | "driver" | "chauffeur";
     SubCategory: any;
}

export interface NewRentalProps {
     carRentalName: string;
     image: {
          title: string;
          image: string;
     }[];
     peopleAllowed: string;
     location: {
          from: string;
          to: string;
     };
     options: "self" | "driver" | "chauffeur";
     SubCategory: any;
}

export interface UpdateRentalProps {
     id: string;
     data: RentalProps;
}
