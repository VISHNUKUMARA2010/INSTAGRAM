import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
    return (
        <Container maxW={"container.xl"} py={{ base: 4, md: 6 }}>
            <Flex gap={{ base: 8, xl: 14 }} alignItems='flex-start'>
                <Box flex={2} py={{ base: 4, md: 10 }}>
                    <FeedPosts />
                </Box>
                <Box
                    flex={3}
                    mr={{ base: 0, xl: 10 }}
                    display={{ base: "none", lg: "block" }}
                    maxW={"340px"}
                    bg='linear-gradient(160deg, rgba(14, 28, 54, 0.62), rgba(7, 16, 32, 0.54))'
                    border='1px solid rgba(145, 210, 255, 0.26)'
                    borderRadius={18}
                    boxShadow='inset 0 1px 0 rgba(255,255,255,0.12), 0 16px 34px rgba(0,0,0,0.24), 0 0 20px rgba(98, 215, 255, 0.06)'
                >
                    <SuggestedUsers />
                </Box>
            </Flex>
        </Container>
    );
};

export default HomePage;