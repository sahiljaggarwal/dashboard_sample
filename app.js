import express from "express";
import morgan from "morgan"
import connectDB from "./db/connect.js"
import startServer from "./server/server.js";


// Express App 
const app = express();

// Middlewares
app.use(morgan("combined"))
app.use(express.json()) 


// Routes 

// Database Connections
connectDB()


// 404 page not found
app.use((req, res, next)=>{
    return res.status(404).send("Page not found ")
})

// Error middleware
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  });

// Server Connection
startServer(app)
