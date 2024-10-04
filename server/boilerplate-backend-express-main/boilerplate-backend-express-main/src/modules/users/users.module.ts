import { v4 } from "uuid";
import UserModel from "../../models/users/users.model";
import DefaultError from "../../../src/errors/error";
import { ErrorEnum as e } from "../../../src/enum/errors";
import bcrypt from "bcrypt";
import { UserRequest } from "./dto/request";
import { UserListResponse, UserResponse } from "./dto/reponse";
import { validateRegistration } from "../../utils/functions/registrationValidator";

export class UserModule {
    // private user: UserAttributes;
    // private users: UserAttributes[];
    private userModel;

    constructor() {
        this.userModel = UserModel;
    }

    public async findByEmail(email: string): Promise<UserResponse> {
        const user = await this.userModel.findOne({ where: { email } });
        return user as UserResponse;
    }
    public async findByPhone(phone: string): Promise<UserResponse> {
        const user = await this.userModel.findOne({ where: { phone } });
        return user as UserResponse;
    }

    public async getAll(limit: number, page: number): Promise<UserListResponse> {
        var filter = {};
        var offset: number = 0;
        if (page) offset = limit * (page - 1);
        const user = await this.userModel.findAndCountAll({
            ...filter,
            limit,
            offset,
        });
        return user as UserListResponse;
    }
    public async getInfo(id: string): Promise<UserResponse> {
        const user = await this.userModel.findOne({ where: { userId: id } });
        return user as UserResponse;
    }
    public async create(data: UserRequest): Promise<UserResponse> {
        if (!!!data.password) throw new DefaultError(e.INVALID_USERNAME_PASSWORD);
        if (!!!data.email) throw new DefaultError(e.INVALID_EMAIL);
        const validateResult = validateRegistration(data);
        if (validateResult?.errors !== null) {
            const errorString: string = Object.values(validateResult.errors).join();
            throw new DefaultError(errorString);
        }
        const isUniqueEmail = await this.findByEmail(data.email);
        if (isUniqueEmail?.email == data.email) throw new DefaultError(e.DUPLICATED_EMAIL);
        const isUniquePhone = await this.findByPhone(data.phone);
        if (isUniquePhone?.phone == data.phone) throw new DefaultError(e.DUPLICATED_PHONE);

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        const user = await this.userModel.create(data);
        return user as UserResponse;
    }
}
