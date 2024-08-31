const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/hackera")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("home.html");
});
// Helper function for checking if user is authenticated
function checkAuth(req, res, next) {
  if (req.cookies.username) {
    next();
  } else {
    res.redirect("/login.html");
  }
}

// Routes

// Registration route
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, phone, address, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      age,
    });
    await user.save();

    res.redirect("/login.html");
  } catch (err) {
    res.status(500).send("Error registering new user.");
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.cookie("username", user.name, { httpOnly: true });
      res.redirect("/index.html");
    } else {
      res.send("Invalid email or password");
    }
  } catch (err) {
    res.status(500).send("Error logging in.");
  }
});

// Logout route
app.post("/api/logout", (req, res) => {
  res.clearCookie("username");
  res.send("Logged out");
});

// Route to get the logged-in user's data
app.get("/api/me", (req, res) => {
  if (req.cookies.username) {
    res.json({ name: req.cookies.username });
  } else {
    res.status(401).send("Not authenticated");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
