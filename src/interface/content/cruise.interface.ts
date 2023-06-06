export interface CruisePackageProps {
     image: string;
     displayName: string;
     itinerary: string;
     sailingType: string;
     departure: {
          from: string;
          to: string;
     };
     description: string;
     SubCategory: any;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export interface NewCruisePackageProps {
     image: string;
     displayName: string;
     itinerary: string;
     sailingType: string;
     from: string;
     to: string;
     description: string;
     SubCategory: string;
}

export interface UpdateCruiseProps {
     data: NewCruisePackageProps;
     id: string;
}
