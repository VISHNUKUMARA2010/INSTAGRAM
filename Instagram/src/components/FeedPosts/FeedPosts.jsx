import { Box, Button, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/UseGetFeedPosts";
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
        <Container maxW={"container.md"} py={{ base: 4, md: 8 }} px={{ base: 0, md: 2 }}>
            <Flex gap={2} mb={6} p={1} bg='whiteAlpha.100' borderRadius={12} w='fit-content'>
                <Button
                    size='sm'
                    onClick={() => setFeedType("global")}
                    borderRadius={10}
                    px={5}
                    bg={feedType === "global" ? "blue.400" : "transparent"}
                    color={feedType === "global" ? "#041126" : "whiteAlpha.800"}
                    _hover={{ bg: feedType === "global" ? "blue.300" : "whiteAlpha.200" }}
                >
                    Global Feed
                </Button>
                <Button
                    size='sm'
                    onClick={() => setFeedType("following")}
                    borderRadius={10}
                    px={5}
                    bg={feedType === "following" ? "blue.400" : "transparent"}
                    color={feedType === "following" ? "#041126" : "whiteAlpha.800"}
                    _hover={{ bg: feedType === "following" ? "blue.300" : "whiteAlpha.200" }}
                >
                    Following Feed
                </Button>
            </Flex>

            {isLoading &&
                [0, 1, 2].map((_, idx) => (
                    <VStack
                        key={idx}
                        gap={4}
                        alignItems={"flex-start"}
                        mb={8}
                        p={4}
                        border='1px solid'
                        borderColor='whiteAlpha.200'
                        borderRadius={16}
                        bg='rgba(6, 14, 28, 0.72)'
                    >
                        <Flex gap='2'>
                            <SkeletonCircle size='10' />
                            <VStack gap={2} alignItems={"flex-start"}>
                                <Skeleton height='10px' w={"200px"} />
                                <Skeleton height='10px' w={"160px"} />
                            </VStack>
                        </Flex>
                        <Skeleton w={"full"} borderRadius={12}>
                            <Box h={"420px"}>contents wrapped</Box>
                        </Skeleton>
                    </VStack>
                ))}

            {!isLoading && filteredPosts.length > 0 && filteredPosts.map((post) => <FeedPost key={post.id} post={post} />)}
            {!isLoading && filteredPosts.length === 0 && (
                <Box p={6} border='1px solid' borderColor='whiteAlpha.200' borderRadius={16} bg='rgba(6, 14, 28, 0.72)'>
                    <Text fontSize={"md"} color={"whiteAlpha.900"} fontWeight={600}>
                        {feedType === "following"
                            ? "No posts from followed users yet."
                            : "No posts available yet."}
                    </Text>
                    <Text color={"whiteAlpha.700"} mt={1}>
                        {feedType === "following"
                            ? "Follow users to see their posts here."
                            : "Be the first to create a post."}
                    </Text>
                </Box>
            )}
        </Container>
    );
};

export default FeedPosts;