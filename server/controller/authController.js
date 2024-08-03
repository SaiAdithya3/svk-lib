import jwt from 'jsonwebtoken';
import Admin from '../schemas/adminSchema.js';
import Student from '../schemas/studentSchema.js'; // Assuming you have a student schema

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log('Admin login request body:', req.body); // Ensure it logs { email: 'admin@gmail.com', password: 'admin' }

  try {
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid input format' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (password !== admin.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const studentLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log('Student login request body:', req.body); // Ensure it logs { email: 'student@gmail.com', password: 'student' }

  try {
   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const validateAdminToken = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect 'Bearer <token>'
  console.log('Token:', token); // Log token to check if Authorization header is present

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', decoded);
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // give an response if the token is valid

    res.status(200).json({ message: 'Token is valid', admin });


  } catch (err) {
    console.error('Token validation error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

