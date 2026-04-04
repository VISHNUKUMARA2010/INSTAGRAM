import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";

const PostHeader = ({ post, creatorProfile }) => {
    const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);

    return (
        <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"full"}
            my={1}
            p={2}
            borderRadius={14}
            bg='rgba(255,255,255,0.04)'
            border='1px solid rgba(255,255,255,0.08)'
            boxShadow='inset 0 1px 0 rgba(255,255,255,0.08)'
            backdropFilter='blur(8px)'
        >
            <Flex alignItems={"center"} gap={3} minW={0}>
                {creatorProfile ? (
                    <Link to={`/${creatorProfile.username}`}>
                        <Avatar
                            src={creatorProfile.profilePicURL}
                            alt='user profile pic'
                            size={"sm"}
                            boxShadow='0 0 0 2px rgba(98, 215, 255, 0.28), 0 8px 20px rgba(0, 0, 0, 0.22)'
                        />
                    </Link>
                ) : (
                    <SkeletonCircle size='10' />
                )}

                <Flex fontSize={12} fontWeight={"bold"} gap='2' minW={0} alignItems='center' flexWrap='wrap'>
                    {creatorProfile ? (
                        <Link to={`/${creatorProfile.username}`}>
                            <Box color='whiteAlpha.950' fontWeight={700} letterSpacing='0.2px'>
                                {creatorProfile.username}
                            </Box>
                        </Link>
                    ) : (
                        <Skeleton w={"100px"} h={"10px"} />
                    )}

                    <Box color={"whiteAlpha.600"}>• {timeAgo(post.createdAt)}</Box>
                </Flex>
            </Flex>
            <Box cursor={"pointer"}>
                <Button
                    size={"xs"}
                    bg='linear-gradient(180deg, rgba(98, 215, 255, 0.22), rgba(98, 215, 255, 0.12))'
                    border='1px solid rgba(150, 218, 255, 0.32)'
                    borderRadius={999}
                    px={4}
                    height='30px'
                    fontSize={12}
                    color={"blue.100"}
                    fontWeight={700}
                    boxShadow='inset 0 1px 0 rgba(255,255,255,0.14), 0 8px 16px rgba(0, 0, 0, 0.18)'
                    _hover={{
                        color: "white",
                        bg: 'linear-gradient(180deg, rgba(98, 215, 255, 0.3), rgba(98, 215, 255, 0.16))',
                    }}
                    transition={"0.2s ease-in-out"}
                    onClick={handleFollowUser}
                    isLoading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            </Box>
        </Flex>
    );
};

export default PostHeader;