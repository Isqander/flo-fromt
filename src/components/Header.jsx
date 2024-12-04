import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Admin Panel
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/products">
                        Products
                    </Button>
                    <Button color="inherit" component={Link} to="/categories">
                        Categories
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;