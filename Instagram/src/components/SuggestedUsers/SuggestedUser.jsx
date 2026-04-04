import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
    const authUser = useAuthStore((state) => state.user);

    const onFollowUser = async () => {
        await handleFollowUser();
        if (setUser) {
            setUser({
                ...user,
                followers: isFollowing
                    ? user.followers.filter((follower) => follower.uid !== authUser.uid)
                    : [...user.followers, authUser],
            });
        }
    };

    return (
        <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"full"}
            p={3}
            borderRadius={14}
            bg='rgba(255,255,255,0.04)'
            border='1px solid rgba(176, 229, 255, 0.16)'
            _hover={{
                bg: 'linear-gradient(180deg, rgba(98, 215, 255, 0.2), rgba(98, 215, 255, 0.1))',
                borderColor: 'rgba(176, 229, 255, 0.36)',
                transform: 'translateY(-1px)',
            }}
            transition='all 0.2s ease'
            boxShadow='inset 0 1px 0 rgba(255,255,255,0.08)'
        >
            <Flex alignItems={"center"} gap={3}>
                <Link to={`/${user.username}`}>
                    <Avatar src={user.profilePicURL} size={"md"} boxShadow='0 0 0 1px rgba(176, 229, 255, 0.24)' />
                </Link>
                <VStack spacing={2} alignItems={"flex-start"}>
                    <Link to={`/${user.username}`}>
                        <Box fontSize={13} fontWeight={"bold"} color='whiteAlpha.900'>
                            {user.fullName}
                        </Box>
                    </Link>
                    <Box fontSize={11} color={"whiteAlpha.600"}>
                        {user.followers.length} followers
                    </Box>
                </VStack>
            </Flex>
            {authUser.uid !== user.uid && (
                <Button
                    fontSize={13}
                    bg='linear-gradient(180deg, rgba(98, 215, 255, 0.2), rgba(98, 215, 255, 0.1))'
                    border='1px solid rgba(168, 228, 255, 0.3)'
                    borderRadius={999}
                    px={4}
                    h={"30px"}
                    fontWeight={"semibold"}
                    color={"blue.100"}
                    cursor={"pointer"}
                    _hover={{ color: "white", bg: 'linear-gradient(180deg, rgba(98, 215, 255, 0.3), rgba(98, 215, 255, 0.14))' }}
                    onClick={onFollowUser}
                    isLoading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            )}
        </Flex>
    );
};

export default SuggestedUser;