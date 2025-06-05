import React, { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

function SignInPage() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignInWithGoogle = async () => {
    setError(null);
    setMessage(null);
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      const user = userCred.user;
      const token = await user.getIdToken();
      const userId = user.uid;
      login(token, userId);
      setMessage("Sign in with Google successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSignInWithEmail = async (e: React.FormEvent) => {
    setError(null);
    setMessage(null);
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        signInEmail,
        signInPassword
      );
      const user = userCred.user;
      const token = await user.getIdToken();
      const userId = user.uid;
      login(token, userId);
      setMessage("Sign in successful!");
      navigate("/dashboard");
      setSignInEmail("");
      setSignInPassword("");
    } catch (error) {
      console.error("Error signing in with email:", error);
      setError("Failed to sign in. Please check your email and password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-stone-300">
      <div className="flex flex-col py-16 px-12 shadow-lg rounded-lg w-96 bg-stone-50">
        <h1 className="font-bold mb-6 text-2xl">Sign in</h1>

        <form className="flex flex-col gap-2" onSubmit={handleSignInWithEmail}>
          <input
            type="email"
            placeholder="Email"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            className="border-2 border-stone-200 rounded-lg p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            className="border-2 border-stone-200 rounded-lg p-2"
            required
          />
          {message && <p className="text-emerald-500 text-xs">{message}</p>}
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            className="bg-emerald-400 mt-4 py-2 rounded-lg text-white hover:bg-emerald-600"
            type="submit"
          >
            Sign In
          </button>
          <button
            onClick={handleSignInWithGoogle}
            className="flex justify-center items-center border-2 border-stone-200 rounded-lg p-2"
          >
            <img src="/google.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
