import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { forgotPassword } from "../../actions/userAction";

function ForgotPassword() {
  const dispatch = useDispatch();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please Fill the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const myForm = new FormData();
      myForm.set("email", email);

     await dispatch(forgotPassword(myForm));

      toast({
        title: message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occurred!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="8"
      bg="white"
      boxShadow="lg"
      p="6"
      borderRadius="md"
    >
      <Heading mb="4" textAlign="center" color="facebook.500">
        Password Forgot
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            size="lg"
          />
        </FormControl>
        <Button type="submit" colorScheme="facebook" width="full" size="lg">
          Press
        </Button>
      </form>
      <Button
        variant="link"
        colorScheme="blue"
        width="full"
        mt="2"
        textAlign="center"
      >
        Back to Log In
      </Button>
    </Box>
  );
}

export default ForgotPassword;
