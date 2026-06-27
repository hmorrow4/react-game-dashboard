import { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import About from "./components/About";

export default function App() {
  const [view, setView] = useState("dashboard");

  return (
    <div>
      <Header />

      <nav
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    padding: "10px",
  }}
>
  <button onClick={() => setView("dashboard")}>Dashboard</button>
  <button onClick={() => setView("about")}>About</button>
</nav>

      <main style={{ padding: "20px" }}>
        {view === "dashboard" && <Dashboard />}
        {view === "about" && <About />}
      </main>
    </div>
  );
}