import { Box, Button, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import useAuthStore from "../../store/authStore";

const FeedPosts = () => {
    const [feedType, setFeedType] = useState("global");
    const { isLoading, posts } = useGetFeedPosts();
    const authUser = useAuthStore((state) => state.user);

    const filteredPosts =
        feedType === "global"
            ? posts
            : posts.filter((post) => authUser?.following?.includes(post.createdBy));

    return (
        <Container maxW={"container.sm"} py={10} px={2}>
            <Flex gap={2} mb={6}>
                <Button
                    size='sm'
                    onClick={() => setFeedType("global")}
                    bg={feedType === "global" ? "blue.500" : "whiteAlpha.200"}
                    _hover={{ bg: feedType === "global" ? "blue.600" : "whiteAlpha.300" }}
                >
                    Global Feed
                </Button>
                <Button
                    size='sm'
                    onClick={() => setFeedType("following")}
                    bg={feedType === "following" ? "blue.500" : "whiteAlpha.200"}
                    _hover={{ bg: feedType === "following" ? "blue.600" : "whiteAlpha.300" }}
                >
                    Following Feed
                </Button>
            </Flex>

            {isLoading &&
                [0, 1, 2].map((_, idx) => (
                    <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
                        <Flex gap='2'>
                            <SkeletonCircle size='10' />
                            <VStack gap={2} alignItems={"flex-start"}>
                                 <Skeleton height='10px' w={"200px"} />
                                 <Skeleton height='10px' w={"200px"} />
                             </VStack>
                         </Flex>
                         <Skeleton w={"full"}>
                             <Box h={"400px"}>contents wrapped</Box>
                         </Skeleton>
                     </VStack>   
                ))}

            {!isLoading && filteredPosts.length > 0 && filteredPosts.map((post) => <FeedPost key={post.id} post={post} />)}
            {!isLoading && filteredPosts.length === 0 && (
                <>
                    <Text fontSize={"md"} color={"red.400"}>
                        {feedType === "following"
                            ? "No posts from followed users yet."
                            : "No posts available yet."}
                    </Text>
                    <Text color={"red.400"}>
                        {feedType === "following"
                            ? "Follow users to see their posts here."
                            : "Be the first to create a post."}
                    </Text>
                </>
            )}
        </Container>
    );
};

export default FeedPosts;