import { Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { VibNetLogo, VibNetMobileLogo } from "../../assets/constants";

import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
    const { handleLogout, isLoggingOut } = useLogout();
    return (
        <Box
            height={{ base: "100vh", md: "calc(100vh - 32px)" }}
            position={{ base: "sticky", md: "fixed" }}
            top={{ base: 0, md: "16px" }}
            left={{ base: 0, md: "16px" }}
            w={{ base: "70px", md: "250px" }}
            border='1px solid'
            borderRight={"1px solid"}
            borderColor={"rgba(165, 226, 255, 0.2)"}
            bg='linear-gradient(180deg, rgba(11, 24, 49, 0.82), rgba(5, 12, 24, 0.68))'
            backdropFilter='blur(14px)'
            boxShadow='inset 0 1px 0 rgba(255,255,255,0.12), inset -1px 0 0 rgba(255,255,255,0.06), 16px 0 34px rgba(0,0,0,0.26), 0 0 20px rgba(98,215,255,0.08)'
            borderRadius={{ base: 0, md: 28 }}
            py={5}
            px={{ base: 2, md: 4 }}
            overflow='hidden'
            zIndex={10}
            _before={{
                content: '""',
                position: 'absolute',
                top: '-24%',
                left: '-30%',
                width: '180%',
                height: '44%',
                background: 'linear-gradient(120deg, rgba(255,255,255,0.16), rgba(255,255,255,0))',
                transform: 'rotate(-10deg)',
                pointerEvents: 'none',
            }}
        >
            <Flex direction={"column"} gap={6} w='full' height={"full"}>
                <Box px={2} pt={2}>
                    <Link to={"/"} as={RouterLink} display={{ base: "none", md: "block" }} cursor='pointer'>
                    <VibNetLogo />
                    </Link>
                </Box>
                <Link
                    to={"/"}
                    as={RouterLink}
                    p={2}
                    display={{ base: "block", md: "none" }}
                    borderRadius={6}
                    _hover={{
                        bg: "whiteAlpha.200",
                    }}
                    w={10}
                    cursor='pointer'
                >
                    <VibNetMobileLogo />
                </Link>
                <Flex
                    direction={"column"}
                    gap={2}
                    cursor={"pointer"}
                    bg='linear-gradient(180deg, rgba(18, 34, 66, 0.48), rgba(12, 24, 48, 0.3))'
                    border='1px solid'
                    borderColor='rgba(179, 229, 255, 0.24)'
                    borderRadius={18}
                    p={3}
                    boxShadow='inset 0 1px 0 rgba(255,255,255,0.1), 0 12px 24px rgba(0,0,0,0.2)'
                >
                    <SidebarItems />
                </Flex>

                {/* LOGOUT */}
                <Tooltip
                    hasArrow
                    label={"Logout"}
                    placement='right'
                    ml={1}
                    openDelay={500}
                    display={{ base: "block", md: "none" }}
                >
                    <Flex
                        onClick={handleLogout}
                        alignItems={"center"}
                        gap={4}
                        bg='rgba(255,255,255,0.04)'
                        _hover={{ bg: "rgba(98, 215, 255, 0.2)", transform: 'translateY(-1px)' }}
                        border='1px solid rgba(177, 228, 255, 0.16)'
                        _groupHover={{ borderColor: 'transparent' }}
                        borderRadius={16}
                        p={3}
                        w={{ base: 10, md: "full" }}
                        mt={"auto"}
                        justifyContent={{ base: "center", md: "flex-start" }}
                        transition='all 0.2s ease'
                        boxShadow='inset 0 1px 0 rgba(255,255,255,0.08)'
                    >
                        <BiLogOut size={25} />
                        <Button
                            display={{ base: "none", md: "block" }}
                            variant={"ghost"}
                            _hover={{ bg: "transparent" }}
                            isLoading={isLoggingOut}
                        >
                            Logout
                        </Button>
                    </Flex>
                </Tooltip>
            </Flex>
        </Box>
    );
};

export default Sidebar;