"use client";
import { TextField, Button, Container, Typography, Box, Card, CardContent, CardActions, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import Login from "@/types/login";
import { errors as e } from "@/enums/errors";
import services from "@/services";

// Define the Yup validation schema
const validationSchema = yup.object({
    email: yup.string().email(e.EMAIL_FORMAT).required(e.EMAIL_REQUIRED),
    password: yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/, e.PASSWORD_FORMAT)
        .required(e.PASSWORD_REQUIRED),
});

const Page: React.FC = () => {
    const router = useRouter();
    const [errorState, setErrorState] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(e.SERVER_FAILED);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: "test@test.com",
            password: "Test1234",
        },
    });

    // Handle form submission
    const onSubmit = async (data: Login) => {
        setIsLoading(true);
        try {
            const response = await services.auth.login(data);
            {
                if (response.data.data.token) {
                    const token = response.data.data.token;
                    localStorage.setItem("authToken", token);
                    router.push("/dashboard");
                } else {
                    setErrorMessage(e.LOGIN_FAILED);
                    setErrorState(true);
                    setIsLoading(false);
                }
            }

            // {
            //     data.email === "test@test.com" && data.password === "Test1234"
            //         ? router.push("/dashboard")
            //         : setErrorState(true);
            // }
        } catch (err: any) {
            if (err.status === 400) {
                setErrorMessage(e.INVALID_USERNAME_PASSWORD);
            } else {
                setErrorMessage(e.SERVER_FAILED);
            }
            setErrorState(true);
            setIsLoading(false);
        }
    };

    // Change Style Card
    const cardStyle = {
        width: "100%",
        padding: "5%",
        border: "1px solid #888888",
        boxShadow: "5px 10px #888888",
    };

    const goToRegisterPage = (event: React.MouseEvent<HTMLElement>) => {
        router.push("/register");
    };
    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
                <Card sx={cardStyle}>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom align="center">
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                label="Email"
                                {...register("email")}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                label="Password"
                                {...register("password")}
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                            <Button
                                disabled={!!isLoading}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                            {errorState && (
                                <Alert sx={{ mt: 2, justifyContent: "center" }} severity="error">
                                    {errorMessage}
                                </Alert>
                            )}
                        </form>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={goToRegisterPage}>
                            Do not have account?
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
};

export default Page;
