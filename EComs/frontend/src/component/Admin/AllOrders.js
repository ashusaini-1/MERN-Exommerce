import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import "./ProductList.css";

import { Box, Thead, Table, Tbody, Tr, Td, Th, Button } from "@chakra-ui/react";
import SidePanel from "./Sidebar";
import { getAllOrders } from "../../actions/orderAction";

const AllOrders = () => {
  // const { keyword } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, orders } =
    useSelector((state) => state.allOrders);

 console.log(orders);
  let count = 100;
  useEffect(() => {
    dispatch(getAllOrders());
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
            Order List
          </h1>
          <Table variant="simple" bg="white" borderRadius="md">
            <Thead>
              <Tr>
                <Th>Order Id</Th>
                <Th>Status</Th>
                <Th>Order Status</Th>
                <Th>CreatedAt</Th>
            
              </Tr>
            </Thead>
            <Tbody>
              {orders &&
                orders.map((order) => (
                  <Tr key={order.id}>
                    <Td>{order._id}</Td>
                    <Td>{order.paymentInfo.status}</Td>
                    <Td>{order.orderStatus}</Td>
                    <Td>{new Date(order.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</Td>
                    <button
  style={{
    padding: "0.75rem 1.5rem",
    margin: "0 0.5rem", // Add margin for horizontal spacing
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "0.25rem",
    background: "linear-gradient(to right, #4a90e2, #845ef7)",
    color: "#fff",
    border: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    transition: "background-color 0.3s",
  }}
>
  Update
</button>
<button
  style={{
    padding: "0.75rem 1.5rem",
    margin: "0 0.5rem", // Add margin for horizontal spacing
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "0.25rem",
    background: "linear-gradient(to right, #4a90e2, #845ef7)",
    color: "#fff",
    border: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    transition: "background-color 0.3s",
  }}
>
  Delete
</button>

                   
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Fragment>
  );
};
export default AllOrders;
