import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format } from 'date-fns';

const GroupCard = ({ group, isMyGroup = false }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/groups/${group.id}`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'OPEN':
                return 'success';
            case 'FULL':
                return 'warning';
            case 'CLOSED':
                return 'error';
            default:
                return 'default';
        }
    };

    const getParticipantCountText = () => {
        const current = group.participant_count || 0;
        const max = group.max_participants || 0;
        return `${current}/${max} participants`;
    };

    const getProgressValue = () => {
        if (!group.max_participants) return 0;
        const current = group.participant_count || 0;
        return (current / group.max_participants) * 100;
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {group.name}
                </Typography>

                <Box sx={{ display: 'flex', mb: 2, gap: 1 }}>
                    <Chip
                        label={group.status}
                        size="small"
                        color={getStatusColor(group.status)}
                    />
                    {isMyGroup && (
                        <Chip
                            icon={<AccessTimeIcon />}
                            label="Joined"
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {getParticipantCountText()}
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={getProgressValue()}
                    sx={{ mt: 1, mb: 2 }}
                />

                <Typography variant="caption" color="text.secondary" display="block">
                    Created: {format(new Date(group.created_at), 'MMM d, yyyy')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleViewDetails}>
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default GroupCard;