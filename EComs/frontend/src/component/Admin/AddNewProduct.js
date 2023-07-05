import React, { useEffect, useState } from "react";
import { createProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Input,
  Textarea,
  Select,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import SidePanel from "./Sidebar";

const NewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const { error, product } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const AddnewProduct = async (e) => {
    e.preventDefault();

    try {
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("Stock", Stock);

      images.forEach((image) => {
        myForm.append("images", image);
      });
      await dispatch(createProduct(myForm));

      toast({
        title: "Product Added SuccessFull",
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

  // useEffect(()=>{

  // },[dispatch,id]);
  return (
    <Box display="flex">
      <SidePanel />

      <Box
        ml={4}
        flex="1"
        backgroundColor="#f5f5f5"
        padding="20px"
        borderRadius="8px"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width="100%"
          maxWidth="600px"
          bg="white"
          borderRadius="8px"
          padding="20px"
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={AddnewProduct}
          >
            <h1>Add Product</h1>

            <FormControl mb={4}>
              <FormLabel>Product Name</FormLabel>
              <Input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Product Description</FormLabel>
              <Textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Stock</FormLabel>
              <Input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </FormControl>

            <Button
              id="createProductBtn"
              type="submit"
              colorScheme="teal"
              variant="solid"
              mt={4}
            >
              Create
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default NewProduct;
