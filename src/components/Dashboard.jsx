import { useState } from "react";
import GameCard from "./GameCard";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const [games, setGames] = useState([
    { id: 1, title: "Minecraft", genre: "Survival", hours: 120 },
    { id: 2, title: "Fortnite", genre: "Battle Royale", hours: 80 },
    { id: 3, title: "Roblox", genre: "Sandbox", hours: 200 },
    { id: 4, title: "Dead by Daylight", genre: "Horror", hours: 60 },
    { id: 5, title: "Madden", genre: "Sports", hours: 150 },
    { id: 6, title: "Terraria", genre: "Survival", hours: 600 },
    { id: 7, title: "Super Mario Galaxy", genre: "Adventure", hours: 100 },
    { id: 8, title: "Assassin's Creed IV", genre: "Adventure", hours: 200 },
  ]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [hours, setHours] = useState("");

  function addGame(e) {
    e.preventDefault();

    if (!title || !genre || !hours) return;

    const newGame = {
      id: Date.now(),
      title,
      genre,
      hours: Number(hours),
    };

    setGames([...games, newGame]);

    setTitle("");
    setGenre("");
    setHours("");
  }

  function deleteGame(id) {
    setGames(games.filter((g) => g.id !== id));
  }

  return (
    <div>
      <h2>Dashboard</h2>

      {/* ADD GAME FORM */}
      <form
        onSubmit={addGame}
        style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          placeholder="Hours"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <button type="submit">Add Game</button>
      </form>

      {/* SEARCH */}
      <input
        placeholder="Search games..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: "15px" }}
      />

      {/* GAME GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "15px",
        }}
      >
        {games
          .filter((game) =>
            game.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((game) => (
            <GameCard key={game.id} game={game} onDelete={deleteGame} />
          ))}
      </div>
    </div>
  );
}