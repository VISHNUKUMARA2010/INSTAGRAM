import { useEffect, useState } from "react";
import usePostsStore from "../store/postStore";
import useAuthStore from "./store/authStore";
import ShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPosts = () => {
    const [isLoading, setISLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const { setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const getFeedPosts = async () => {
            setISLoading(true);
            if (authUser.following.length === 0) {
                setISLoading(false);
                setPosts([]);
                return;
            }
            const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following));
            try {
                const querySnapshot = await getDocs(q);
                const feedPosts = [];

                querySnapshot.forEach((doc) => {
                    feedPosts.push({ id: doc.id, ...doc.data() });
                });

                feedPosts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(feedPosts);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setISLoading(false);
            }
        };

        if (authUser) getFeedPosts();
    }, [authUser, showToast, setPosts, setUserProfile]);

    return { isLoading, posts };
};

export default useGetFeedPosts;