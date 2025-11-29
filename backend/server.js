const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Models
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' } // 'admin' for admin
});
const User = mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: Number,
  amount: Number,
  status: { type: String, default: 'Pending' },
  address: String,
  stripeSessionId: String
});
const Order = mongoose.model('Order', orderSchema);

// Middleware Auth
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
};

// Routes
app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, role: role || 'user' });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { email, role } });
  } catch (err) {
    res.status(400).json({ error: 'User exists' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { email, role: user.role } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/products', (req, res) => {
  res.json([{
    id: 1,
    name: { en: 'Tech AI Prompt Bundle', id: 'Bundle Prompt AI Teknologi' },
    description: { en: '50+ prompts for AI tools like Grok. Instant download.', id: '50+ prompt untuk tools AI seperti Grok. Download instan.' },
    price: 19999, // cents
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400' // Dummy Unsplash
  }]);
});

app.post('/api/create-checkout-session', auth, async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: { currency: 'usd', product_data: { name: 'AI Prompt Bundle' }, unit_amount: 19999 }, quantity: 1 }],
    mode: 'payment',
    success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:5173/cancel',
    metadata: { userId: req.user.id }
  });
  res.json({ url: session.url });
});

app.post('/api/orders', auth, async (req, res) => {
  const { address, stripeSessionId } = req.body;
  const order = new Order({ userId: req.user.id, productId: 1, amount: 19999, address, stripeSessionId });
  await order.save();
  res.json({ id: order._id, status: 'Pending' });
});

app.get('/api/admin/orders', auth, adminAuth, async (req, res) => {
  const orders = await Order.find().populate('userId', 'email');
  res.json(orders);
});

app.listen(5000, () => console.log('Server on http://localhost:5000'));