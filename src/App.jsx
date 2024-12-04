import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
        </Router>
    );
};

export default App;