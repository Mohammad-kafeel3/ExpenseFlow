const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const errorMiddleware = require("./middlewares/errorMiddleware");

//dotenv
dotenv.config()

//mongo connection
connectDB();

//rest object
const app = express()

//middleware
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("dev"))
app.use("/api/v1/auth", authRoutes);
app.use(errorMiddleware);
app.use('/api/v1/transactions', require('./routes/transactionRoutes'))
//app.use("/api/v1/openai", require("./routes/openaiRoutes"));
//app.use("/api/v1/users", require("./routes/userRoute"));


const PORT = 8080
app.listen(8080, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white)
});