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

     image: string;
     description: string;
     moreItems: string;
}

export interface NewToursTravelProps {
     displayName: string;
     code: string;
     duration: string;
     place: string;
     theme: string;
     SubCategory: any;
     images: {
          image: string;
          title: string;
     }[];
     description: string;
}

export interface UpdateToursTravelProps {
     id: string;
     data: ToursTravelProps;
}
