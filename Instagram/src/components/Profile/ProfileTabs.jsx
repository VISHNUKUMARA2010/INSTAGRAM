import { Box, Flex, Text } from "@chakra-ui/react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";

const ProfileTabs = ({ activeTab, onTabChange }) => {
    return (
        <Flex
            w={"full"}
            justifyContent={"center"}
            gap={{ base: 4, sm: 10 }}
            textTransform={"uppercase"}
            fontWeight={"bold"}
        >
            <Flex
                borderTop={activeTab === "posts" ? "1px solid white" : "1px solid transparent"}
                alignItems={"center"}
                p='3'
                gap={1}
                cursor={"pointer"}
                onClick={() => onTabChange("posts")}
            >
                <Box fontSize={20}>
                    <BsGrid3X3 />
                </Box>
                <Text fontSize={12} display={{ base: "none", sm: "block" }}>
                    Posts
                </Text>
            </Flex>

            <Flex
                borderTop={activeTab === "saved" ? "1px solid white" : "1px solid transparent"}
                alignItems={"center"}
                p='3'
                gap={1}
                cursor={"pointer"}
                onClick={() => onTabChange("saved")}
            >
                <Box fontSize={20}>
                    <BsBookmark />
                </Box>
                <Text fontSize={12} display={{ base: "none", sm: "block" }}>
                    Saved
                </Text>
            </Flex>

            <Flex
                borderTop={activeTab === "likes" ? "1px solid white" : "1px solid transparent"}
                alignItems={"center"}
                p='3'
                gap={1}
                cursor={"pointer"}
                onClick={() => onTabChange("likes")}
            >
                <Box fontSize={20}>
                    <BsSuitHeart fontWeight={"bold"} />
                </Box>
                <Text fontSize={12} display={{ base: "none", sm: "block" }}>
                    Likes
                </Text>
            </Flex>
        </Flex>
    );
};

export default ProfileTabs;