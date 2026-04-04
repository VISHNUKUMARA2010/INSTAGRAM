import { Avatar, Button, Flex, Text } from "@chakra-ui/react"
import useLogout from "../../hooks/useLogout"
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
    const { handleLogout, isLoggingOut} = useLogout();
    const authUser = useAuthStore((state) => state.user);

    if (!authUser) return null;

    return (
        <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"full"}
            p={3}
            borderRadius={14}
            bg='rgba(255,255,255,0.04)'
            border='1px solid rgba(176, 229, 255, 0.2)'
            boxShadow='inset 0 1px 0 rgba(255,255,255,0.1)'
            backdropFilter='blur(8px)'
        >
            <Flex alignItems={"center"} gap={3}>
                <Link to={`${authUser.username}`}>
                    <Avatar size={"lg"} src={authUser.profilePicURL} boxShadow='0 0 0 2px rgba(98, 215, 255, 0.24), 0 8px 20px rgba(0, 0, 0, 0.26)' />
                </Link>
                <Link to={`${authUser.username}`}>
                    <Text fontSize={14} fontWeight={"bold"} color='whiteAlpha.900'>
                        {authUser.username}
                    </Text>
                </Link>
            </Flex>
            <Button
                size={"xs"}
                background='linear-gradient(180deg, rgba(98, 215, 255, 0.2), rgba(98, 215, 255, 0.1))'
                border='1px solid rgba(168, 228, 255, 0.3)'
                borderRadius={999}
                px={4}
                _hover={{ background: 'linear-gradient(180deg, rgba(98, 215, 255, 0.28), rgba(98, 215, 255, 0.14))' }}
                fontSize={14}
                fontWeight={"medium"}
                color={"blue.100"}
                onClick={handleLogout}
                isLoading={isLoggingOut}
                cursor={"pointer"}
            >
                Log out
            </Button>
        </Flex>
    );
};

export default SuggestedHeader;