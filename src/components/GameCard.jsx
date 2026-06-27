export default function GameCard({ game, onDelete }) {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #4f46e5",
        padding: "12px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(124, 58, 237, 0.3)",
        color: "white",
      }}
    >
      <h3 style={{ color: "#a78bfa" }}>{game.title}</h3>

      <p style={{ color: "#e5e7eb" }}>
        Genre: <span style={{ color: "#c4b5fd" }}>{game.genre}</span>
      </p>

      <p style={{ color: "#e5e7eb" }}>
        Hours: <span style={{ color: "#c4b5fd" }}>{game.hours}</span>
      </p>

      <button onClick={() => onDelete(game.id)}>
        Delete
      </button>
    </div>
  );
}