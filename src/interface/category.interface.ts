export interface CategoriesProps {
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
     displayName: string;
}

export interface NewCategoryProps {
     displayName: string;
}

export interface UpdateCategoryProps {
     id: string;
     data: CategoriesProps;
}
