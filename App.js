import React from "react";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Search from "./components/Search";

function App() {
  return (
    <div>
      <h1>My Portfolio Dashboard</h1>
      <Profile />
      <Projects />
      <Skills />
      <Search />
    </div>
  );
}

export default App;
