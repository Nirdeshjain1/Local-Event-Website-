const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Admin Route to create events
router.post('/create', (req, res) => {
  const newEvent = new Event({
    name: req.body.name,
    date: req.body.date,
    location: req.body.location,
    school: req.body.school,
    description: req.body.description,
  });

  newEvent.save().then(event => res.json(event)).catch(err => res.status(400).json(err));
});

module.exports = router;
