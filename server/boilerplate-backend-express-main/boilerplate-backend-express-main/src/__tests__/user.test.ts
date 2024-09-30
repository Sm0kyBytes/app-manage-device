import { UserAttributes } from "../../src/models/users/users.entity";
import { UserRequest } from "../../src/modules/users/dto/request";
import { UserModule } from "../../src/modules/users/users.module";
import Usermodel from "../../src/models/users/users.model";
import DefaultError from "../../src/errors/error";
import { ErrorEnum as e } from "../../src/enum/errors";
jest.mock("../../src/models/users/users.model", () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findAndCountAll: jest.fn(),
}));
//

describe("user module  ", () => {
    // Test case
    it("User create success", async () => {
        // Given
        const userModule = new UserModule();
        const data: UserRequest = {
            firstName: "test1",
            lastName: "test1",
            phone: "test1",
            country: "test1",
            email: "test1",
            username: "test1",
            password: "XXXXX",
        };

        const res: UserAttributes = {
            ...data,
            userId: expect.any(String), // Assuming id is auto-generated
            isDeleted: false,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: expect.any(Date),
        };

        (Usermodel.create as jest.Mock).mockResolvedValue(res);

        // When
        const result = await userModule.create(data);

        // Then
        expect(result).toEqual(res);
    });

    it("User create error DUPLICATED email", async () => {
        // Given
        const userModule = new UserModule();
        const data: UserRequest = {
            firstName: "test1",
            lastName: "test1",
            phone: "test1",
            country: "test1",
            email: "test1",
            username: "test1",
            password: "XXXXX",
        };

        const res: UserAttributes = {
            ...data,
            userId: expect.any(String), // Assuming id is auto-generated
            isDeleted: false,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: expect.any(Date),
        };
        (Usermodel.findOne as jest.Mock).mockResolvedValue(res);
        (Usermodel.create as jest.Mock).mockResolvedValue(res);

        // When
        const create = userModule.create(data)
        // Then
        await expect(create).rejects.toThrow(e.DUPLICATED_EMAIL);
    });

    it("User create error INVALID email", async () => {
        // Given
        const userModule = new UserModule();
        const data: UserRequest = {
            firstName: "test1",
            lastName: "test1",
            phone: "test1",
            country: "test1",
            email: "",
            username: "test1",
            password: "XXXXX",
        };

        // When
        const create = userModule.create(data);
        // Then
        await expect(create).rejects.toThrow(e.INVALID_EMAIL);
    });

    it("User create error INVALID_USERNAME_PASSWORD ", async () => {
        // Given
        const userModule = new UserModule();
        const data: UserRequest = {
            firstName: "test1",
            lastName: "test1",
            phone: "test1",
            country: "test1",
            email: "test1",
            username: "test1",
            password: "",
        };

        // When
        const create = userModule.create(data);
        // Then
        await expect(create).rejects.toThrow(e.INVALID_USERNAME_PASSWORD);
    });
});
