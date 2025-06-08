import { Routes, Route } from "react-router-dom";
import SignInPage from "./components/signIn";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./contexts/AuthContext";
import HomeBoard from "./components/HomeBoard";

function App() {
  // Adding checking for authentiation state
  const { loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<HomeBoard />} />
    </Routes>
  );
}

export default App;
