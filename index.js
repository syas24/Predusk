const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/meapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Example model
const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: String,
  skills: [String],
  projects: [
    { title: String, description: String, links: [String] }
  ],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  }
});

const Profile = mongoose.model("Profile", ProfileSchema);

// Routes
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Create profile
app.post("/profile", async (req, res) => {
  const profile = new Profile(req.body);
  await profile.save();
  res.json(profile);
});

// Get profile
app.get("/profile", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
