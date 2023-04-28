export interface MainCategoryProps {
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
     displayName: string;
}

export interface NewMainCategoryProps {
     displayName: string;
}

export interface UpdateMainCategoryProps {
     id: string;
     data: MainCategoryProps;
}
