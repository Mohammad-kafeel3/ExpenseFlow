const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Error Middleware Caught:", err);

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

module.exports = errorMiddleware;
