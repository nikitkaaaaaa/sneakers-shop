import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Header from "./componets/header/Header";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Footer from "./componets/footer/Footer";
import ProductsBrand from "./pages/ProductsBrand";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/:category" element={<Products />}></Route>
          <Route path="/product/:category/:id" element={<Product />}></Route>
          <Route path="/product/:brand" element={<ProductsBrand />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
