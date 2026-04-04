import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
    const { isCommenting, handlePostComment } = usePostComment();
    const [comment, setComment] = useState("");
    const authUser = useAuthStore((state) => state.user);
    const commentRef = useRef(null);
    const { handleLikePost, isLiked, likes } = useLikePost(post);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment);
        setComment("");
    };

    return (
        <Box mb={10} marginTop={"auto"}>
            <Flex
                alignItems={"center"}
                gap={3}
                w={"full"}
                pt={0}
                mb={3}
                mt={4}
                p={2}
                borderRadius={14}
                bg='rgba(255,255,255,0.04)'
                border='1px solid rgba(255,255,255,0.08)'
                backdropFilter='blur(8px)'
            >
                <Box
                    onClick={handleLikePost}
                    cursor={"pointer"}
                    fontSize={18}
                    p={2}
                    borderRadius={999}
                    bg='rgba(255,255,255,0.05)'
                    _hover={{ bg: 'rgba(98, 215, 255, 0.16)' }}
                >
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>

                <Box
                    cursor={"pointer"}
                    fontSize={18}
                    p={2}
                    borderRadius={999}
                    bg='rgba(255,255,255,0.05)'
                    _hover={{ bg: 'rgba(98, 215, 255, 0.16)' }}
                    onClick={() => commentRef.current.focus()}
                >
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize={"sm"}>
                {likes} likes
            </Text>

            {isProfilePage && (
                <Text fontSize='12' color={"gray"}>
                    Posted {timeAgo(post.createdAt)}
                </Text>
            )}

            {!isProfilePage && (
                <>
                    <Text fontSize='sm' fontWeight={700}>
                        {creatorProfile?.username}{" "}
                        <Text as='span' fontWeight={400}>
                            {post.caption}
                        </Text>
                    </Text>
                    {post.comments.length > 0 && (
                        <Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
                            View all {post.comments.length} comments
                        </Text>
                    )}
                    {/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
                    {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
                </>
            )}

            {authUser && (
                <Flex
                    alignItems={"center"}
                    gap={2}
                    justifyContent={"space-between"}
                    w={"full"}
                    mt={3}
                    p={2}
                    borderRadius={14}
                    bg='rgba(255,255,255,0.035)'
                    border='1px solid rgba(255,255,255,0.08)'
                    backdropFilter='blur(8px)'
                >
                    <InputGroup>
                        <Input
                            variant={"unstyled"}
                            placeholder={"Add a comment..."}
                            fontSize={14}
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            ref={commentRef}
                            px={3}
                            py={2}
                            color='whiteAlpha.900'
                            _placeholder={{ color: 'whiteAlpha.500' }}
                        />
                        <InputRightElement>
                            <Button
                                fontSize={14}
                                color={"blue.100"}
                                fontWeight={700}
                                cursor={"pointer"}
                                _hover={{ color: "white" }}
                                bg={'linear-gradient(180deg, rgba(98, 215, 255, 0.18), rgba(98, 215, 255, 0.1))'}
                                border='1px solid rgba(150, 218, 255, 0.24)'
                                borderRadius={999}
                                onClick={handleSubmitComment}
                                isLoading={isCommenting}
                                size='sm'
                            >
                                Post
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            )}
        </Box>
    );
};

export default PostFooter