import React from 'react';
import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 4 } }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;