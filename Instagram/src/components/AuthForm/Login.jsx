import { Alert, AlertIcon, Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [isSendingReset, setIsSendingReset] = useState(false);
    const { loading, error, login } = useLogin();
    const showToast = useShowToast();

    const handlePasswordReset = async () => {
        const normalizedEmail = inputs.email.trim().toLowerCase();

        if (!normalizedEmail) {
            showToast("Info", "Enter your email first, then click Forgot password.", "info");
            return;
        }

        try {
            setIsSendingReset(true);
            await sendPasswordResetEmail(auth, normalizedEmail);
            showToast("Success", "Password reset email sent. Check your inbox and spam folder.", "success");
        } catch (resetError) {
            const code = resetError?.code;
            const message =
                code === "auth/user-not-found"
                    ? "No account found for this email."
                    : "Unable to send password reset right now. Please try again.";

            showToast("Error", message, "error");
        } finally {
            setIsSendingReset(false);
        }
    };

    return (
        <>
            <Flex justifyContent='flex-end' w='full'>
                <Button
                    variant='link'
                    size='sm'
                    color='blue.300'
                    onClick={handlePasswordReset}
                    isLoading={isSendingReset}
                >
                    Forgot password?
                </Button>
            </Flex>
            <Input
                placeholder='Email'
                fontSize={14}
                type='email'
                size={"sm"}
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <Input
                placeholder='Password'
                fontSize={14}
                size={"sm"}
                type='password'
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
            {error && (
                <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    {error}
                </Alert>
            )}
            <Button
                w={"full"}
                colorScheme='blue'
                size={"sm"}
                fontSize={14}
                isLoading={loading}
                onClick={() => login(inputs)}
            >
                Log in
            </Button>
        </>
    );
};

export default Login;