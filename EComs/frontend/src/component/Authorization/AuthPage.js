import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import Login from './Login';
import SignUp from './SignUp';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box maxW="400px" mx="auto" mt="8">
      {isLogin ? <Login /> : <SignUp />}
      <Button colorScheme="blue" width="full" mt="4" onClick={handleSwitch}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </Button>
    </Box>
  );
};

export default AuthPage;
