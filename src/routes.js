import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Common Components
import PrivateRoute from './components/common/PrivateRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// Public Pages
import Home from './pages/Home';

// Private Pages
import Games from './pages/games/Games';
import GameDetails from './pages/games/GameDetails';
import MyGames from './pages/games/MyGames';
import Groups from './pages/groups/Groups';
import GroupDetails from './pages/groups/GroupDetails';
import MyGroups from './pages/groups/MyGroups';
// import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/games" element={<Games />} />
                <Route path="/games/:id" element={<GameDetails />} />
                <Route path="/my-games" element={<MyGames />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/groups/:id" element={<GroupDetails />} />
                <Route path="/my-groups" element={<MyGroups />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="/notifications" element={<Notifications />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;