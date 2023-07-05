import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import "./ProductList.css";

import { Box, Thead, Table, Tbody, Tr, Td, Th, Button } from "@chakra-ui/react";
import SidePanel from "./Sidebar";
import { Link } from "react-router-dom";

const ProductList = () => {
  // const { keyword } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, error } = useSelector((state) => state.products);

  let count = 100;
  useEffect(() => {
    dispatch(getProduct());
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
            Product List
          </h1>
          <Table variant="simple" bg="white" borderRadius="md">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Category</Th>
                <Th>Stock</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products &&
                products.map((product) => (
                  <Tr key={product._id}>
                    <Td>{product.name}</Td>
                    <Td>{product.description}</Td>
                    <Td>{product.price}</Td>
                    <Td>{product.category}</Td>
                    <Td>{product.Stock}</Td>
                    <Td>
                    <Link
  to={{
    pathname: `/admin/product/${product._id}`,
    state: {
      product: {
        names: product.name,
        descriptions: product.description,
        stocks: product.Stock
      }
    }
  }}
>
                        <button
                          style={{
                            padding: "0.75rem 1.5rem",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            borderRadius: "0.25rem",
                            background:
                              "linear-gradient(to right, #4a90e2, #845ef7)",
                            color: "#fff",
                            border: "none",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                          }}
                        >
                          Update
                        </button>
                      </Link>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Fragment>
  );
};
export default ProductList;
