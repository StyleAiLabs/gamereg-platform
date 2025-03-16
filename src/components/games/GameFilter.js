import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Paper from '@mui/material/Paper';

const GameFilter = ({ filter, onFilterChange, onClearFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ [name]: value });
    };

    return (
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <TextField
                    select
                    label="Game Type"
                    name="type"
                    value={filter.type}
                    onChange={handleChange}
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="ALL">All Types</MenuItem>
                    <MenuItem value="INDIVIDUAL">Individual</MenuItem>
                    <MenuItem value="GROUP">Group</MenuItem>
                </TextField>

                <TextField
                    select
                    label="Status"
                    name="status"
                    value={filter.status}
                    onChange={handleChange}
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="ALL">All Statuses</MenuItem>
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="INACTIVE">Inactive</MenuItem>
                    <MenuItem value="COMPLETED">Completed</MenuItem>
                    <MenuItem value="ARCHIVED">Archived</MenuItem>
                </TextField>

                <TextField
                    label="Search Games"
                    name="searchTerm"
                    value={filter.searchTerm}
                    onChange={handleChange}
                    placeholder="Search by name..."
                    sx={{ flexGrow: 1 }}
                />

                <Button
                    variant="contained"
                    startIcon={<FilterListIcon />}
                    onClick={() => { }}
                    disabled={true}
                    sx={{ minWidth: 100 }}
                >
                    Filter
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    onClick={onClearFilters}
                    sx={{ minWidth: 100 }}
                >
                    Clear
                </Button>
            </Box>
        </Paper>
    );
};

export default GameFilter;