const express = require('express');
const mongoose = require('mongoose');
const app = new express()
const cors = require("cors");
const path = require('path');
import { fileURLToPath } from 'url';

const router = require("./src/routes/api")


const uri = "mongodb+srv://ia64744:G8iuToQOAe7t0eQx@cluster0.sz7fq.mongodb.net/ReactCpanelDB"
const option = {
    user: "",
    pass: "",
    autoIndex: true
}

mongoose
    .connect(uri, option)
    .then((res)=>{
        console.log("Database Connected Successfully");
    })
    .catch(error => console.log(error))

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend URL
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
        credentials: true, // Allow cookies (if needed)
    })
);

app.use("/api/v1", router)

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get('/', (req, res) => {
    res.send('Hello World!')
  })


// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
  
module.exports = app;