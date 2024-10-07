"use client";
import React, { useState } from "react";
import { DeviceModel } from "@/types/device";
import useDevices from "@/hooks/useDevice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errors as e } from "@/enums/errors";
//import MUI
import { Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const validationSchema = yup.object({
    deviceName: yup.string().required(e.DEVICE_NAME_REQUIRED),
    description: yup.string().required(e.DESCRIPTION_REQUIRED),
    category: yup.string().required(e.CATEGORY_REQUIRED),
});

type Props = {};

const CreateDevicePage: React.FC = ({}: Props) => {
    const [errorMessage, setErrorMessage] = useState<string>(e.SERVER_FAILED);
    const router = useRouter();
    const { createDevice, isLoading, isError } = useDevices();

    const defaultPage = "/dashboard";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DeviceModel>({
        resolver: yupResolver(validationSchema),
    });

    const cardStyle = {
        minWidth: 300,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "1px solid #888888",
        boxShadow: "5px 10px #888888",
    };

    const onSubmit = async (newDevice: DeviceModel) => {
        createDevice(newDevice);
    };
    return (
        <Card sx={cardStyle}>
            <CardContent>
                <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                    Create Device Form
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Device Name"
                        {...register("deviceName")}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.deviceName}
                        helperText={errors.deviceName?.message}
                    />
                    <TextField
                        label="Description"
                        {...register("description")}
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <TextField
                        label="Category"
                        {...register("category")}
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.category}
                        helperText={errors.category?.message}
                    />
                    <Button
                        disabled={!!isLoading}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Submit
                    </Button>
                    {isError && (
                        <Alert sx={{ mt: 2, justifyContent: "center" }} severity="error">
                            {e.SERVER_FAILED}
                        </Alert>
                    )}
                </form>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => router.push(defaultPage)}>
                    Back
                </Button>
            </CardActions>
        </Card>
    );
};

export default CreateDevicePage;
