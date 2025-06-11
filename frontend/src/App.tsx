import { Routes, Route } from "react-router-dom";
import SignInPage from "./components/signIn";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./contexts/AuthContext";
import HomeBoard from "./components/HomeBoard";
import NewHobby from "./components/NewHobby";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  // Adding checking for authentiation state
  const { loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route path="/home" element={<HomeBoard />} />
      <Route path="/hobby/new" element={<NewHobby />} />
    </Routes>
  );
}

export default App;
