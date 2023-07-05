import React, { useEffect, Fragment,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import "./Products.css"

const Products = () => {
    const { keyword } = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {
      products,
      loading,
      error,
      totalProducts,
      resultPerPage,
    } = useSelector((state) => state.products);
  
    let count= 100;
    useEffect(() => {
      dispatch(getProduct(keyword, currentPage));
    }, [keyword, currentPage]);
  
    const handlePageChange = (currentPage) => {
      setCurrentPage(currentPage);
    };
  
    return (
      <Fragment>
        <MetaData title="PRODUCTS -- ECOMMERCE" />
        <h2 className="productsHeading">Products</h2>
        <div className="products">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
  
        {resultPerPage < totalProducts && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={totalProducts}
              onChange={handlePageChange}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </Fragment>
    );
  };
  export default Products;
