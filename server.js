import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import items from "./routes/api/items.js";
import users from "./routes/api/users.js";
import auth from "./routes/api/auth.js";

dotenv.config();

const app = express();

// Bodyparser middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Serve static assets if we are in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port:${port}`));
