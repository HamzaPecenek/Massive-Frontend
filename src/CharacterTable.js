import React, { useEffect, useState } from "react";

function CharacterTable() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [error, setError] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `https://rickandmortyapi.com/api/character?page=${page}`;
      if (nameFilter) url += `&name=${nameFilter}`;
      if (statusFilter) url += `&status=${statusFilter}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("API error or no matching data.");

      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
    } catch (err) {
      setCharacters([]);
      setTotalPages(1);
      setError("No characters found or API error.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page, nameFilter, statusFilter]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleNameChange = (e) => {
    setPage(1);
    setNameFilter(e.target.value);
  };

  const handleStatusChange = (e) => {
    setPage(1);
    setStatusFilter(e.target.value);
  };

  const handleRowClick = (character) => {
    setSelectedCharacter(character);
  };

  const isDark = darkMode;
  const bgColor = isDark ? "#121212" : "#f9f9f9";
  const textColor = isDark ? "#eee" : "#222";
  const cardColor = isDark ? "#1e1e1e" : "#fff";

  return (
    <div style={{ background: bgColor, color: textColor, padding: "1rem", borderRadius: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2>Rick and Morty Characters</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            background: isDark ? "#555" : "#ddd",
            color: isDark ? "#fff" : "#333",
            border: "none",
          }}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={nameFilter}
          onChange={handleNameChange}
          style={{ padding: "8px", marginRight: "1rem", borderRadius: "6px" }}
        />
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="">All Statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {loading && (
  <p style={{ textAlign: "center", margin: "2rem 0", fontStyle: "italic" }}>
    Loading characters...
  </p>
)}


      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && characters.length > 0 && (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
              background: cardColor,
              color: textColor,
            }}
          >
            <thead>
              <tr style={{ background: isDark ? "#333" : "#ddd" }}>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Status</th>
                <th style={{ padding: "10px" }}>Species</th>
                <th style={{ padding: "10px" }}>Gender</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((char) => (
                <tr
                  key={char.id}
                  onClick={() => handleRowClick(char)}
                  style={{ cursor: "pointer", textAlign: "center", borderBottom: "1px solid #ccc" }}
                >
                  <td>{char.name}</td>
                  <td>
                    <span
                      style={{
                        color:
                          char.status === "Alive"
                            ? "green"
                            : char.status === "Dead"
                            ? "red"
                            : "gray",
                        fontWeight: "bold",
                      }}
                    >
                      {char.status}
                    </span>
                  </td>
                  <td>{char.species}</td>
                  <td>{char.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <button onClick={handlePrev} disabled={page === 1} style={{ marginRight: "1rem" }}>
              ⬅ Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={page === totalPages} style={{ marginLeft: "1rem" }}>
              Next ➡
            </button>
          </div>
        </>
      )}

      {selectedCharacter && (
        <div
          style={{
            marginTop: "2rem",
            paddingTop: "1rem",
            borderTop: "2px solid #999",
            background: cardColor,
            padding: "1rem",
            borderRadius: "10px",
          }}
        >
          <h3>Character Details</h3>
          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            style={{ width: 150, borderRadius: "10px" }}
          />
          <p>
            <strong>Name:</strong> {selectedCharacter.name}
          </p>
          <p>
            <strong>Status:</strong> {selectedCharacter.status}
          </p>
          <p>
            <strong>Species:</strong> {selectedCharacter.species}
          </p>
          <p>
            <strong>Gender:</strong> {selectedCharacter.gender}
          </p>
          <p>
            <strong>Origin:</strong> {selectedCharacter.origin.name}
          </p>
          <p>
            <strong>Location:</strong> {selectedCharacter.location.name}
          </p>
        </div>
      )}
    </div>
  );
}

export default CharacterTable;
