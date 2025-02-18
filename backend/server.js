require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');

    const adminUser = await User.findOne({ email: 'admin@admin.com' });
    if (!adminUser) {
      const newUser = new User({
        email: 'admin@admin.com',
        password: 'admin',
      });

      await newUser.save();
      console.log('Admin user created');
    }
  })
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Home route
app.get('/health', async (_, res) => {
  res.send('<h1>TAMO ARRIBA</h1>').status(200);
});

// Home route
app.get('/', async (req, res) => {
  res.status(200).send(); // Important: Add .send() to actually send the response
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt for user: ${email}`); // Log the attempted login

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found: ${email}`); // Log if user not found
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = password === user.password;
    if (!isMatch) {
      console.log(`Invalid password for user: ${email}`); // Log invalid password
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log(`Login successful for user: ${email}`); // Log successful login
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(`Login error: ${err}`); // Use console.error for errors
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});