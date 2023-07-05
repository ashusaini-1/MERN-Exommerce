const Order = require("../models/orderModel");
const Product = require("../models/productModel");
 const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});


exports.getSingleOrder=async(req,res)=>{
const order=await Order.findById(req.params.id).populate("user","email name");
if(!order){
  res.send("Order not found with this ID");
}

res.status(200).json({
  success: true,
  order,
});
};

exports.myOrders =async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
};

exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};


// const updateOrder=async(req,res)=>{

//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     res.send("Order not found with this Id");
//   }

//   if (order.orderStatus === "Delivered") {
//   res.semd("You have already delivered this order");
//   }

//   if (req.body.status === "Shipped") {
//     order.orderItems.forEach(async (o) => {
//       await updateStock(o.product, o.quantity);
//     });
//   }
//   order.orderStatus = req.body.status;

//   if (req.body.status === "Delivered") {
//     order.deliveredAt = Date.now();
//   }

//   await order.save({ validateBeforeSave: false });
//   res.status(200).json({
//     success: true,
//   });
// };


// async function updateStock(id, quantity) {
//   const product = await Product.findById(id);

//   product.Stock -= quantity;

//   await product.save({ validateBeforeSave: false });
// }

// const deleteOrder =async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//   res.send("Order not found with this Id");
//   }

//   await order.remove();

//   res.status(200).json({
//     success: true,
//   });
// };




