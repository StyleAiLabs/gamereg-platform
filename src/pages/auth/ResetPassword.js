import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import { useAuth } from '../../hooks/useAuth';

const ResetPassword = () => {
    const { token } = useParams();
    const [loading, setLoading] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    // Verify token validity
    useEffect(() => {
        const verifyToken = async () => {
            try {
                // This would actually call the API in a real app
                // await authService.verifyResetToken(token);

                // For demo, we'll simulate a delay and then validate
                setTimeout(() => {
                    setTokenValid(true);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                setTokenValid(false);
                setErrorMessage('This password reset link is invalid or has expired.');
                setLoading(false);
            }
        };

        if (token) {
            verifyToken();
        } else {
            setTokenValid(false);
            setErrorMessage('No reset token provided.');
            setLoading(false);
        }
    }, [token]);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                // This would actually call the API in a real app
                // await resetPassword(token, values.password);

                setSuccessMessage('Password reset successful!');
                setErrorMessage('');

                // Redirect to login after a delay
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) {
                setErrorMessage(error.message || 'Failed to reset password. Please try again.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (loading) {
        return (
            <Container maxWidth="xs" sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!tokenValid) {
        return (
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {errorMessage}
                        </Alert>
                        <Button component={RouterLink} to="/forgot-password" variant="contained">
                            Request New Reset Link
                        </Button>
                    </Box>
                </Paper>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockResetIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>

                    {successMessage && (
                        <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
                            {successMessage}
                        </Alert>
                    )}

                    {errorMessage && (
                        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                            {errorMessage}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={formik.isSubmitting}
                        >
                            Reset Password
                        </Button>
                        <Link component={RouterLink} to="/login" variant="body2">
                            Back to login
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default ResetPassword;