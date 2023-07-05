import { Box, Input, Heading, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword, register } from "../../actions/userAction";
import { useToast } from "@chakra-ui/react";
import { login } from "../../actions/userAction";
import {Link} from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { error, loading } = useSelector((state) => state.user);



  const registerSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
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
      myForm.set("password", password);

      dispatch(login(myForm));

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/");
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
    <Box maxW="400px" mx="auto" mt="8">
      <Heading mb="4" textAlign="center">
        Login
      </Heading>
      <form onSubmit={registerSubmit}>
        <FormControl mb="4">
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
       <Link to="/user/password/forgot"> <Button
        variant="link"
        colorScheme="blue"
        width="full"
        mt="4">
        Forgot Password
      </Button></Link>
        <Button type="submit" colorScheme="blue" width="full">
          Login
        </Button>
      </form>
    
    </Box>
  );
};

export default Login;
