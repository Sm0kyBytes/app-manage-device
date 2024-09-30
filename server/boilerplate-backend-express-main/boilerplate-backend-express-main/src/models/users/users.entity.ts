export type UserAttributes = {
    userId?: string;
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    email: string;
    username: string;
    password: string;
    isDeleted?: boolean;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
};

class UserEntity {
    private user: UserAttributes
    constructor(user: UserAttributes){
        this.user = user
    }
    public getUser(): UserAttributes{
        return this.user
    }
    public setUser(user: UserAttributes): void{
        this.user = user
    }
}