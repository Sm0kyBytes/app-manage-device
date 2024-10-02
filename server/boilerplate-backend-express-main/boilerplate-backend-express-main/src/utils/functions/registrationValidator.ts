import Validator from "validatorjs";
import { UserRequest } from "src/modules/users/dto/request";
interface validRes {
    errors: Validator.ValidationErrors | null;
}
export const validateRegistration = (data: UserRequest): validRes => {
    const rules = {
        firstName: "required|string",
        lastName: "required|string",
        phone: "required|string",
        country: "required|string",
        email: "required|email",
        username: "required|string",
        password: ["required", "regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,15}$/"],
    };

    const customMessages = {
        "required.firstName": "First Name is required.",
        "required.lastName": "Last Name is required.",
        "required.phone": "Phone is required.",
        "required.country": "Country is required.",
        "required.email": "Email is required.",
        "required.username": "Username is required.",
        "required.password": "Password is required.",
        "regex.password":
            "Password must contain both uppercase and lowercase letters, numbers, and be between 8 and 15 characters long.",
    };
    const res: validRes = {
        errors: null,
    };
    const validator = new Validator(data, rules, customMessages);
    if (validator.fails()) {
        res.errors = validator.errors.all();

        return res;
    }
    return res;
};
