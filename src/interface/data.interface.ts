export interface DataStateProps<T> {
     data: T[];
     single: T;
     error: string;
     success: string;
     loading: boolean;
}
