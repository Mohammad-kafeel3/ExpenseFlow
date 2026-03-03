import React, { useState, useEffect } from 'react';
import {
    Box,
    useMediaQuery,
    TextField,
    Button,
    Typography,
    Collapse,
    Alert,
} from '@mui/material';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext'; // Import AuthContext

const Register = () => {
    const navigate = useNavigate();
    const isNotMobile = useMediaQuery('(min-width: 1000px)');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useAuth(); // Destructure login from context

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/auth/register', {
                username,
                email,
                password,
            });

            if (data.token && data.user) {
                login({ ...data.user, token: data.token }); //  Save to context
                toast.success('Registration Successful');
                navigate('/');
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (err) {
            console.log(err.response?.data || err.message);
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else if (err.response?.data?.msg) {
                setError(err.response.data.msg);
            } else if (err.message) {
                setError(err.message);
            }
            setTimeout(() => setError(''), 5000);
        }
    };

    //  Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={isNotMobile ? '40%' : '80%'}
            p="2rem"
            m="2rem auto"
            textAlign="center"
            sx={{ boxShadow: 3, bgcolor: 'white', color: 'black', borderRadius: 2 }}
        >
            <Collapse in={error}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            </Collapse>
            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                <Typography
                    variant="h3"
                    gutterBottom
                    bgcolor={'lightyellow'}
                    fontFamily={'times new roman'}
                >
                    Sign Up
                </Typography>

                <TextField
                    label="Username"
                    required
                    margin="normal"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    label="Email"
                    type="email"
                    required
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    type="password"
                    required
                    margin="normal"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 2 }}>
                    Sign Up
                </Button>

                <Typography mt={2}>
                    Already have an account? <Link to="/login">Login</Link>
                </Typography>
            </form>
        </Box>
    );
};

export default Register;
