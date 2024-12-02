import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/api/categories", { name: categoryName });
        setCategoryName("");
        fetchCategories();
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/categories/${id}`);
        fetchCategories();
    };

    return (
        <div>
            <h1>Categories</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <button type="submit">Add Category</button>
            </form>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}{" "}
                        <button onClick={() => handleDelete(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;