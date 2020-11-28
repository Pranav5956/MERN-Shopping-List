import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

import User from "../../models/User.js";

const router = express.Router();

// @route  POST api/users
// @desc   Register a user
// @access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password)
    return res.status(400).send({ msg: "Please enter all fields." });

  // Check for existing user
  User.findOne({ email })
    .then((user) => {
      if (user) return res.status(400).send({ msg: "User already exists." });

      const newUser = new User({ name, email, password });

      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => {
          newUser.password = hash;
          return newUser.save();
        })
        .then((savedUser) => {
          jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1h",
            },
            (err, token) => {
              if (err) return res.status(500).json({ error: err.message });

              res.json({
                token,
                user: {
                  id: savedUser._id,
                  name: savedUser.name,
                  email: savedUser.email,
                },
              });
            }
          );
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

export default router;
