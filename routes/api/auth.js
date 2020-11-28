import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

import User from "../../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route  POST api/auth
// @desc   Authenticate a user
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password)
    return res.status(400).send({ msg: "Please enter all fields." });

  // Check for existing user
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(400).send({ msg: "User does not exist." });

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials." });

          jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1h",
            },
            (err, token) => {
              if (err) return res.status(500).json({ error: err.message });

              res.json({
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

export default router;
