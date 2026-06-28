import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">
        <Dashboard />
      </main>
    </div>
  );
}