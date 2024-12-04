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
    DialogActions,
    TextField,
    MenuItem,
} from "@mui/material";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
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
        await axios.post("/api/products", data);
        setOpenDialog(false);
        fetchProducts();
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
                                image={product.photos && product.photos.length > 0 ? product.photos[0] : "/no-image.jpg"}
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
                                variant="contained"
                                color="secondary"
                                onClick={() => axios.delete(`/api/products/${product.id}`).then(fetchProducts)}
                                sx={{ margin: 2 }}
                            >
                                Delete
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add Product Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        name="name"
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        name="description"
                        onChange={handleInputChange}
                    />
                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="Categories"
                        name="categoryIds"
                        SelectProps={{
                            multiple: true,
                            value: formData.categoryIds,
                            onChange: (e) =>
                                setFormData({
                                    ...formData,
                                    categoryIds: Array.from(e.target.selectedOptions).map(
                                        (option) => option.value
                                    ),
                                }),
                        }}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Price"
                        name="price"
                        type="number"
                        onChange={handleInputChange}
                    />
                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                        <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                    </TextField>
                    <Button variant="contained" component="label">
                        Upload Photos
                        <input type="file" hidden multiple onChange={handleFileChange} />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Products;