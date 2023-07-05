import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const SidePanel = () => {


  return (
    <Sidebar style={{ height: "45rem", backgroundColor: "gray" }}>
      <Menu>
      <MenuItem>Admin</MenuItem>
          <MenuItem> <Link to="/admin/product">AddProduct</Link></MenuItem>
          <MenuItem> <Link to="/admin/product/list">ProductList</Link></MenuItem>
          <MenuItem> <Link to="/admin/users/list">UserList</Link></MenuItem>
          <MenuItem> <Link to="/admin/orders/list">OrderDetails</Link></MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidePanel;
