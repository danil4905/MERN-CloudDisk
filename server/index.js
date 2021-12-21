const express = require("express");
const mongoose = require("mongoose");
const config = require("config");


const app = express()
const PORT = config.get("serverPORT");
const 

const start = async () => {
    try {
       await mongoose.connect(config.get("dbUrl"));

        app.listen(PORT,() => {
            console.log('Server started on port: ',PORT)
        })
    } catch (error) { 
        console.log(error)
    }
}
start()