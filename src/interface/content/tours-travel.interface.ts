export interface ToursTravelProps {
     displayName: string;
     code: string;
     duration: string;
     place: string;
     theme: string;
     SubCategory: any;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export interface NewToursTravelProps {
     displayName: string;
     code: string;
     duration: string;
     place: string;
     theme: string;
     SubCategory: any;
}

export interface UpdateToursTravelProps {
     id: string;
     data: ToursTravelProps;
}
