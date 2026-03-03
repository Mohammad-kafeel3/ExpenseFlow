import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Spinner = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="60vh"
        >
            <CircularProgress />
        </Box>
    );
};

export default Spinner;
