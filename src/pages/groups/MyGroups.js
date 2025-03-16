import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import GroupsIcon from '@mui/icons-material/Groups';
import useGroupsStore from '../../store/groupsStore';
import GroupList from '../../components/groups/GroupList';

const MyGroups = () => {
    const {
        myGroups,
        loading,
        error,
        fetchMyGroups
    } = useGroupsStore();

    useEffect(() => {
        fetchMyGroups();
    }, [fetchMyGroups]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GroupsIcon fontSize="large" /> My Groups
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={fetchMyGroups}
                    disabled={loading}
                >
                    Refresh
                </Button>
            </Box>

            <GroupList
                groups={myGroups}
                loading={loading}
                error={error}
                isMyGroups={true}
            />
        </Container>
    );
};

export default MyGroups;