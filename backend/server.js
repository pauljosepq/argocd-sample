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
app.get('/health', async (req, res) => {
  res.send('<h1>TAMO ARRIBA</h1>').status(200);
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = password === user.password;
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
