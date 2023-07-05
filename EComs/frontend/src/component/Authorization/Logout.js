import React,{useEffect} from "react"
import { Button, Container, Text, VStack } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useSelector, useDispatch } from "react-redux"; 
import { logout } from "../../actions/userAction";
import { Link } from "react-router-dom";
const Logout = () => {
    const dispatch=useDispatch();
const {loading,error,user}=useSelector((state)=>state.user)
const handleLogout=()=>{
    dispatch(logout());
}

  return (
    <Container maxW="md" centerContent>
      <VStack spacing={4} mt={8}>
        <FiLogOut size={48} color="#1877F2" />
        <Text fontSize="xl" fontWeight="bold">
          You have successfully logged out!
        </Text>
        <Button colorScheme="blue" onClick={handleLogout}>
        <Link to='/account'> Log In Again</Link>
         
        </Button>
      </VStack>
    </Container>
  );
};

export default Logout;
