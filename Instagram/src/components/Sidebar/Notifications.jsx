import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/constants";

const Notifications = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Tooltip
                hasArrow
                label={"Notifications"}
                placement='right'
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
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
                    onClick={onOpen}
                    cursor={"pointer"}
                    transition='all 0.2s ease'
                    boxShadow='inset 0 1px 0 rgba(255,255,255,0.08)'
                >
                    <NotificationsLogo />
                    <Box display={{ base: "none", md: "block" }} fontWeight={500}>Notifications</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                    <ModalHeader>Notifications</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text color={"gray.400"}>No notifications yet.</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Notifications;