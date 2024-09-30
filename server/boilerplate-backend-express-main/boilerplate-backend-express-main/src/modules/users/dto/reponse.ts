
export type UserResponse = {
    userId: string;
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    email: string;
}
export type UserListResponse = {
    rows: UserResponse[];
    count: number;
}