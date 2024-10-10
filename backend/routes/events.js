const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Make sure this is the correct path to your Event model

// POST route to add multiple events
router.post('/add-multiple', async (req, res) => {
    const events = [
        {
            name: "Web Development Workshop",
            date: "2024-10-20T10:00:00Z",
            location: "Room 101",
            description: "A workshop on web development for beginners."
        },
        {
            name: "AI & Machine Learning Seminar",
            date: "2024-10-25T14:00:00Z",
            location: "Auditorium",
            description: "An insightful seminar on AI and machine learning."
        }
    ];

    try {
        const result = await Event.insertMany(events); // Insert multiple documents
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add events', error });
    }
});

module.exports = router;
