import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    pt: 8,
                    pb: 6,
                    textAlign: 'center',
                }}
            >
                <Typography
                    component="h1"
                    variant="h2"
                    color="text.primary"
                    gutterBottom
                >
                    Welcome to Game Platform
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Join exciting games, collaborate with teams, and track your progress.
                </Typography>
                <Box
                    sx={{
                        mt: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    {isAuthenticated ? (
                        <>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/games')}
                            >
                                Browse Games
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/my-groups')}
                            >
                                My Groups
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/register')}
                            >
                                Sign Up
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/login')}
                            >
                                Log In
                            </Button>
                        </>
                    )}
                </Box>
            </Box>

            <Grid container spacing={4} sx={{ mb: 8 }}>
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h5" component="h2" gutterBottom>
                            Join Games
                        </Typography>
                        <Typography>
                            Browse through a variety of available games and join the ones that interest you.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h5" component="h2" gutterBottom>
                            Form Groups
                        </Typography>
                        <Typography>
                            Participate in team-based games by joining existing groups or forming new ones.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h5" component="h2" gutterBottom>
                            Track Progress
                        </Typography>
                        <Typography>
                            Monitor your participation and progress across different games and groups.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;