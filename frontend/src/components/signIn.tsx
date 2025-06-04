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
    <div className="min-h-screen flex items-center justify-center bg-bg dark:bg-bg px-4">
      <div className="w-full max-w-md bg-surface dark:bg-surface rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-heading mb-6 text-center">
          Sign in to your account
        </h1>
        <button
          onClick={handleSignInWithGoogle}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition mb-6 shadow-sm"
        >
          <img src="/google-logo.png" alt="Google Logo" className="w-5 h-5" />
          Sign in with Google
        </button>

        {message && (
          <p className="text-green-600 text-center mb-2">{message}</p>
        )}
        {error && <p className="text-danger text-center mb-2">{error}</p>}

        <div className="flex flex-col gap-6 mt-4">
          <form
            onSubmit={handleSignInWithEmail}
            className="flex flex-col gap-3"
          >
            <h2 className="text-lg font-semibold text-heading mb-1">
              Sign In With Email
            </h2>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              required
              className="px-4 py-2 rounded border border-secondary bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              required
              className="px-4 py-2 rounded border border-secondary bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition shadow-sm"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
