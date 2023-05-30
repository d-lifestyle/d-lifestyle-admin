export interface BlogProps {
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
     label: string;
     images: string;
     body: string;
}

export interface NewBlogProps {
     label: string;
     images: string;
     body: string;
}

export interface UpdateBlogProps {
     id: string;
     data: BlogProps;
}
