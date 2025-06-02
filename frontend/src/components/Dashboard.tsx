import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut(auth);
        navigate("/");
    }

    return (
        <div> 
            <h1>Welcome, {currentUser?.email}</h1>
            <p>User ID: {currentUser?.uid}</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default Dashboard;