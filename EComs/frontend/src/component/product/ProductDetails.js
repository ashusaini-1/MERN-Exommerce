import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";
import "./productDetails.css";
import { useToast } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard.js";

import { clearErrors, newReview } from "../../actions/productAction";
import Rating from "react-rating";
import {
  Box,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  ModalFooter,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import CustomModal from "./CustomModal";

const ProductDetails = () => {
  const toast = useToast();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const addToCartHandler = (e) => {
    e.preventDefault();

    dispatch(addItemsToCart(id, quantity));
    toast({
      title: "Login Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  // const submitReviewToggle = () => {
  //   open ? setOpen(false) : setOpen(true);
  // };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
  };

  useEffect(() => {
    // if (reviewError) {
    //   // alert.error(reviewError);
    //   dispatch(clearErrors());
    // }

    if (success) {
      // alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      <div className="ProductDetails">
        {product && product.products ? (
          <>
            <MetaData title={`${product.products.name}`} />
            <div>
              <img
                className="productImage"
                src={product.products.images[0].url}
                alt={product.products.name}
              />
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.products.name}</h2>
                <p>Product # {product.products._id}</p>
              </div>
              <div className="detailsBlock-2">
                {/* <Rating {...options} /> */}
                <span className="detailsBlock-2-span">
                  ({product.products.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.products.price}`}</h1>
                <p>
                  Status:
                  <b
                    className={
                      product.products.Stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {product.products.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{product.products.description}</p>
              </div>
              {/* onClick={submitReviewToggle} */}
              <button className="submitReview">Submit Review</button>
            </div>
                     
         
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Fragment>
  );
};

export default ProductDetails;
