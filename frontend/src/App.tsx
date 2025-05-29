import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { useAuth } from "./contexts/AuthContext.tsx"; // Importing the useAuth hook
import SignInPage from "./components/signIn.tsx";

function App() {
  const [count, setCount] = useState(0);

  // Adding checking for authentiation state
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SignInPage />
    </>
  );
}

export default App;
