// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt
const cors = require('cors')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const fs = require('fs')



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

const cartSchema = new mongoose.Schema({
  product_id : String
})
const Cart = mongoose.model('Cart', cartSchema)

const productSchema = new mongoose.Schema({
  product_name: String,
  categorie: String,
  price: Number,
  description : String,
  sold_units : Number,
  images : Array,
  publisher : String
});

const Product = mongoose.model('Product', productSchema);

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  profile_picture: String,
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  Cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cart'}]
});

const User = mongoose.model('User', userSchema);




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('profilePicture'), async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    const decoded = jwt.verify(token, 'germany');
    const userId = decoded.userId;

    // Find the user by ID to retrieve the current profile picture filename
    const user = await User.findById(userId);

    // Check if there's an existing profile picture filename
    if (user.profile_picture) {
      // Construct the correct path to the old profile picture
      const oldProfilePicturePath = path.join(__dirname, 'uploads', user.profile_picture);

      // Delete the old profile picture from the correct path
      fs.unlinkSync(oldProfilePicturePath);
    }

    // Update the user's document with the new profile picture filename
    user.profile_picture = req.file.filename;
    await user.save();

    res.status(200).json({ message: 'Profile picture updated', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/user/profile-picture', async (req, res) => {
  try {
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'germany');
    const userId = decoded.userId;
   

    // Find the user by ID in your MongoDB database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's profile picture URL (adjust the field name as needed)
    return res.status(200).json({ profile_picture: user.profile_picture });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/addItemToCart', async (req, res) => {
  try {
    const id = req.body.id; // Get the product ID from the request body

    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'germany');
    const userId = decoded.userId;

    // Create a new Cart document with the product_id set to the received ID
    const newItem = new Cart({
      product_id: id
    });

    await newItem.save();

    const user = await User.findById(userId);
    user.Cart.push(newItem);
    await user.save();

    return res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

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
      profile_picture : '',
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

    const token = jwt.sign({ userId: user._id }, 'germany', { expiresIn: '24h' });

 

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
    const { product_name, categorie, price, description, images } = req.body.data;
    
        // Retrieve the user's ID from the JWT token in the request header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'germany');
        const userId = decoded.userId;

     // Find the user by their ID and push the product's ObjectId to their products array
     const user = await User.findById(userId);
     if (!user) {
       return res.status(404).json({ message: 'User not found' });
     }

    // Create a new product instance
    const newProduct = new Product({
      product_name,
      categorie,
      price,
      description,
      sold_units :0,
      images,
      publisher : userId
    });

    // Save the product to the database
    await newProduct.save()

  

   

    user.products.push(newProduct); // Assuming 'products' is the name of the array field in the user schema
    await user.save();

    return res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/getUserProducts', async (req, res) => {
  try {
    // Retrieve the user's ID from the JWT token in the request header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'germany');
    const userId = decoded.userId;

    // Find the user by their ID and populate their products
    const user = await User.findById(userId).populate('products');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's products as a response
    return res.status(200).json(user.products);
  } catch (error) {
    console.error('Error fetching user products:', error);
    return res.status(500).json({ message: 'Server error' });
  }
})

app.get('/api/:id', async (req, res) => {
  try {
    const product_id = req.params.id;
    // Find the user by their ID
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'germany');
    const userId = decoded.userId;

    const user = await User.findById(userId);
    const item = await Product.findById(product_id);

    // Combine user and item into a single JSON object
    const response = {
      user,
      item,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    // Handle errors and send an appropriate response
    return res.status(500).json({ error: 'Internal server error' });
  }
});



app.delete('/api/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Use the deleteOne method to remove the product
    const result = await Product.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user by their ID
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'germany');
    const userId = decoded.userId

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the index of the product to remove
    const productIndex = user.products.findIndex((product) => product.toString() === productId);

    // Remove the product from the array
    if (productIndex !== -1) {
      user.products.splice(productIndex, 1);
    }

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    console.error('Error removing product:', error);
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