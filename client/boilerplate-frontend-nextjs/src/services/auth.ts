import httpClient from "@/services/httpClient";
import Login from "@/types/login";
import Register from "@/types/register";

export default {
    login: (data: Login) => httpClient.post("/auth", data),
    register: (data: Register) => httpClient.post("/user", data),
};
