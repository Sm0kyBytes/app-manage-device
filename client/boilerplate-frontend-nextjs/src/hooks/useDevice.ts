import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeviceModel } from "@/types/device";
import services from "@/services";
const useDevices = () => {
    const [devices, setDevices] = useState<DeviceModel[]>([]);
    const [device, setDevice] = useState<DeviceModel>();
    const [isError, setIsError] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const router = useRouter();
    const defaultPage = "/dashboard";
    const getAllDevices = async () => {
        try {
            setIsError(false);
            setIsLoading(true);
            const response = await services.device.getAll();

            const deviceList: DeviceModel[] = response.data.data.rows;

            setDevices(deviceList);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const deleteDevise = async (deviceId: string) => {
        try {
            setIsError(false);
            setIsLoading(true);
            await services.device.delete(deviceId);
            const newDevices = devices.filter((device) => {
                return device.deviceId !== deviceId;
            });
            setDevices(newDevices);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const createDevice = async (device: DeviceModel) => {
        try {
            setIsError(false);
            setIsLoading(true);
            await services.device.create(device);
            setIsLoading(false);
            router.push(defaultPage);
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };
    const getDeviceById = async (deviceId: string) => {
        try {
            setIsError(false);
            setIsLoading(true);
            const response = await services.device.getById(deviceId);

            const device: DeviceModel = response.data.data;

            setDevice(device);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const updateDeviceById = async (deviceId: string, device: DeviceModel) => {
        try {
            setIsError(false);
            setIsLoading(true);
            await services.device.update(deviceId, device);
            setIsLoading(false);
            router.push(defaultPage);
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    return {
        devices,
        device,
        getAllDevices,
        getDeviceById,
        createDevice,
        updateDeviceById,
        deleteDevise,
        isError,
        isLoading,
    };
};

export default useDevices;
