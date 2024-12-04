import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        categoryIds: [],
        price: "",
        status: "ACTIVE",
        photos: null,
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get("/api/products");
        setProducts(response.data);
    };

    const fetchCategories = async () => {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photos: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "photos") {
                Array.from(formData.photos || []).forEach((file) =>
                    data.append("photos", file)
                );
            } else {
                data.append(key, formData[key]);
            }
        });
        await axios.post("/api/products", data);
        fetchProducts();
    };

    return (
        <div>
            <h1>Products</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleInputChange} />
                <input name="description" placeholder="Description" onChange={handleInputChange} />
                <select
                    name="categoryIds"
                    multiple
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            categoryIds: Array.from(e.target.selectedOptions).map((o) => o.value),
                        })
                    }
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <input name="price" placeholder="Price" onChange={handleInputChange} />
                <select name="status" onChange={handleInputChange}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>
                <input type="file" multiple onChange={handleFileChange} />
                <button type="submit">Create Product</button>
            </form>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Photos</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.status}</td>
                        <td>
                            {product.photos && product.photos.length > 0 ? (
                                product.photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={`Product ${product.name}`}
                                        style={{ width: "50px", height: "50px", marginRight: "5px" }}
                                    />
                                ))
                            ) : (
                                <span>No Photos</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;