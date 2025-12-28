import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import QRverify from "./pages/QRverify";
import QrGenerate from "./pages/QrGenerate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/verify" element={<QRverify />} />
      <Route path="/generate" element={<QrGenerate />} />
    </Routes>
  );
}

export default App;
