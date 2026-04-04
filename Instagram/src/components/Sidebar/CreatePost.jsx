import {
    Box,
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Textarea,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import ReactPlayer from "react-player";

const normalizeVideoUrl = (url) => {
    const trimmedUrl = url.trim();

    if (trimmedUrl.includes("youtube.com/shorts/")) {
        const videoId = trimmedUrl.split("shorts/")[1]?.split("?")[0];
        return videoId ? `https://www.youtube.com/watch?v=${videoId}` : trimmedUrl;
    }

    if (trimmedUrl.includes("youtu.be/")) {
        const videoId = trimmedUrl.split("youtu.be/")[1]?.split("?")[0];
        return videoId ? `https://www.youtube.com/watch?v=${videoId}` : trimmedUrl;
    }

    return trimmedUrl;
};

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [caption, setCaption] = useState("");
    const [mediaURL, setMediaURL] = useState("");
    const [mediaType, setMediaType] = useState("image");
    const showToast = useShowToast();
    const { isLoading, handleCreatePost } = useCreatePost();

    const handlePostCreation = async () => {
        try {
            await handleCreatePost(mediaURL, caption, mediaType);
            onClose();
            setCaption("");
            setMediaURL("");
            setMediaType("image");
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <>
            <Tooltip
            hasArrow
            label={"Create"}
            placement='right'
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
        >
            <Flex
                alignItems={"center"}
                gap={4}
                bg='rgba(255,255,255,0.04)'
                _hover={{
                    bg: "linear-gradient(180deg, rgba(98, 215, 255, 0.24), rgba(98, 215, 255, 0.12))",
                    borderColor: "rgba(165, 229, 255, 0.44)",
                    transform: 'translateX(2px)',
                }}
                border='1px solid rgba(176, 229, 255, 0.18)'
                borderRadius={14}
                p={3}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={onOpen}
                transition='all 0.2s ease'
                boxShadow='inset 0 1px 0 rgba(255,255,255,0.08)'
            >
                <CreatePostLogo />
                <Box display={{ base: "none", md: "block" }} fontWeight={500}>Create</Box>
            </Flex>
        </Tooltip>

        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />

            <ModalContent bg={"black"} border={"1px solid gray"}>
                <ModalHeader>Create Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Textarea
                        placeholder='Post caption...'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />

                    <Select mt={4} value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
                        <option value='image'>Image Post</option>
                        <option value='video'>Video Reel</option>
                    </Select>

                    <Input
                        mt={4}
                        placeholder={mediaType === "video" ? "Video URL (https://...)" : "Image URL (https://...)"}
                        type='url'
                        value={mediaURL}
                        onChange={(e) => setMediaURL(e.target.value)}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
                        Post
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
};

export default CreatePost;

function useCreatePost() {
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const createPost = usePostStore((state) => state.createPost);
    const addPost = useUserProfileStore((state) => state.addPost);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const { pathname } = useLocation();

    const handleCreatePost = async (mediaURL, caption, mediaType) => {
        if (isLoading) return;
        if (!authUser) throw new Error("You must be logged in");
        if (!mediaURL?.trim()) throw new Error("Please add a media URL");
        const cleanedMediaURL = mediaURL.trim();
        const normalizedMediaURL = mediaType === "video" ? normalizeVideoUrl(cleanedMediaURL) : cleanedMediaURL;

        if (mediaType === "video") {
            const isDirectVideo = /\.(mp4|webm|ogg|mov|m3u8)(\?.*)?$/i.test(normalizedMediaURL);
            const isPlayableByProvider = ReactPlayer.canPlay(normalizedMediaURL);

            if (!isDirectVideo && !isPlayableByProvider) {
                throw new Error(
                    "Unsupported video URL. Use a direct video file link (.mp4/.webm) or a supported link like YouTube."
                );
            }

            if (normalizedMediaURL.includes("bing.com/videos/riverview")) {
                throw new Error("Bing video page links are not direct playable video URLs.");
            }
        }

        setIsLoading(true);
        const newPost = {
            caption: caption,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
            imageURL: normalizedMediaURL,
            mediaURL: normalizedMediaURL,
            mediaType: mediaType || "image",
        };

        try {
            const postRef = await addDoc(collection(firestore, "posts"), newPost);
            const postId = postRef.id;
            const userDocRef = doc(firestore, "users", authUser.uid);

            await updateDoc(userDocRef, { posts: arrayUnion(postId) });

            if (userProfile?.uid === authUser.uid) createPost({ ...newPost, id: postId });

            if (pathname !== "/" && userProfile?.uid === authUser.uid) addPost({ ...newPost, id: postId });

            showToast("Success", "Post created successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleCreatePost };
}


// import { Box, Flex, Tooltip } from "@chakra-ui/react";
// import { CreatePostLogo } from "../../assets/constants";

// const CreatePost = () => {
// 	return (
// 		<>
// 			<Tooltip
// 				hasArrow
// 				label={"Create"}
// 				placement='right'
// 				ml={1}
// 				openDelay={500}
// 				display={{ base: "block", md: "none" }}
// 			>
// 				<Flex
// 					alignItems={"center"}
// 					gap={4}
// 					_hover={{ bg: "whiteAlpha.400" }}
// 					borderRadius={6}
// 					p={2}
// 					w={{ base: 10, md: "full" }}
// 					justifyContent={{ base: "center", md: "flex-start" }}
// 				>
// 					<CreatePostLogo />
// 					<Box display={{ base: "none", md: "block" }}>Create</Box>
// 				</Flex>
// 			</Tooltip>
// 		</>
// 	);
// };

// export default CreatePost;

// 2-COPY AND PASTE FOR THE MODAL
{
	/* <Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea placeholder='Post caption...' />

						<Input type='file' hidden />

						<BsFillImageFill
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>
					</ModalBody>

					<ModalFooter>
						<Button mr={3}>Post</Button>
					</ModalFooter>
				</ModalContent>
			</Modal> */
}
