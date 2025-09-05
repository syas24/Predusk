
const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({ skill: String });
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Skill = mongoose.model("Skill", SkillSchema);
const Project = mongoose.model("Project", ProjectSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017/portfolioDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.log(err));

async function seedData() {
  try {
    await Skill.deleteMany();
    await Project.deleteMany();

    const skills = await Skill.insertMany([
      { skill: "React.js" },
      { skill: "Node.js" },
      { skill: "MongoDB" },
      { skill: "Express.js" },
      { skill: "Java" },
    ]);

    const projects = await Project.insertMany([
      { title: "Weather Dashboard", description: "A weather forecast app using OpenWeather API" },
      { title: "Portfolio Website", description: "Personal portfolio made with React & Node.js" },
      { title: "Inventory System", description: "Manage stock with CRUD functionality" },
    ]);

    console.log("Seeding successful!");
    console.log("Skills:", skills);
    console.log("Projects:", projects);

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seedData();
