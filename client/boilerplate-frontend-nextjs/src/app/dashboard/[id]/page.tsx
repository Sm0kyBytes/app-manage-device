"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import useDevices from "@/hooks/useDevice";
import { DeviceModel } from "@/types/device";
import { errors as e } from "@/enums/errors";
//import MUI
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
const defaultPage = "/dashboard";

const EditDevicePage: React.FC = () => {
    const { getDeviceById, device, updateDeviceById, isLoading, isError } = useDevices();
    const [deviceName, setDeviceName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    interface ErrorFieldDeviceModel {
        deviceName?: { message: string };
        description?: { message: string };
        category?: { message: string };
    }

    const [errors, setErrors] = useState<ErrorFieldDeviceModel>({});
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const cardStyle = {
        width: "40vw",
        minWidth: 300,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "1px solid #888888",
        boxShadow: "5px 10px #888888",
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({});
        const returnError: ErrorFieldDeviceModel = {};
        if (!deviceName || deviceName === "") {
            returnError.deviceName = { message: e.DEVICE_NAME_REQUIRED };
        }
        if (!description || description === "") {
            returnError.description = { message: e.DESCRIPTION_REQUIRED };
        }
        if (!category || category === "") {
            returnError.category = { message: e.CATEGORY_REQUIRED };
        }

        if (Object.keys(returnError)[0] === undefined) {
            const newDevice: DeviceModel = {
                deviceName,
                description,
                category,
            };
            updateDeviceById(id, newDevice);
        } else {
            setErrors(returnError);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            getDeviceById(id);
        }
    }, []);

    useEffect(() => {
        if (device) {
            setDeviceName(device.deviceName);
            setDescription(device.description);
            setCategory(device.category);
        }
    }, [device]);
    return (
        <div>
            {isLoading ? (
                <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <h2>404 - Page Not Found</h2>
            ) : (
                <>
                    {device ? (
                        <Card sx={cardStyle}>
                            <CardContent>
                                <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                                    Edit Device Form
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <div
                                        className="input-container"
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TextField
                                            label="deviceName"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setDeviceName(event.target.value);
                                            }}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.deviceName}
                                            helperText={errors.deviceName?.message}
                                            value={deviceName}
                                        />
                                        <TextField
                                            label="description"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setDescription(event.target.value);
                                            }}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.description}
                                            helperText={errors.description?.message}
                                            value={description}
                                        />
                                        <TextField
                                            label="category"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setCategory(event.target.value);
                                            }}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.category}
                                            helperText={errors.category?.message}
                                            value={category}
                                        />
                                        <Button disabled={!!isLoading} type="submit" fullWidth sx={{ fontWeight: 700 }}>
                                            Submit
                                        </Button>
                                        {isError && (
                                            <Alert sx={{ mt: 2, justifyContent: "center" }} severity="error">
                                                {e.SERVER_FAILED}
                                            </Alert>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => router.push(defaultPage)}>
                                    Back
                                </Button>
                            </CardActions>
                        </Card>
                    ) : (
                        <div>
                            <p>Not device found.</p>
                        </div>
                    )}
                </>
                //
            )}
        </div>
    );
};

export default EditDevicePage;
