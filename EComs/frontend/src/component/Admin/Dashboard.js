import React, { useEffect } from "react";
import 'chart.js/auto';
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import SidePanel from "./Sidebar";
import { Doughnut,Line } from "react-chartjs-2";
import MetaData from "../layout/MetaData";
const Dashboard = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

   const { orders } = useSelector((state) => state.allOrders);

  // const { users } = useSelector((state) => state.allUsers);

  console.log(orders);
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
     dispatch(getAdminProduct());
     dispatch(getAllOrders());
    // dispatch(getAllUsers());
  }, [dispatch]);


  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });


  return (
    <div>
 <MetaData title="Dashboard - Admin Panel" />
      <SidePanel />
    </div>
  )
}

export default Dashboard