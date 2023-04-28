export interface CategoriesProps {
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
     name: string;
     parentCategory: any;
}

export interface NewCategoryProps {
     name: string;
     parentCategory: string;
}

export interface UpdateCategoryProps {
     id: string;
     data: CategoriesProps;
}
