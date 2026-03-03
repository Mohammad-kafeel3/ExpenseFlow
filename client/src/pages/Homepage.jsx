import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    Paper,
    MenuItem,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
} from "@mui/material";
import Layout from "./../components/Layout/Layout";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [frequency, setFrequency] = useState('7');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [selectedDate, setSelectedDate] = useState([]);
    const [formData, setFormData] = useState({
        amount: "",
        type: "",
        category: "",
        reference: "",
        description: "",
        date: "",
    });

    const addButtonRef = useRef();

    const handleOpen = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setTimeout(() => {
            addButtonRef.current?.focus(); // 👈 Return focus safely
        }, 0)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getAllTransactions = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            const res = await axios.post(
                "http://localhost:8080/api/v1/transactions/get-transaction",
                frequency === "custom"
                    ? {
                        userid: user._id,
                        frequency,
                        selectedDate: [startDate, endDate],
                    }
                    : {
                        userid: user._id,
                        frequency,
                    });
            setTransactions(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllTransactions();
    }, [frequency, startDate, endDate]);

    const handleSubmit = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user._id) {
                toast.error("User not found.");
                return;
            }
            setLoading(true);
            await axios.post(
                "http://localhost:8080/api/v1/transactions/add-transaction",
                { ...formData, userid: user._id }
            );
            toast.success("Transaction added successfully");
            setFormData({
                amount: "",
                type: "",
                category: "",
                reference: "",
                description: "",
                date: "",
            });
            handleClose();
            getAllTransactions(); // Refresh table
        } catch (error) {
            console.log(error);
            toast.error("Failed to add transaction");
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Container maxWidth="md">
                {/* Filters + Add Button */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        my: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box my={2}>
                        <Typography variant="h6" gutterBottom>
                            Select Frequency
                        </Typography>
                        <Select
                            fullWidth
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            variant="outlined"
                        >
                            <MenuItem value="7">Last 1 Week</MenuItem>
                            <MenuItem value="30">Last 1 Month</MenuItem>
                            <MenuItem value="365">Last 1 Year</MenuItem>
                            <MenuItem value="custom">Custom</MenuItem>
                        </Select>
                        {frequency === "custom" && (
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Box mt={2} display="flex" gap={2}>
                                    <DatePicker
                                        label="Start Date"
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                    <DatePicker
                                        label="End Date"
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </Box>
                            </LocalizationProvider>
                        )}
                    </Box>

                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        + Add New
                    </Button>
                </Paper>

                {/* Loader or Table */}
                {loading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : transactions.length === 0 ? (
                    <Paper
                        elevation={1}
                        sx={{
                            minHeight: "300px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "gray",
                            fontSize: "18px",
                        }}
                    >
                        No transactions found.
                    </Paper>
                ) : (
                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Date</strong></TableCell>
                                    <TableCell><strong>Amount</strong></TableCell>
                                    <TableCell><strong>Type</strong></TableCell>
                                    <TableCell><strong>Category</strong></TableCell>
                                    <TableCell><strong>Reference</strong></TableCell>
                                    <TableCell><strong>Description</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((txn, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{new Date(txn.date).toISOString().split('T')[0]}</TableCell>
                                        <TableCell>{txn.amount}</TableCell>
                                        <TableCell>{txn.type}</TableCell>
                                        <TableCell>{txn.category}</TableCell>
                                        <TableCell>{txn.reference}</TableCell>
                                        <TableCell>{txn.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {/* Add Transaction Modal */}
                <Dialog open={showModal} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>💰 Add Transaction</DialogTitle>
                    <DialogContent dividers>
                        <Box component="form" noValidate autoComplete="off">
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Amount"
                                type="number"
                                variant="outlined"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                autoFocus
                            />
                            <TextField
                                select
                                label="Type"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <MenuItem value="income">Income</MenuItem>
                                <MenuItem value="expense">Expense</MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="Category"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <MenuItem value="salary">Salary</MenuItem>
                                <MenuItem value="tip">Tip</MenuItem>
                                <MenuItem value="food">Food</MenuItem>
                                <MenuItem value="project">Project</MenuItem>
                                <MenuItem value="movies">Movies</MenuItem>
                                <MenuItem value="bills">Bills</MenuItem>
                                <MenuItem value="medical">Medical</MenuItem>
                                <MenuItem value="fees">Fees</MenuItem>
                            </TextField>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Reference"
                                variant="outlined"
                                name="reference"
                                value={formData.reference}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Description"
                                variant="outlined"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Date"
                                variant="outlined"
                                name="date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            ref={addButtonRef}
                            disabled={loading}

                        >
                            {loading ? "Adding..." : "Add"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Layout>
    );
};

export default HomePage;
