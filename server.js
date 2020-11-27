import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import items from "./routes/api/items.js";

dotenv.config();

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.REACT_APP_MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port:${port}`));
