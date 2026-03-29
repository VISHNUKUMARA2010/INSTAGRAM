import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	GridItem,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import { firestore } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../Comment/Caption";
import ReactPlayer from "react-player";

const getYouTubeEmbed = (url) => {
	if (!url) return null;
	if (url.includes("youtube.com/watch?v=")) {
		const id = url.split("v=")[1]?.split("&")[0];
		return id ? `https://www.youtube.com/embed/${id}` : null;
	}
	return null;
};

const isDirectVideoUrl = (url) => /\.(mp4|webm|ogg|mov|m3u8)(\?.*)?$/i.test(url || "");

const ProfilePost = ({ post }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const isVideoPost = post?.mediaType === "video";
	const mediaSrc = post?.mediaURL || post?.imageURL;
	const youtubeEmbedUrl = getYouTubeEmbed(mediaSrc);
	const isDirectVideo = isDirectVideoUrl(mediaSrc);
	const youtubeAutoplayUrl = youtubeEmbedUrl ? `${youtubeEmbedUrl}?autoplay=1&mute=1&playsinline=1&rel=0` : null;
	const likes = Array.isArray(post?.likes) ? post.likes : [];
	const comments = Array.isArray(post?.comments) ? post.comments : [];
	const showToast = useShowToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const deletePost = usePostStore((state) => state.deletePost);
	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

	const handleDeletePost = async () => {
		if (!authUser) return;
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		if (isDeleting) return;
		setIsDeleting(true);

		try {
			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "posts", post.id));

			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});

			deletePost(post.id);
			decrementPostsCount(post.id);
			showToast("Success", "Post deleted successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<GridItem
				cursor={"pointer"}
				borderRadius={4}
				overflow={"hidden"}
				border={"1px solid"}
				borderColor={"whiteAlpha.300"}
				position={"relative"}
				aspectRatio={1 / 1}
				onClick={onOpen}
			>
				<Flex
					opacity={0}
					_hover={{ opacity: 1 }}
					position={"absolute"}
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg={"blackAlpha.700"}
					transition={"all 0.3s ease"}
					zIndex={1}
					justifyContent={"center"}
				>
					<Flex alignItems={"center"} justifyContent={"center"} gap={50}>
						<Flex>
							<AiFillHeart size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{likes.length}
							</Text>
						</Flex>

						<Flex>
							<FaComment size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{comments.length}
							</Text>
						</Flex>
					</Flex>
				</Flex>

				{isVideoPost ? (
					<Box w='full' h='full' display='flex' alignItems='center' justifyContent='center' bg='whiteAlpha.100'>
						<Text fontSize={12} fontWeight='bold'>VIDEO REEL</Text>
					</Box>
				) : (
					<Image src={mediaSrc} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />
				)}
			</GridItem>

            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody bg={"black"} pb={5}>
                        <Flex
                            gap='4'
                            w={{ base: "90%", sm: "70%", md: "full" }}
                            mx={"auto"}
                            maxH={"90vh"}
                            minH={"50vh"}
                        >
                            <Flex
                                borderRadius={4}
								overflow={"hidden"}
								border={"1px solid"}
								borderColor={"whiteAlpha.300"}
								flex={1.5}
								justifyContent={"center"}
								alignItems={"center"}
							>
								{isVideoPost ? (
									youtubeEmbedUrl ? (
										<iframe
											src={youtubeAutoplayUrl}
											title='reel modal'
											allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
											allowFullScreen
											style={{ width: "100%", minHeight: "420px", border: "none" }}
										/>
									) : isDirectVideo ? (
										<video
											src={mediaSrc}
											controls
											autoPlay
											muted
											loop
											playsInline
											preload='metadata'
											style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
										/>
									) : (
										<Box w='full' maxH='80vh'>
											<ReactPlayer
												url={mediaSrc}
												width='100%'
												height='420px'
												controls={true}
												playing={true}
												muted={true}
												loop={true}
												playsinline={true}
											/>
										</Box>
									)
								) : (
									<Image src={mediaSrc} alt='profile post' />
								)}
							</Flex>
							<Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
								<Flex alignItems={"center"} justifyContent={"space-between"}>
									<Flex alignItems={"center"} gap={2}>
										<Avatar src={userProfile?.profilePicURL || ""} size={"sm"} name='As a Programmer' />
										<Text fontWeight={"blod"} fontSize={12}>
											{userProfile?.username || "unknown"}
										</Text>
									</Flex>

										{authUser?.uid === userProfile?.uid && (
										<Button
										    size={"sm"}
											bg={"transparent"}
											_hover={{ bg: "whiteAlpha.300", color: "red.600" }}
											borderRadius={4}
											p={1}
											onClick={handleDeletePost}
											isLoading={isDeleting}
										>
											<MdDelete size={20} cursor='pointer' />
										</Button>
									)}
								</Flex>
								<Divider my={4} bg={"gray.500"} />

								<VStack w='full' alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
									{/* CAPTION */}
									{post.caption && <Caption post={post} />}
									{/* COMMENTS */}
									{comments.map((comment, index) => (
										<Comment key={comment?.id || `${post.id}-${index}`} comment={comment} />
									))}
								</VStack>
								<Divider my={4} bg={"gray.8000"} />

								<PostFooter isProfilePage={true} post={post} />
							</Flex>
                        </Flex>
                    </ModalBody>
				</ModalContent>
            </Modal>
		</>
	);
};

export default ProfilePost