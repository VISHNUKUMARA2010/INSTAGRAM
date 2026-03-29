import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import useAuthStore from "../../store/authStore";

const ProfilePosts = ({ activeTab }) => {
    const { isLoading, posts } = useGetUserPosts();
    const authUser = useAuthStore((state) => state.user);

    if (activeTab === "saved") return <EmptyTabMessage text='Saved posts coming soon.' />;

    if (activeTab === "likes") {
        const likedPosts = posts.filter((post) => post.likes?.includes(authUser?.uid));
        if (!isLoading && likedPosts.length === 0) return <EmptyTabMessage text='No liked posts yet.' />;
        if (!isLoading) {
            return (
                <Grid
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(3, 1fr)",
                    }}
                    gap={1}
                    columnGap={1}
                >
                    {likedPosts.map((post) => (
                        <ProfilePost post={post} key={post.id} />
                    ))}
                </Grid>
            );
        }
    }

    const noPostsFound = !isLoading && posts.length === 0;
    if (noPostsFound) return <NoPostsFound />;

    return (
        <Grid
            templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
            }}
            gap={1}
            columnGap={1}
        >
            {isLoading &&
                [0, 1, 2].map((_, idx) => (
                    <VStack key={idx} alignItems={"flex-start"} gap={4}>
                        <Skeleton w={"full"}>
                            <Box h='300px'>contents wrapped</Box>
                        </Skeleton>
                    </VStack>
                ))}

                {!isLoading && (
                    <>
                        {posts.map((post) => (
                            <ProfilePost post={post} key={post.id} />
                        ))}
                    </>
                )}
        </Grid>
    );
};

export default ProfilePosts;

const NoPostsFound = () => {
    return (
        <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
            <Text fontSize={"2xl"}>No Posts Found🤔</Text>
        </Flex>
    );
};

const EmptyTabMessage = ({ text }) => {
    return (
        <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
            <Text fontSize={"xl"}>{text}</Text>
        </Flex>
    );
};