import express from "express";

import Item from "../../models/Item.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route  GET api/items
// @desc   Get all items
// @access Public
router.get("/", auth, (req, res) => {
  Item.find({ addedBy: req.user.id })
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route  POST api/items
// @desc   Create an item
// @access Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    addedBy: req.user.id,
  });
  newItem.save().then((item) => res.json(item));
});

// @route  PUT api/items/:id
// @desc   Update an item
// @access Private
router.put("/:id", auth, (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route  DELETE api/items/:id
// @desc   Delete an item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

export default router;
