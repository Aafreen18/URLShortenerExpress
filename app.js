import express from "express";
import shortenerRoutes from "./router/shortenerRoutes.js";

// Create Express app
const app = express();

// Server port
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.set("view engine", "ejs");

// Routes
app.use("/", shortenerRoutes);

/* -------------------- SERVER -------------------- */
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port: http://localhost:${port}/`);
});
