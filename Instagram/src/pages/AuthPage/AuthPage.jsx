import { Container, Flex, VStack, Box, Image, Heading, Text } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
    return (
        <Flex className='auth-shell' minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"container.xl"} padding={0}>
                <Flex justifyContent={"center"} alignItems={"stretch"} gap={{ base: 8, lg: 12 }}>
                    {/* Left hand-side */}
                    <Box
                        display={{ base: "none", lg: "block" }}
                        p={10}
                        borderRadius={14}
                        bg={'whiteAlpha.100'}
                        border={'1px solid'}
                        borderColor={'whiteAlpha.300'}
                        backdropFilter={'blur(8px)'}
                        boxShadow={'2xl'}
                        maxW={"420px"}
                    >
                        <VStack spacing={5} align={"start"} color={"white"}>
                            <Image src='/logo.svg' h={10} alt='VibNet logo' />
                            <Heading size={"xl"} lineHeight={1.05}>
                                A cleaner way to share moments.
                            </Heading>
                            <Text fontSize={"md"} opacity={0.95}>
                                VibNet brings your posts, conversations, and profile into one focused social experience.
                            </Text>
                            <Text fontSize={"sm"} opacity={0.85}>
                                Built for creators, friends, and communities who want a modern and distraction-free network.
                            </Text>
                        </VStack>
                    </Box>

                    {/* Right hand-side */}
                    <VStack spacing={4} align={"stretch"} w={{ base: "full", md: "430px" }}>
                        <AuthForm />
                        <Box textAlign={"center"} color={'whiteAlpha.800'} fontWeight={500}>
                            Download VibNet on your device.
                        </Box>
                        <Flex gap={5} justifyContent={"center"}>
                            <Image src='/playstore.png' h={"10"} alt='Playstore logo' />
                            <Image src='/microsoft.png' h={"10"} alt='Microsoft logo' />
                        </Flex>
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    );
};

export default AuthPage;