const express = require('express');
const bcrypt = require('bcrypt');
const { getCollection } = require('./config'); // Import getCollection method

const app = express();

// Convert data into JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/confirmation", (req, res) => {
    const message = req.query.message || "No message";
    res.render("confirmation", { message });
});

app.get("/confirmation_error", (req, res) => {
    const message = req.query.message || "No message";
    res.render("confirmation_error", { message });
});

// Register User
app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const data = {
            name: username,
            password: hashedPassword // Store the hashed password
        };
    
        const collection = getCollection(); // Get the collection
        if (!collection) {
            throw new Error('Collection is not available');
        }
    
        // Check if the user already exists
        const existingUser = await collection.findOne({ name: data.name });
    
        if (existingUser) {
            res.redirect('/confirmation_error?message=User%20already%20exists%2C%20please%20choose%20a%20different%20username');
        } else {
            // Insert the user into the database
            await collection.insertOne(data);
    
            console.log('User registered:', data);
            res.redirect('/confirmation?message=User%20registered%20successfully');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const collection = getCollection(); // Get the collection
        if (!collection) {
            throw new Error('Collection is not available');
        }

        // Check if the user exists
        const check = await collection.findOne({ name: username });
        if (!check) {
            return res.send("Username cannot be found");
        }

        // Compare the hashed password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(password, check.password);
        if (isPasswordMatch) {
            res.render('home'); // Redirect or render home page upon successful login
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.send("Error logging in");
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
