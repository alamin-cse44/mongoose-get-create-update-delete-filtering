const mongoose = require("mongoose");
// const dotenv = require('dotenv').config();
const colors = require("colors");

const app = require("./app");

// database  connection
mongoose.connect('mongodb://127.0.0.1:27017/acc-inventory').then( () => {
    console.log(`Database connection is successful`.red.bold);
})

// server 
const port = process.env.PORT || 8080;  

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
}) 


// const express = require("express");
// const app = express();
// const cors = require("cors");
// // const dotenv = require('dotenv').config();
// const mongoose = require("mongoose");
// const colors = require("colors");

// // middlewares
// app.use(cors());
// app.use(express.json());

// // const port = 5000;
// // database  connection
// mongoose.connect('mongodb://127.0.0.1:27017/inventory-system').then( () => {
//     console.log("Database connection is successful");
// })

// // server 
// const port = process.env.PORT || 8080;  

// app.get("/", (req, res) => {
//     res.send("Server is running");
// })

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`.yellow.bold);
// });