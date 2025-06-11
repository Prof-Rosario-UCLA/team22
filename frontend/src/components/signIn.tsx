import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import type { StorageType } from "../contexts/AuthContext";
import Welcome from "./Welcome";

function SignInPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [storagePreference, setStoragePreference] = useState<StorageType | null>(null);


  const navigate = useNavigate();
  const { login } = useAuth();

    useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");

    if (token && userId) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSignInWithGoogle = async () => {
    setError(null);
    setMessage(null);
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      const user = userCred.user;
      const token = await user.getIdToken();
      const userId = user.uid;
      login(token, userId, storagePreference || "sessionStorage");
      setMessage("Sign in with Google successful!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      if (error.code === "auth/network-request-failed") {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("Failed to sign in with Google. Please try again.");
      }
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    setError(null);
    setMessage(null);
    e.preventDefault();
    try {
      let userCred;
      if (isLogin) {
        userCred = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCred = await createUserWithEmailAndPassword(auth, email, password);
      }
      const user = userCred.user;
      const token = await user.getIdToken();
      const userId = user.uid;
      login(token, userId, storagePreference || "sessionStorage");
      setMessage(
        isLogin ? "Sign in successful!" : "Account created successfully!"
      );
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error(
        `Error ${isLogin ? "signing in" : "signing up"} with email:`,
        error
      );
      if (error.code === "auth/network-request-failed") {
        setError("Network error. Please check your connection and try again.");
      } else if (error.code === "auth/invalid-credential") {
        setError("Invalid credentials. Please check your email and password.");
      } else if (error.code === "auth/email-already-in-use") {
        setError(
          "This email is already in use. Please sign in or use another."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300 p-4">
      <section
        className="w-full max-w-md rounded-2xl bg-white/60 p-8 pt-6 shadow-2xl backdrop-blur-lg border border-white/50"
        aria-labelledby="auth-heading"
      >
        <Welcome />

        <h1
          id="auth-heading"
          className="text-2xl font-bold text-stone-800 text-center mb-6"
        >
          {isLogin ? "Sign in to Continue" : "Create Your Account"}
        </h1>

        <form className="space-y-4" onSubmit={handleEmailAuth}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-stone-300 bg-stone-50 py-2 pl-10 pr-3 transition placeholder:text-stone-400 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-stone-300 bg-stone-50 py-2 pl-10 pr-3 transition placeholder:text-stone-400 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          {message && (
            <p className="text-emerald-600 text-sm font-medium">{message}</p>
          )}
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <div className="space-y-3 pt-4">
            <button
              className="w-full rounded-lg bg-emerald-500 py-3 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              type="submit"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
            <button
              onClick={handleSignInWithGoogle}
              type="button"
              className="group flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white py-3 text-base font-bold text-stone-700 shadow-sm transition hover:bg-stone-50 hover:border-stone-400"
            >
              <img
                src="/google.svg"
                alt="Google Logo"
                className="w-5 h-5 transition-transform group-hover:scale-110"
              />
              Sign {isLogin ? "in" : "up"} with Google
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-stone-600">
            {isLogin ? "Need an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setMessage(null);
              setEmail("");
              setPassword("");
            }}
            className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </section>
      {storagePreference === null && (
  <div className="fixed bottom-0 left-0 right-0 bg-stone-500 text-stone-200 text-sm p-4 flex justify-between items-center z-50">
    <p>This app uses local storage to persist login data. Allow it to remember you?</p>
    <div className="space-x-2">
      <button
        onClick={() => setStoragePreference("localStorage")}
        className="bg-emerald-500 px-3 py-1 rounded hover:bg-emerald-600"
      >
        Accept
      </button>
      <button
        onClick={() => setStoragePreference("sessionStorage")}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Deny
      </button>
    </div>
  </div>
)}

    </main>
  );
}

export default SignInPage;
