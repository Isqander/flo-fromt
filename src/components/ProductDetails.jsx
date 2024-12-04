import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "./ProductForm";
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
} from "@mui/material";

const ProductDetails = () => {
    const { id } = useParams(); // Получаем ID продукта из URL
    const navigate = useNavigate(); // Для перенаправления
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]); // Инициализация категорий
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        categoryIds: [],
        price: "",
        status: "ACTIVE",
        photos: [],
    });

    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/api/products/${id}`);
            setProduct(response.data);
            setFormData({
                name: response.data.name,
                description: response.data.description,
                categoryIds: response.data.categories.map((cat) => cat.id),
                price: response.data.price,
                status: response.data.status,
                photos: response.data.photos || [],
            });
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/products/${id}`, formData);
            fetchProduct();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/products/${id}`);
            navigate("/products");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
                {product.name}
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        <strong>Description:</strong> {product.description}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        <strong>Price:</strong> ${product.price}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        <strong>Status:</strong> {product.status}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        <strong>Categories:</strong>{" "}
                        {product.categories.map((cat) => cat.name).join(", ")}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}
                        sx={{ marginTop: 2 }}
                    >
                        Delete Product
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                        Photos
                    </Typography>
                    <Grid container spacing={2}>
                        {product.photos.map((photo, index) => (
                            <Grid item xs={6} key={index}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        image={photo}
                                        alt={`Product ${product.name}`}
                                        sx={{ height: "150px" }}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            {/* Update Form */}
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5">Update Product</Typography>
                <ProductForm
                    formData={formData}
                    setFormData={setFormData}
                    categories={categories} // Передаём категории в форму
                    onSubmit={handleUpdate}
                    submitButtonLabel="Update Product"
                />
            </Box>
        </Box>
    );
};

export default ProductDetails;