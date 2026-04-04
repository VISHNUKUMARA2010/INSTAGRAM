import { signInWithEmailAndPassword } from "firebase/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { useState } from "react";

const getAuthMessage = (code) => {
    switch (code) {
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
        case "auth/invalid-login-credentials":
            return "Email/password sign-in failed. If this account was created with Google, use Google login or set a password using password reset.";
        case "auth/too-many-requests":
            return "Too many failed attempts. Please try again later.";
        case "auth/network-request-failed":
            return "Network error. Check your internet connection and try again.";
        case "auth/operation-not-allowed":
            return "Email/password sign-in is disabled in Firebase Authentication. Enable it in Firebase Console > Authentication > Sign-in method.";
        default:
            return "Unable to log in right now. Please try again.";
    }
};

const useLogin = () => {
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            setAuthError("Please fill all the fields.");
            return showToast("Error", "Please fill all the fields", "error");
        }

        const normalizedEmail = inputs.email.trim().toLowerCase();

        setAuthError("");
        setLoading(true);

        try {
            const userCred = await signInWithEmailAndPassword(auth, normalizedEmail, inputs.password);

            const docRef = doc(firestore, "users", userCred.user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                const message = "User profile not found in Firestore.";
                setAuthError(message);
                showToast("Error", message, "error");
                return;
            }

            const userDoc = docSnap.data();
            localStorage.setItem("user-info", JSON.stringify(userDoc));
            loginUser(userDoc);
        } catch (error) {
            const message = getAuthMessage(error?.code);
            setAuthError(message);
            showToast("Error", message, "error");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error: authError, login };
};

export default useLogin;