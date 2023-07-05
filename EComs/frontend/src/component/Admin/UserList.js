import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";


import { Box, Thead, Table, Tbody, Tr, Td, Th, Button } from "@chakra-ui/react";
import SidePanel from "./Sidebar";
import { getAllUsers } from "../../actions/userAction";

const UserList = () => {
  // const { keyword } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error,users } =
    useSelector((state) => state.allUsers);


  // console.log(getAdminProduct())
  let count = 100;
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // const handlePageChange = (currentPage) => {
  //   setCurrentPage(currentPage);
  // };

  return (
    <Fragment>
      <MetaData title="PRODUCTS -- ECOMMERCE" />
      <Box display="flex">
        <SidePanel />

        <Box ml={4} flex="1">
          <h1
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              margin: "1rem 0",
              color: "#333",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              borderBottom: "2px solid #ccc",
              paddingBottom: "0.5rem",
            }}
          >
            Users List
          </h1>
          <Table variant="simple" bg="white" borderRadius="md">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                users.map((user) => (
                  <Tr key={user.id}>
                  <Td>{user._id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                   
                    
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Fragment>
  );
};
export default UserList;
