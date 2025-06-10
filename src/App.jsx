


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
import Navbar from "./components/Navbar";
import Subcategory from "./pages/subcategory";
import Product from './pages/Product';
import ProductDetail from "./pages/ProductDetail";
import Createuser from "./pages/createUser";
import Createcategory from "./pages/CreateCategory";
import Login from "./pages/Login";
import EditCategory from "./pages/EditCategory";
import Add_Subcategory from "./pages/Add_Subcategory";
import Add_Product from "./pages/Add_Product"
import Cart from "./pages/Add_to_cart";
import Buy_Now from "./pages/Buy_Now";
import Profile from "./pages/profile"
import Order from "./pages/Order";
import SearchProduct from "./pages/SearchProduct"
import EditProduct from "./pages/EditProduct";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/subcategory/:id" element={<Subcategory/>}/>
        <Route path="/product/:id/" element={<Product />} />
        <Route path="/product_detail/:id/" element={<ProductDetail />} /> 
        <Route path="/createuser/" element={<Createuser />} /> 
        <Route path="/createcategory/" element={<Createcategory />} /> 
        <Route path="/login/" element={<Login />} />   
        <Route path="/edit-category/:id" element={<EditCategory />} />  
        <Route path="/create-Sub-cat/:id" element={<Add_Subcategory />} />
        <Route path="/add-product/:id" element={<Add_Product />} />
        <Route path="/cart-details/" element={<Cart />} />
        <Route path="/buy-now/:productId" element={<Buy_Now />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/order-history/" element={<Order />} />
        <Route path="/search/" element={<SearchProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} /> 
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

