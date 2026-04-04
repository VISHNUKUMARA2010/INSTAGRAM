import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <Box
                border={"1px solid"}
                borderColor={'whiteAlpha.300'}
                borderRadius={12}
                padding={6}
                bg={'rgba(6, 14, 29, 0.72)'}
                boxShadow={'xl'}
                backdropFilter={'blur(8px)'}
            >
                <VStack spacing={4}>
                    <Image src='/logo.svg' h={14} cursor={"pointer"} alt='VibNet' />

                    {isLogin ? <Login /> : <Signup />}

                    {/* ---------------- OR ---------------- */}
                    <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                        <Text mx={1} color={"white"}>
                            OR
                        </Text>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                    </Flex>

                    <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
                </VStack>
            </Box>

            <Box
                border={"1px solid"}
                borderColor={'whiteAlpha.300'}
                borderRadius={12}
                padding={5}
                bg={'rgba(6, 14, 29, 0.66)'}
                boxShadow={'lg'}
            >
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={14}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </Box>
                    <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                        {isLogin ? "Sign up" : "Log in"}
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default AuthForm;