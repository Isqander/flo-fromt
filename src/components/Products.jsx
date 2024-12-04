import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import ProductForm from "./ProductForm";

const Products = () => {
    const [products, setProducts] = useState([]); // Список продуктов
    const [categories, setCategories] = useState([]); // Список категорий
    const [openDialog, setOpenDialog] = useState(false); // Открытие/закрытие диалога
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        categoryIds: [],
        price: "",
        status: "ACTIVE",
        photos: null,
    }); // Данные формы

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
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

    const handleSubmit = async () => {
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
        try {
            await axios.post("/api/products", data);
            setOpenDialog(false);
            fetchProducts(); // Обновление списка продуктов
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
                Manage Products
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
            >
                Add Product
            </Button>

            {/* Product Grid */}
            <Grid container spacing={4} sx={{ marginTop: 2 }}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={
                                    product.photos && product.photos.length > 0
                                        ? product.photos[0]
                                        : "/no-image.jpg"
                                }
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="body1" sx={{ marginTop: 1 }}>
                                    Price: ${product.price}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Status: {product.status}
                                </Typography>
                            </CardContent>
                            <Button
                                variant="outlined"
                                color="primary"
                                component={Link}
                                to={`/products/${product.id}`}
                                sx={{ margin: 2 }}
                            >
                                View Details
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add Product Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <ProductForm
                        formData={formData}
                        setFormData={setFormData}
                        categories={categories} // Передаём категории
                        onSubmit={handleSubmit} // Обработка отправки формы
                        submitButtonLabel="Add Product"
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Products;