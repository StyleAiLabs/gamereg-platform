import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // Profile form
    const profileFormik = useFormik({
        initialValues: {
            firstName: user?.first_name || '',
            lastName: user?.last_name || '',
            email: user?.email || '',
            mobile: user?.mobile || '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            mobile: Yup.string().matches(/^[0-9]{10}$/, 'Must be a valid 10-digit number').required('Required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                // Mock update for now - replace with actual API call
                // await authService.updateProfile(values);
                console.log('Profile updated:', values);
                setUpdateSuccess(true);
                setUpdateError('');
                setTimeout(() => setUpdateSuccess(false), 3000);
            } catch (error) {
                setUpdateError(error.message || 'Failed to update profile');
            } finally {
                setSubmitting(false);
            }
        },
    });

    // Password change form
    const passwordFormik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required('Required'),
            newPassword: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword')], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                // Mock update for now - replace with actual API call
                // await authService.changePassword(values);
                console.log('Password changed:', values);
                setPasswordSuccess(true);
                setPasswordError('');
                resetForm();
                setTimeout(() => setPasswordSuccess(false), 3000);
            } catch (error) {
                setPasswordError(error.message || 'Failed to change password');
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                My Profile
            </Typography>

            {/* Profile Information Section */}
            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Profile Information
                </Typography>

                {updateSuccess && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Profile updated successfully!
                    </Alert>
                )}

                {updateError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {updateError}
                    </Alert>
                )}

                <Box component="form" onSubmit={profileFormik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={profileFormik.values.firstName}
                                onChange={profileFormik.handleChange}
                                onBlur={profileFormik.handleBlur}
                                error={profileFormik.touched.firstName && Boolean(profileFormik.errors.firstName)}
                                helperText={profileFormik.touched.firstName && profileFormik.errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={profileFormik.values.lastName}
                                onChange={profileFormik.handleChange}
                                onBlur={profileFormik.handleBlur}
                                error={profileFormik.touched.lastName && Boolean(profileFormik.errors.lastName)}
                                helperText={profileFormik.touched.lastName && profileFormik.errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Address"
                                value={profileFormik.values.email}
                                onChange={profileFormik.handleChange}
                                onBlur={profileFormik.handleBlur}
                                error={profileFormik.touched.email && Boolean(profileFormik.errors.email)}
                                helperText={profileFormik.touched.email && profileFormik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="mobile"
                                name="mobile"
                                label="Mobile Number"
                                value={profileFormik.values.mobile}
                                onChange={profileFormik.handleChange}
                                onBlur={profileFormik.handleBlur}
                                error={profileFormik.touched.mobile && Boolean(profileFormik.errors.mobile)}
                                helperText={profileFormik.touched.mobile && profileFormik.errors.mobile}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={profileFormik.isSubmitting}
                            >
                                Update Profile
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {/* Change Password Section */}
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Change Password
                </Typography>

                {passwordSuccess && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Password changed successfully!
                    </Alert>
                )}

                {passwordError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {passwordError}
                    </Alert>
                )}

                <Box component="form" onSubmit={passwordFormik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="currentPassword"
                                name="currentPassword"
                                label="Current Password"
                                type="password"
                                value={passwordFormik.values.currentPassword}
                                onChange={passwordFormik.handleChange}
                                onBlur={passwordFormik.handleBlur}
                                error={passwordFormik.touched.currentPassword && Boolean(passwordFormik.errors.currentPassword)}
                                helperText={passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="newPassword"
                                name="newPassword"
                                label="New Password"
                                type="password"
                                value={passwordFormik.values.newPassword}
                                onChange={passwordFormik.handleChange}
                                onBlur={passwordFormik.handleBlur}
                                error={passwordFormik.touched.newPassword && Boolean(passwordFormik.errors.newPassword)}
                                helperText={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm New Password"
                                type="password"
                                value={passwordFormik.values.confirmPassword}
                                onChange={passwordFormik.handleChange}
                                onBlur={passwordFormik.handleBlur}
                                error={passwordFormik.touched.confirmPassword && Boolean(passwordFormik.errors.confirmPassword)}
                                helperText={passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={passwordFormik.isSubmitting}
                            >
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile;