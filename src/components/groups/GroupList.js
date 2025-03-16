import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import GroupCard from './GroupCard';

const GroupList = ({ groups, loading, error, isMyGroups = false }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ my: 2 }}>
                {error}
            </Alert>
        );
    }

    if (!groups || groups.length === 0) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1">
                    {isMyGroups
                        ? "You haven't joined any groups yet."
                        : "No groups available."}
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {groups.map((group) => (
                <Grid item key={group.id} xs={12} sm={6} md={4}>
                    <GroupCard group={group} isMyGroup={isMyGroups} />
                </Grid>
            ))}
        </Grid>
    );
};

export default GroupList;