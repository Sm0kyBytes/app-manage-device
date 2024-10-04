"use client";
import { TextField, Button, Container, Typography, Box, Card, CardContent, CardActions, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import Register from "@/types/register";
import { errors as e } from "@/enums/errors";
import services from "@/services";

// Define the Yup validation schema
const validationSchema = yup.object({
    firstName: yup.string().required(e.FIRSTNAME_REQUIRED),
    lastName: yup.string().required(e.LASTNAME_REQUIRED),
    phone: yup.string().required(e.PHONE_REQUIRED),
    country: yup.string().required(e.COUNTRY_REQUIRED),
    username: yup.string().required(e.USERNAME_REQUIRED),
    email: yup.string().email(e.EMAIL_FORMAT).required(e.EMAIL_REQUIRED),
    password: yup
        .string()
        .required(e.PASSWORD_REQUIRED)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/, e.PASSWORD_FORMAT),
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
    } = useForm<Register>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            firstName: "test",
            lastName: "test",
            phone: "xxx-xxx-xxxx",
            country: "test",
            username: "test",
            email: "test@test.com",
            password: "Test1234",
        },
    });

    // Handle form submission
    const onSubmit = async (data: Register) => {
        setIsLoading(true);

        try {
            const response = await services.auth.register(data);

            {
                if (response.status === 200) {
                    router.push("/login");
                }
            }
            // {
            //     data.email === "test@test.com" && data.password === "Test1234"
            //         ? router.push("/login")
            //         : setIsLoading(false);
            // }
        } catch (err: any) {
            console.log(err);
            if (err.status === 400) {
                switch (err.response.data.message) {
                    case "DuplicatedEmailError":
                        setErrorMessage(e.DUPLICATED_EMAIL);
                        break;
                    case "DuplicatedPhoneError":
                        setErrorMessage(e.DUPLICATED_PHONE);
                        break;
                    default:
                        setErrorMessage(e.REGISTRATION_FAILED);
                        break;
                }
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

    const goToLoginPage = (event: React.MouseEvent<HTMLElement>) => {
        router.push("/login");
    };
    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
                <Card sx={cardStyle}>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom align="center">
                            Registration
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                label="First name"
                                {...register("firstName")}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                            <TextField
                                label="Last name"
                                {...register("lastName")}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                            <TextField
                                label="Phone"
                                {...register("phone")}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                            <TextField
                                label="Country"
                                {...register("country")}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.country}
                                helperText={errors.country?.message}
                            />
                            <TextField
                                label="Username"
                                {...register("username")}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
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
                                REGISTER
                            </Button>
                            {errorState && (
                                <Alert sx={{ mt: 2, justifyContent: "center" }} severity="error">
                                    {errorMessage}
                                </Alert>
                            )}
                        </form>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={goToLoginPage}>
                            Already have account?
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
};

export default Page;
