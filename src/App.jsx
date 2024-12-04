import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Header from "./components/Header";

const App = () => {
    return (
        <Router>
            <Header /> {/* Шапка с навигацией */}
            <Routes>
                {/* Перенаправление с "/" на "/products" */}
                <Route path="/" element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
        </Router>
    );
};

export default App;