// also,one thing to note, is when I actually coded this, i was nlearning week2 and week3 stuff simultaneosly



const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 6000;

app.use(express.json());

// making an array because not using mongoDb and instead made this for the basic case, look for the next filess , where it will use mongoDB
const users = [];
const JWT_SECRET = 'hvbuiqcnomercn2834o2ie9484-0i4ro-4u9'; 

// Route for registeration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 8);
  users.push({ username, password: hashed });
  res.json({ message: 'User registered!' });
});

// route for login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid username' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid password' });
  // generating JWT
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// Middleware: Authenticate JWT, okay, one thing more you have to manually copy/paste the token gnerated in the authentication header, for the protected route to work properly
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token provided' });
  const token = auth.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Protected route
app.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}` });
});


app.listen(port, () => {
  console.log('Server running on port', port);
});



