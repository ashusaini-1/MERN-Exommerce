import React, { useState } from "react";
import { Box, Image, VStack, Flex, Text, Icon, HStack } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Cursor from "../../images/cursor.png";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleImageClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box bg="gray.200" py={2}>
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={4}
      >
        <Link mx={4} to="/">
          <Text fontSize="lg" fontWeight="bold">
            Ecommerce
          </Text>
        </Link>
        <div className="flex-container">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/products" className="link">
            Products
          </Link>
          <Link to="/contact" className="link">
            Contact
          </Link>
          <Link to="/about" className="link">
            About
          </Link>
        </div>
        <HStack>
          <Link to="/search">
            <Icon as={FiSearch} boxSize={5} mx={5} />
          </Link>
         
          <Link to="/account">
            <Icon as={FaUserCircle} boxSize={5} mx={5} />
          </Link>

          <Menu>
            <MenuButton as={Button} colorScheme="gray">
              Profile
            </MenuButton>
            <MenuList>
              <MenuGroup title="Profile">
             
                <MenuItem><Link to="/order/me">MyOrder </Link></MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem>Docs</MenuItem>
                <MenuItem><Link to="/logout">Logout </Link></MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
