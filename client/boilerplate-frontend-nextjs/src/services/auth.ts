import httpClient from "@/services/httpClient";
import Login from "@/types/login";

export default {
  login: (data: Login) => httpClient.post("/auth", data),
};

