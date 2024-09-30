import { v4 } from "uuid";
import UserModel from "../../models/users/users.model";
import DefaultError from "../../../src/errors/error";
import { ErrorEnum as e } from "../../../src/enum/errors";
import bcrypt from "bcrypt";
import { UserRequest } from "./dto/request";
import { UserListResponse, UserResponse } from "./dto/reponse";

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
    const userRes = await this.findByEmail(data.email);
    if (userRes?.email == data.email)
      throw new DefaultError(e.DUPLICATED_EMAIL);

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const user = await this.userModel.create(data);
    return user as UserResponse;
  }
}
