import { Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";

const GoogleAuth = ({ prefix }) => {
    const provider = useMemo(() => new GoogleAuthProvider(), []);
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);

    const upsertAndLoginUser = async (firebaseUser) => {
        const userRef = doc(firestore, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userDoc = userSnap.data();
            localStorage.setItem("user-info", JSON.stringify(userDoc));
            loginUser(userDoc);
            return;
        }

        const userDoc = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            username: firebaseUser.email.split("@")[0],
            fullName: firebaseUser.displayName,
            bio: "",
            profilePicURL: firebaseUser.photoURL,
            followers: [],
            following: [],
            posts: [],
            createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", firebaseUser.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
    };

    useEffect(() => {
        let isMounted = true;

        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (!result?.user || !isMounted) return;

                await upsertAndLoginUser(result.user);
            } catch (error) {
                if (!isMounted) return;
                showToast("Error", error.message, "error");
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        handleRedirectResult();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleGoogleAuth = async () => {
        try {
            setIsLoading(true);
            await signInWithRedirect(auth, provider);
        } catch (error) {
            setIsLoading(false);
            showToast("Error", error.message, "error");
        }
    };

    return (
        <Flex
            alignItems={"center"}
            justifyContent={"center"}
            cursor={isLoading ? "not-allowed" : "pointer"}
            opacity={isLoading ? 0.7 : 1}
            onClick={isLoading ? undefined : handleGoogleAuth}
        >
            <Image src='/google.png' w={5} alt='Google logo' />
            <Text mx='2' color={"blue.500"}>
                {isLoading ? "Redirecting to Google..." : `${prefix} with Google`}
            </Text>
        </Flex>
    );
};

export default GoogleAuth;