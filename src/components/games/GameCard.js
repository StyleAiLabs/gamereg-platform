import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';

const GameCard = ({ game }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/games/${game.id}`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE':
                return 'success';
            case 'INACTIVE':
                return 'default';
            case 'COMPLETED':
                return 'primary';
            case 'ARCHIVED':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {game.name}
                </Typography>

                <Box sx={{ display: 'flex', mb: 2, gap: 1 }}>
                    <Chip
                        icon={game.type === 'GROUP' ? <PeopleIcon /> : <PersonIcon />}
                        label={game.type === 'GROUP' ? 'Group Game' : 'Individual Game'}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                    <Chip
                        label={game.status}
                        size="small"
                        color={getStatusColor(game.status)}
                    />
                </Box>

                <Typography variant="body2" color="text.secondary">
                    {game.type === 'GROUP' ? (
                        <>
                            Max groups: {game.max_groups} <br />
                            Participants per group: {game.participants_per_group}
                        </>
                    ) : (
                        <>Max participants: {game.max_participants}</>
                    )}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleViewDetails}>View Details</Button>
            </CardActions>
        </Card>
    );
};

export default GameCard;