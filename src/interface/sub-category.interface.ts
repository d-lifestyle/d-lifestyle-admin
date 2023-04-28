import { CategoriesProps } from "./category.interface";

export interface SubCategoryProps {
     name: string;
     CategoryId: CategoriesProps;

     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}



export interface NewSubCategoryProps {
     name: string;
     CategoryId: string;
}

export interface UpdateSubCategoryProps {
     id: string;
     data: SubCategoryProps;
}