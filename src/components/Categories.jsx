import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
                Manage Categories
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => alert("Add Category functionality here")}
                sx={{ marginBottom: 4 }}
            >
                Add Category
            </Button>
            <List>
                {categories.map((category) => (
                    <ListItem key={category.id}>
                        <ListItemText primary={category.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Categories;
