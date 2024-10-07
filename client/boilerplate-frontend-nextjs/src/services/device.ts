import httpClient from "@/services/httpClient";
import { DeviceModel } from "@/types/device";

export default {
    getAll: () => httpClient.get("/device"),
    getById: (id: string) => httpClient.get(`/device/${id}`),
    create: (data: DeviceModel) => httpClient.post("/device", data),
    update: (id: string, data: DeviceModel) => httpClient.put(`/device/${id}`, data),
    delete: (id: string) => httpClient.delete(`/device/${id}`),
};
