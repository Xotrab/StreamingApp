export interface ApiResponse<T> {
    success: boolean;
    message: string;
    errors? : Array<string>;
    data?: T;
}
