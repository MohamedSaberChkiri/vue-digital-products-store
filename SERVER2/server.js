// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt
const cors = require('cors')
const session = require('express-session')
const jwt = require('jsonwebtoken')


// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware to parse incoming requests
app.use(cors({origin : 'http://localhost:8080',credentials: true,}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://digifyDB:1KjPBIiyc3NpWXZz@digifydb.ffzilst.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const productSchema = new mongoose.Schema({
  product_name: String,
  categorie: String,
  price: Number,
  description : String
});

const Product = mongoose.model('Product', productSchema);

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

const User = mongoose.model('User', userSchema);



app.post('/api/register', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      products : []
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.use(
  session({
    name: 'session',
    secret: 'germany',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    },
  })
);

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'germany', { expiresIn: '1h' });

 

    return res.status(200).json({ token, message: 'logged in' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});




app.get('/api/user', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (tokenBlacklist.has(token)) {
      return res.status(401).json({ message: 'Token is invalid' });
    }

    try {
      const decoded = jwt.verify(token, 'germany');
      const userId = decoded.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      return res.status(200).json(user);
    } catch (jwtError) {
      console.error(jwtError);
      return res.status(401).json({ message: 'JWT verification failed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/addproduct', async (req, res) => {
  try {
    const { product_name, categorie, price, description } = req.body.data;
   
        // Retrieve the user's ID from the JWT token in the request header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'germany');
        const userId = decoded.userId;
    

    // Create a new product instance
    const newProduct = new Product({
      product_name,
      categorie,
      price,
      description,
    });

    // Save the product to the database
    await newProduct.save()

  

    // Find the user by their ID and push the product's ObjectId to their products array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.products.push(newProduct); // Assuming 'products' is the name of the array field in the user schema
    await user.save();

    return res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


const tokenBlacklist = new Set();

app.post('/api/logout', (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      tokenBlacklist.add(token); // Add the token to the blacklist
    }
    // ... Perform any other necessary logout operations
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});