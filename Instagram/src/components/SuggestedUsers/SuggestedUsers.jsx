import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
    const { isLoading, suggestedUsers } = useGetSuggestedUsers();

    // optional: render loading skeleton
    if (isLoading) return null;

    return (
        <VStack
            py={8}
            px={6}
            gap={4}
            alignItems='stretch'
            position='relative'
            _before={{
                content: '""',
                position: 'absolute',
                top: '-16%',
                left: '-30%',
                width: '170%',
                height: '42%',
                background: 'linear-gradient(120deg, rgba(255,255,255,0.14), rgba(255,255,255,0))',
                transform: 'rotate(-9deg)',
                pointerEvents: 'none',
            }}
        >
            <SuggestedHeader />

            {suggestedUsers.length !== 0 && (
                <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                    <Text fontSize={12} fontWeight={"bold"} color={"whiteAlpha.600"} textTransform='uppercase' letterSpacing={1.2}>
                        Suggested creators
                    </Text>
                    <Text fontSize={12} fontWeight={"bold"} _hover={{ color: "white" }} color='blue.200' cursor={"pointer"}>
                        See All
                    </Text>
                </Flex>
            )}

            {suggestedUsers.map((user) => (
                <SuggestedUser user={user} key={user.id} />
            ))}

            <Box
                fontSize={12}
                color={"whiteAlpha.700"}
                mt={6}
                alignSelf={"start"}
                w='full'
                p={3}
                borderRadius={12}
                bg='rgba(255,255,255,0.035)'
                border='1px solid rgba(180, 230, 255, 0.16)'
                boxShadow='inset 0 1px 0 rgba(255,255,255,0.08)'
            >
                © 2026 VibeNet Experience by {" "}
                <Link href='https://github.com/VISHNUKUMARA2010' target='_blank' color='cyan.400' fontSize={14}>
                    Vishnu
                </Link>
            </Box>
        </VStack>
    );
};

export default SuggestedUsers;