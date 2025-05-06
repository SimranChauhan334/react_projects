


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Subcategory from "./pages/subcategory";
import Product from './pages/Product';
import ProductDetail from "./pages/ProductDetail";
import Createuser from "./pages/createuser";
import Createcategory from "./pages/CreateCategory";
import Login from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/subcategory/:id" element={<Subcategory/>}/>
        <Route path="/product/:id/" element={<Product />} />
        <Route path="/product_detail/:id/" element={<ProductDetail />} /> 
        <Route path="/createuser/" element={<Createuser />} /> 
        <Route path="/createcategory/" element={<Createcategory />} /> 
        <Route path="/login/" element={<Login />} />

        
    
        

        
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

