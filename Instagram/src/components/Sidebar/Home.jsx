import { Box, Link, Tooltip } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
    return (
        <Tooltip
            hasArrow
            label={"Home"}
            placement='right'
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
        >
            <Link
                display={"flex"}
                to={"/"}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                bg='rgba(255,255,255,0.04)'
                _hover={{
                    bg: "linear-gradient(180deg, rgba(98, 215, 255, 0.24), rgba(98, 215, 255, 0.12))",
                    borderColor: "rgba(165, 229, 255, 0.44)",
                    transform: 'translateX(2px)',
                }}
                border='1px solid rgba(176, 229, 255, 0.18)'
                borderRadius={14}
                p={3}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                transition='all 0.2s ease'
                boxShadow='inset 0 1px 0 rgba(255,255,255,0.08)'
            >
                <AiFillHome size={25} />
                <Box display={{ base: "none", md: "block" }} fontWeight={500}>Home</Box>
            </Link>
        </Tooltip>
    );
};

export default Home;