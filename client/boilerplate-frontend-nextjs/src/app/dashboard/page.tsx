"use client";
import React, { useEffect } from "react";
import useDevices from "@/hooks/useDevice";
import { useRouter } from "next/navigation";
import { DeviceModel } from "@/types/device";
//import Mui
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
type Props = {};
const Page: React.FC = ({}: Props) => {
    const { devices, getAllDevices, deleteDevise, isError, isLoading } = useDevices();
    const router = useRouter();

    const cardStyle = {
        minWidth: 275,
        margin: 2,
        border: "1px solid #888888",
        boxShadow: "5px 10px #888888",
    };

    useEffect(() => {
        getAllDevices();
    }, []);

    return (
        <div>
            {isLoading ? (
                <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <h2>404 - Page Not Found</h2>
            ) : (
                <div>
                    <h2>Your devices:</h2>
                    <div>
                        {devices[0] ? (
                            devices.map((device: DeviceModel) => (
                                <Card key={device.deviceId} sx={cardStyle}>
                                    <CardContent>
                                        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                                            {device.category}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {device.deviceName}
                                        </Typography>
                                        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                                            {device.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => router.push(`/dashboard/${device.deviceId}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button size="small" onClick={() => deleteDevise(device.deviceId || "")}>
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))
                        ) : (
                            <div>
                                <p>Not device found.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
