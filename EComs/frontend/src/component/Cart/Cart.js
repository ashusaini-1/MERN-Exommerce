import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { addItemsToCart } from '../../actions/cartAction';
import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';



const Cart = () => {
  const dispatch=useDispatch();
  const {cartItems}=useSelector((state)=>state.cart);
  console.log(cartItems.product.name);
  // useEffect(()=>{
  //   dispatch(addItemsToCart(selectedProductId))
  // })
  return ( 
    <Flex alignItems="center" borderBottom="1px solid #ccc" py={4}>
      <Box flex="1">
        <Image src={cartItems.image} alt={cartItems.name} maxW="80px" maxH="80px" objectFit="cover" />
      </Box>
      <VStack flex="2" spacing={1} align="start" ml={4}>
        <Text fontWeight="bold">{cartItems.name}</Text>
        <Text color="gray.500">Price: ${cartItems.price}</Text>
        <Text color="gray.500">Quantity: {cartItems.quantity}</Text>
        <Text color="gray.500">Stock: {cartItems.Stock}</Text>
      </VStack>
    </Flex>
  )
}

export default Cart