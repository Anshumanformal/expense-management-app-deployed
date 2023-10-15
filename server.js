"use strict"

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()
const colors = require("colors")
const userRoutes = require("./routes/userRoutes")
const transactionRoutes = require("./routes/transactionRoutes")
const path = require("path")

// Connect to the database
require("./config/mongodb_connection").connectMongoDB()

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use(cors())

// Static files
app.use(express.static(path.join(__dirname, './client/build')))
app.get("*", function (req, res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

// user routes
app.use("/api/v1/users", userRoutes)
// transaction routes
app.use("/api/v1/transactions", transactionRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`.bgWhite)
})