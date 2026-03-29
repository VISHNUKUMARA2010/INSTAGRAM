import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogin = () => {
    const showToast = useShowToast();
    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);

    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            return showToast("Error", "Please fill all the fields", "error");
        }
        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    showToast("Error", "User profile not found in Firestore.", "error");
                    return;
                }

                const userDoc = docSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { loading, error, login };
};

export default useLogin;