const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.registerUser = async (req, res) => {
  const { name, username, mobileNumber, email, password, age } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email }, { username }, { mobileNumber }] });
    if (user) {
      return res.status(400).json({ message: 'User with provided details already exists' });
    }

    user = new User({
      name,
      username,
      mobileNumber,
      email,
      password,
      age,
    });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
