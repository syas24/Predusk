const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/portfolioDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const SkillSchema = new mongoose.Schema({ skill: String });
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Skill = mongoose.model("Skill", SkillSchema);
const Project = mongoose.model("Project", ProjectSchema);


app.get("/skills", async (req, res) => {
  const skills = await Skill.find();
  res.json(skills.map((s) => s.skill));
});

app.post("/skills", async (req, res) => {
  const { skill } = req.body;
  if (!skill) return res.status(400).json({ error: "Skill required" });
  await new Skill({ skill }).save();
  const skills = await Skill.find();
  res.json({ skills: skills.map((s) => s.skill) });
});

app.get("/search", async (req, res) => {
  const q = req.query.q || "";
  const projects = await Project.find({ title: { $regex: q, $options: "i" } });
  res.json(projects);
});

app.post("/projects", async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
