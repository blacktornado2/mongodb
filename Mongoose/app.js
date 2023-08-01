require("dotenv").config();
const express = require("express");

const connectDB = require("./config/connectDB");
const userRouter = require("./routes/user.routes");

const app = express();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB(DB_URL);

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
