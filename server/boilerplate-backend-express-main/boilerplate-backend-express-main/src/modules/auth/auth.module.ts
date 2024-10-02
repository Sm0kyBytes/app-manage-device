import UserModel from "../../models/users/users.model";
import { LoginResponse } from "./dto/reponse";

export class AuthModule {
    private userModel;

    constructor() {
        this.userModel = UserModel;
    }

    public async loginByEmail(email: string): Promise<LoginResponse> {
        const user = await this.userModel.findOne({ where: { email } });
        return user as LoginResponse;
    }
}
