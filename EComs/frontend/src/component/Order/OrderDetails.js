import React, { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {getOrderDetails} from '../../actions/orderAction'
import {useParams} from "react-router-dom"
import { Box, Text } from "@chakra-ui/react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";

const OrderDetails = () => {
const {id}=useParams();
  const { orders, error, loading } = useSelector((state) => state.orderDetails);
console.log(orders);
  const dispatch = useDispatch();

useEffect(()=>{

 dispatch(getOrderDetails(id));

},[dispatch,id])


  return (
    <Fragment>
    <MetaData title="Order Details" />
    <Box className="orderDetailsPage">
      <Box className="orderDetailsContainer">
        {/* <Text as="h1">Order #{order && order._id}</Text> */}
        <Text>Shipping Info</Text>
        <Box className="orderDetailsContainerBox">
          <Box>
            <Text>Name:</Text>
            {/* <Text>{order.user && order.user.name}</Text> */}
          </Box>
          <Box>
            <Text>Phone:</Text>
            <Text>{orders.order.shippingInfo && orders.order.shippingInfo.phoneNo}</Text>
          </Box>
          <Box>
            <Text>Address:</Text>
            <Text>
              {orders.order.shippingInfo &&
                `${orders.order.shippingInfo.address}, ${orders.order.shippingInfo.city}, ${orders.order.shippingInfo.state}, ${orders.order.shippingInfo.pinCode}, ${orders.order.shippingInfo.country}`}
            </Text>
          </Box>
        </Box>
        <Text>Payment</Text>
        <Box className="orderDetailsContainerBox">
          <Box>
            <Text
              className={
                orders.order.paymentInfo &&
                orders.order.paymentInfo.status === "succeeded"
                  ? "greenColor"
                  : "redColor"
              }
            >
              {orders.order.paymentInfo &&
             orders.order.paymentInfo.status === "succeeded"
                ? "PAID"
                : "NOT PAID"}
            </Text>
          </Box>

          <Box>
            <Text>Amount:</Text>
            <Text>{orders.order.totalPrice && orders.order.totalPrice}</Text>
          </Box>
        </Box>

        <Text>Order Status</Text>
        <Box className="orderDetailsContainerBox">
          <Box>
            <Text
              className={
                orders.order.orderStatus && orders.order.orderStatus === "Delivered"
                  ? "greenColor"
                  : "redColor"
              }
            >
              {orders.order.orderStatus && orders.order.orderStatus}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box className="orderDetailsCartItems">
        <Text>Order Items:</Text>
        <Box className="orderDetailsCartItemsContainer">
          {orders.order.orderItems &&
            orders.order.orderItems.map((item) => (
              <Box key={item.product}>
                <img src={item.image} alt="Product" />
                <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                <Text>
                  {item.quantity} X ₹{item.price} ={" "}
                  <b>₹{item.price * item.quantity}</b>
                </Text>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  </Fragment>
  );
};

export default OrderDetails;
