const Product = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const cloudinary = require("cloudinary");

exports.createProduct = catchAsyncError(async (req, res) => {
  let product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

// exports.getAllProducts=catchAsyncError(async(req,res)=>{
//   const product=await Product.find();
//   res.status(200).json({
//    success:true,
//     product
//   })
// })
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const page = req.query.page || 1;
  const keyword = req.query.search || "";
  const filterOptions = req.query.filter || {};
  try {
    const query = {};

    // Add search functionality for the specific keyword
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } }, // Match product name (case-insensitive)
        { description: { $regex: keyword, $options: "i" } }, // Match product description (case-insensitive)
      ];
    }

    // Add filter functionality
    if (filterOptions.category) {
      query.category = filterOptions.category;
    }
    if (filterOptions.price) {
      query.price = filterOptions.price;
    }
    // Add more filter conditions as needed

    const products = await Product.find(query)
      .skip(resultPerPage * page - resultPerPage)
      .limit(resultPerPage);

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      products,
      totalProducts,
      resultPerPage,
      totalPages: Math.ceil(totalProducts / resultPerPage),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch the products.",
    });
  }
});

exports.getAdminProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const page = req.query.page || 1;
  const keyword = req.query.search || "";
  const filterOptions = req.query.filter || {};
  try {
    const query = {};

    // Add search functionality for the specific keyword
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } }, // Match product name (case-insensitive)
        { description: { $regex: keyword, $options: "i" } }, // Match product description (case-insensitive)
      ];
    }

    // Add filter functionality
    if (filterOptions.category) {
      query.category = filterOptions.category;
    }
    if (filterOptions.price) {
      query.price = filterOptions.price;
    }
    // Add more filter conditions as needed

    const products = await Product.find(query)
      .skip(resultPerPage * page - resultPerPage)
      .limit(resultPerPage);

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      products,
      totalProducts,
      resultPerPage,
      totalPages: Math.ceil(totalProducts / resultPerPage),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch the products.",
    });
  }
});

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const products = await Product.findById(req.params.id);

  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

exports.updateProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});


exports.deleteProduct = catchAsyncError(async (req, res,next) => {
 
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// const updateProduct = catchAsyncError(async (req, res, next) => {
//   let product = await Product.findById(req.params.id);

//  if (!product) {
//     return next(new ErrorHander("Product not found", 404));
//   }

//   // Images Start Here
//   let images = [];

//   if (typeof req.body.images === "string") {
//     images.push(req.body.images);
//   } else {
//     images = req.body.images;
//   }

//   if (images !== undefined) {
//     // Deleting Images From Cloudinary
//     for (let i = 0; i < product.images.length; i++) {
//       await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//     }

//     const imagesLinks = [];

//     for (let i = 0; i < images.length; i++) {
//       const result = await cloudinary.v2.uploader.upload(images[i], {
//         folder: "products",
//       });

//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }

//     req.body.images = imagesLinks;
//   }

//   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//     product,
//   });
// });

// const deleteProduct = catchAsyncError(async (req, res, next) => {
//   const product = await Product.findById(req.params.id);

//   if (!product) {
//     return next(new ErrorHander("Product not found", 404));
//   }

//   // Deleting Images From Cloudinary
//   for (let i = 0; i < product.images.length; i++) {
//     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//   }

//   await product.remove();

//   res.status(200).json({
//     success: true,
//     message: "Product Delete Successfully",
//   });
// });

// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
