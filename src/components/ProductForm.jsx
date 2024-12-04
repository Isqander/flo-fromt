import React from "react";
import { TextField, MenuItem, Button } from "@mui/material";

const ProductForm = ({ formData, setFormData, categories, onSubmit, submitButtonLabel }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form>
            <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
            />
            <TextField
                select
                fullWidth
                margin="normal"
                label="Categories"
                name="categoryIds"
                value={formData.categoryIds}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        categoryIds: e.target.value,
                    })
                }
                SelectProps={{
                    multiple: true,
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
                value={formData.price}
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
            <Button
                variant="contained"
                color="primary"
                onClick={onSubmit}
                sx={{ marginTop: 2 }}
            >
                {submitButtonLabel}
            </Button>
        </form>
    );
};

export default ProductForm;
