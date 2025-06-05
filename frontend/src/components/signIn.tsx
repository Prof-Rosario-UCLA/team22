import React, { useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

function SignInPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      login(token, userId);
      setMessage(
        isLogin ? "Sign in successful!" : "Account created successfully!"
      );
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(
        `Error ${isLogin ? "signing in" : "signing up"} with email:`,
        error
      );
      setError(
        isLogin
          ? "Failed to sign in. Please check your email and password."
          : "Failed to create account. Password needs at least 6 characters."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-stone-300">
      <div className="flex flex-col py-16 px-12 shadow-lg rounded-lg w-96 bg-stone-50">
        <h1 className="font-bold mb-4 text-2xl">
          {isLogin ? "Sign in" : "Create Account"}
        </h1>

        <form className="flex flex-col gap-2" onSubmit={handleEmailAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-stone-200 rounded-lg p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-stone-200 rounded-lg p-2"
            required
          />
          {message && <p className="text-emerald-500 text-xs">{message}</p>}
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            className="bg-emerald-400 mt-4 py-2 rounded-lg text-white hover:bg-emerald-600"
            type="submit"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
          <button
            onClick={handleSignInWithGoogle}
            className="flex justify-center items-center border-2 border-stone-200 rounded-lg p-2"
          >
            <img src="/google.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
            Sign {isLogin ? "in" : "up"} with Google
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-stone-500">
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
            className="text-stone-500 hover:text-stone-700 underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
