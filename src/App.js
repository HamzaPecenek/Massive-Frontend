import React from "react";
import CharacterTable from "./CharacterTable";

function App() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "2rem",
          color: "#2c3e50",
        }}
      >
        Rick and Morty Explorer
      </h1>
      <CharacterTable />
    </div>
  );
}

export default App;
