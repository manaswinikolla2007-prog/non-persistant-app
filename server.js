import express from "express";
const app = express();
// Middleware
app.use(express.json());
const products = [];
// Create a new product - POST http://localhost:5000/products Payload: { "id": 1, "name": "Laptop", "price": 50000 }
app.post("/products", (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json({
        message: "Product created successfully",
        data: newProduct
    }); 
});
// Read all products - GET http://localhost:5000/products
app.get("/products", (req, res) => {
    res.status(200).json({
        message: "All products fetched successfully",
        data: products
    });
});
// Read a product by ID - GET http://localhost:5000/products/:id
app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(
        (prod) => prod.id === productId
    );
    if (product) {
        res.status(200).json({
            message: "Product details fetched successfully",
            data: product
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});
// Update a product by ID - PUT http://localhost:5000/products/:id Payload: { "id": 1, "name": "Laptop", "price": 50000 }
app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = req.body;
    const productIndex = products.findIndex(
        (prod) => prod.id === productId
    );
    if (productIndex !== -1) {
        const updatedProduct = {
            ...products[productIndex],
            ...product
        };
        products[productIndex] = updatedProduct;
        res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});
// Delete a product by ID - DELETE http://localhost:5000/products/:id
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(
        (prod) => prod.id === productId
    );
    if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1)[0];
        res.status(200).json({
            message: "Product deleted successfully",
            data: deletedProduct
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});
// Start server
app.listen(5000, () => {
    console.log("Server running at http://localhost:5000/");
});