import React, { useState } from "react";
import { searchProjects } from "../api";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const data = await searchProjects(query);
    setResults(data);
  };

  return (
    <div>
      <h2>Search Projects</h2>
      <input
        type="text"
        value={query}
        placeholder="Search by project name"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((proj) => (
          <li key={proj._id}>
            <strong>{proj.title}</strong>: {proj.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
