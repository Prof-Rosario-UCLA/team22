import React, { useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  //   signOut as firebaseSignOut,
} from "firebase/auth";

import { auth, googleProvider } from "../firebaseConfig";
// import { useAuth } from "../contexts/AuthContext";

function SignInPage() {
  // const { currentUser, idToken } = useAuth();
  const [signInEmail, setSignInEmail] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
<<<<<<< HEAD:frontend/src/components/signInPage.tsx
  const navigate = useNavigate();
=======
>>>>>>> parent of 6b65b6f (Added tailwind, added react router: redirection on successful login with google):frontend/src/components/signIn.tsx

  const handleSignInWithGoogle = async () => {
    setError(null);
    setMessage(null);
    try {
      await signInWithPopup(auth, googleProvider);
      setMessage("Sign in with Google successful!");
<<<<<<< HEAD:frontend/src/components/signInPage.tsx
      navigate("/dashboard");
=======
>>>>>>> parent of 6b65b6f (Added tailwind, added react router: redirection on successful login with google):frontend/src/components/signIn.tsx
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
      await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      setMessage("Sign in successful!");
      navigate("/dashboard");
      setSignInEmail("");
      setSignInPassword("");
    } catch (error) {
      console.error("Error signing in with email:", error);
      setError("Failed to sign in. Please check your email and password.");
    }
  };

  const handleSignUpWithEmail = async (e: React.FormEvent) => {
    setError(null);
    setMessage(null);
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      setMessage("Sign up successful! You can now sign in.");
      setSignUpEmail("");
      setSignUpPassword("");
    } catch (error) {
      console.error("Error signing up with email:", error);
      setError("Failed to sign up. Password needs at least 6 characters.");
    }
  };

  //   const handleSignOut = async () => {
  //     try {
  //       await firebaseSignOut(auth);
  //     } catch (error) {
  //       console.error("Error signing out:", error);
  //     }
  //   };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleSignInWithGoogle}>Sign in with Google</button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Sign In / Sign Up</h2>
      <form onSubmit={handleSignInWithEmail}>
        <h3>Sign In With Email</h3>
        <input
          type="email"
          placeholder="Email"
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={signInPassword}
          onChange={(e) => setSignInPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <form onSubmit={handleSignUpWithEmail}>
        <h3>Sign Up With Email</h3>
        <input
          type="email"
          placeholder="Email"
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={signUpPassword}
          onChange={(e) => setSignUpPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignInPage;
