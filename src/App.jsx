import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./components/Products";
import Categories from "./components/Categories";

const App = () => {
    return (
        <Router>
            <div style={{ padding: "20px" }}>
                <nav>
                    <Link to="/products" style={{ marginRight: "10px" }}>Products</Link>
                    <Link to="/categories">Categories</Link>
                </nav>
                <Routes>
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;