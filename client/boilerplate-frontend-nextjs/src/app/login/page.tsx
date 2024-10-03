'use client';
import { TextField, Button, Container, Typography, Box, Card, CardContent, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import Login from '@/types/login';
import { errors as e} from '@/enums/errors';
import services from '@/services';


// Define the Yup validation schema
const validationSchema = yup.object({
  email: yup.string().email(e.EMAIL_FORMAT).required(e.EMAIL_REQUIRED),
  password: yup.string().min(4, e.PASSWORD_MIN_LENGTH).required(e.PASSWORD_REQUIRED),
});

const Page: React.FC = () => {
  const router = useRouter();
  const [errorState, setErrorState] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Login>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "test@test.com",
      password: "test",
    },
  });

  // Handle form submission
  const onSubmit = async (data: Login) => {
    console.log(data);
    try {
      // const response = await services.auth.login(data);
      // {
      //   response.status === 200 && router.push("/dashboard");
      // }

      {data.email === "test@test.com" && data.password === "test" ? router.push("/dashboard") : setErrorState(true)}

    } catch (err: any) {
      setErrorState(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card elevation={3} sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                {...register('email')}
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                {...register('password')}
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
              {errorState && <Alert sx={{ mt: 2, justifyContent: 'center' }} severity="error">{e.LOGIN_FAILED}</Alert>}
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Page;
