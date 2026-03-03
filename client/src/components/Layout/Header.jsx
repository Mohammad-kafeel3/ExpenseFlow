import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Snackbar,
    Alert,
} from "@mui/material";

const Header = () => {
    const [loginUser, setLoginUser] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        console.log("Raw user from localStorage:", userData);
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setLoginUser(user);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("user");
        setSnackbarOpen(true); // Trigger Snackbar
        navigate("/login");
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
                    >
                        Expense Management
                    </Typography>

                    {loginUser && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Typography variant="body1">{loginUser.name}</Typography>
                            <Button variant="contained" color="primary" onClick={logoutHandler}>
                                Logout
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
                    Logout Successfully
                </Alert>
            </Snackbar>

        </>
    );
};

export default Header;
