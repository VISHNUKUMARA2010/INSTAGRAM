import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const withTimeout = (promise, ms, message) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
    ]);
};

const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);

    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

    const showToast = useShowToast();

    const editProfile = async (inputs) => {
        if (isUpdating || !authUser) return null;
        setIsUpdating(true);

        const userDocRef = doc(firestore, "users", authUser.uid);
        try {
            const updatedUser = {
                ...authUser,
                fullName: inputs.fullName?.trim() || authUser.fullName,
                username: inputs.username?.trim() || authUser.username,
                bio: inputs.bio?.trim() || authUser.bio,
                profilePicURL: inputs.profilePicURL?.trim() || authUser.profilePicURL,
            };

            await withTimeout(
                updateDoc(userDocRef, updatedUser),
                15000,
                "Profile update timed out. Check Firestore rules and connection."
            );
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success", "Profile updated successfully", "success");
            return updatedUser;
        } catch (error) {
            showToast("Error", error?.message || "Failed to update profile.", "error");
            return null;
        } finally {
            setIsUpdating(false);
        }
    };

    return { editProfile, isUpdating };
};

export default useEditProfile;