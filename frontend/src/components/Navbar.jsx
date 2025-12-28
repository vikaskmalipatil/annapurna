import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      background: "#1976d2",
      padding: "12px",
      color: "white"
    }}>
      <span style={{ fontWeight: "bold", marginRight: "20px" }}>
        Annapurna PDS
      </span>

      <Link to="/" style={{ color: "white", marginRight: 15 }}>Home</Link>
      <Link to="/transactions" style={{ color: "white", marginRight: 15 }}>Transactions</Link>
      <Link to="/complaints" style={{ color: "white" }}>Complaints</Link>
    </nav>
  );
}
