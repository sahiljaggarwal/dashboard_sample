const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./db/connect.js");
const startServer = require("./server/server.js");
const routes = require("./routes/index.js");
const swaggerSpec = require("./swagger.js");
const swaggerUi = require("swagger-ui-express");

// Express App
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
// app.use('/uploads', express.static('uploads'));
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Enable CORS for specific origins
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

// Routes
app.use("/api/v1", routes);

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database Connections
connectDB();

// 404 page not found
app.use((req, res, next) => {
  return res.status(404).send("Page not found ");
});

// Error middleware
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
});

// Server Connection
startServer(app);
