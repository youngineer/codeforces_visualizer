const express = require("express");
const mongoose = require("mongoose");
const { connectDb } = require("./config/database");
const { userRouter } = require("./routes/userRouter");
const app = express();


app.use(express.json());

connectDb()
    .then(() => {
        app.listen(7777, () => {
            console.log("Server connected successfully on port 7777");
        })
    })
    .catch(err => console.error(`${err} occured`));

// app.listen(7777, () => {
//             console.log("Server connected successfully on port 7777");
//         })
app.use("/", userRouter);



