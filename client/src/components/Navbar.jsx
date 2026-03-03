import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // From context
        toast.success('Logout Successful');
        navigate('/login');
    };

    const linkStyle = {
        color: 'white',
        fontSize: '1rem',
        textDecoration: 'none',
    };

    return (
        <Box
            width="100%"
            p="1rem 6%"
            sx={{
                boxShadow: 3,
                mb: 2,
                background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.2)), linear-gradient(90deg, #4A90E2, #7B61FF)",
                color: "white",
                borderRadius: 3,
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight="bold">
                    ExpenseFlow
                </Typography>

                {user ? (
                    <Box display="flex" alignItems="center" gap={3}>
                        <Typography variant="body1">Hi, {user.name}</Typography>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Box display="flex" gap={3}>
                        <NavLink to="/register" style={linkStyle}>
                            Sign Up
                        </NavLink>
                        <NavLink to="/login" style={linkStyle}>
                            Login
                        </NavLink>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Navbar;
