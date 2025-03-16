import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useAuth } from '../../hooks/useAuth';

const VerifyEmail = () => {
    const { token } = useParams();
    const [verifying, setVerifying] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const { verifyEmail } = useAuth();

    useEffect(() => {
        const verify = async () => {
            if (!token) {
                setVerifying(false);
                setSuccess(false);
                setError('No verification token provided.');
                return;
            }

            try {
                // This would actually call the API in a real app
                // await verifyEmail(token);

                // For demo, we'll simulate verification
                setTimeout(() => {
                    setVerifying(false);
                    setSuccess(true);
                }, 1500);
            } catch (err) {
                setVerifying(false);
                setSuccess(false);
                setError(err.message || 'Email verification failed. The link may be invalid or expired.');
            }
        };

        verify();
    }, [token, verifyEmail]);

    if (verifying) {
        return (
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Verifying Your Email
                        </Typography>
                        <CircularProgress sx={{ my: 4 }} />
                        <Typography variant="body1">
                            Please wait while we verify your email address...
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        );
    }

    if (success) {
        return (
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h5" component="h1" gutterBottom>
                            Email Verified Successfully!
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', mb: 3 }}>
                            Thank you for verifying your email address. Your account is now fully activated.
                        </Typography>
                        <Button
                            component={RouterLink}
                            to="/login"
                            variant="contained"
                            size="large"
                        >
                            Continue to Login
                        </Button>
                    </Box>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h5" component="h1" gutterBottom>
                        Verification Failed
                    </Typography>
                    <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
                        {error}
                    </Alert>
                    <Typography variant="body1" sx={{ textAlign: 'center', mb: 3 }}>
                        If you need a new verification link, please login and request a new link from your profile settings.
                    </Typography>
                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="contained"
                        size="large"
                    >
                        Go to Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default VerifyEmail;