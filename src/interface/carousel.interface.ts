export interface CarouselProps {
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
     dataImage: string;
     dataAlt: string;
}

export interface NewCarouselProps {
     dataImage: string;
     dataAlt: string;
}

export interface UpdateCarouselProps {
     id: string;
     data: CarouselProps;
}