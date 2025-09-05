import React, { useEffect, useState } from "react";
import { getSkills, addSkill } from "../api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    const updated = await addSkill(newSkill);
    setSkills(updated.skills);
    setNewSkill("");
  };

  return (
    <div>
      <h2>Skills</h2>
      <ul>
        {skills.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ul>

      <input
        type="text"
        value={newSkill}
        placeholder="Add a new skill"
        onChange={(e) => setNewSkill(e.target.value)}
      />
      <button onClick={handleAddSkill}>Add Skill</button>
    </div>
  );
}

export default Skills;
