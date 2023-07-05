import React, { useEffect, useState } from "react";
import { updateProduct, deleteProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import { useLocation } from "react-router-dom";
import { getProductDetails } from "../../actions/productAction";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, isDeleted, isUpdated, error } = useSelector(
    (state) => state.product
  );
  const { product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (product && product.products) {
      const { name, price, description, category } = product.products;
      setName(name);
      setPrice(price);
      setDescription(description);
      setCategory(category);
    }
  }, [product]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const handleUpdateProduct = async (e) => {
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
      await dispatch(updateProduct(id, myForm));

      toast({
        title: "Updated Successful",
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
  console.log(deleteProduct(id))

  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    await dispatch(deleteProduct(id));

    toast({
      title: "Deleted Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    navigate("/admin/product/list");
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

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
            onSubmit={handleUpdateProduct}
          >
            <h1>Update Product</h1>

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
              id="updateProductBtn"
              type="submit"
              colorScheme="teal"
              variant="solid"
              mt={4}
              onClick={handleUpdateProduct}
            >
              Update
            </Button>
            <Button
              id="deleteProductBtn"
              type="button"
              colorScheme="teal"
              variant="solid"
              mt={4}
              onClick={handleDeleteProduct}
            >
              Delete
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateProduct;
