const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const eventRoutes = require('./routes/events');

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

require('./config/passport')(passport);

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/events', eventRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/local-events-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Server listening on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
