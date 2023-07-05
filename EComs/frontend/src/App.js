import "./App.css";
// import Login from './component/Authorization/Login';
import Navbar from "./component/Header/NavBar";
import Home from "./component/Home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ProductDetails from "./component/product/ProductDetails";
import AuthPage from "./component/Authorization/AuthPage";
import Products from "./component/product/Products";
import Search from "./component/product/Search";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import Dashboard from "./component/Admin/Dashboard";
import UpdateProduct from "./component/Admin/UpdateProduct";
import NewProduct from "./component/Admin/AddNewProduct"
import ProductList from "./component/Admin/ProductList";
import UserList from "./component/Admin/UserList";
import ForgotPassword from "./component/Authorization/ForgotPassword";
import AllOrders from "./component/Admin/AllOrders";
import Cart from "./component/Cart/Cart";
// import ProductTable from "./component/Admin/ProductList"
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails";
import Logout from "./component/Authorization/Logout";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith("/admin");

 
  return (
    <>
      {!isAdminDashboard && <Navbar />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/account" element={<AuthPage />} />
        <Route exact path="/logout" element={<Logout/>} />
        <Route exact path="/user/password/forgot" element={<ForgotPassword/>}/>
        <Route exact path="/cart" element={<Cart/>} />
       
        
        <Route exact path="/order/me" element={<MyOrders/>}/>
        <Route exact path="/order/:id" element={<OrderDetails/>}/>

        {/* <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} /> */}
        {isAdminDashboard && (
          <>
          <Route exact path="/admin/dashboard" element={<Dashboard/>} />
          <Route exact path="/admin/product/:id" element={<UpdateProduct/>}/>
          <Route exact path="/admin/product" element={<NewProduct/>}/>
          <Route exact path="/admin/product/list" element={<ProductList/>}/>
          <Route exact path="/admin/users/list" element={<UserList/>}/>
          <Route exact path="/admin/orders/list" element={<AllOrders/>}/>
       
        </>
        )}
      </Routes>
    </>
  );
};

export default App;
