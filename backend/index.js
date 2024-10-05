const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const productData = require("./products.json")
const categoryData = require("./categories.json")


app.get("/api/products", (req, res) => {
    res.json(productData)
});

app.get("/categories", (req, res) => {
    res.json(categoryData)
});

app.get("/categories/:categoryName", (req, res) => {
    const categoryName = req.params.categoryName;  // Behåll som sträng

    // Filtrera produkter som innehåller den angivna kategorin baserat på namn
    const filteredProducts = productData.filter(product =>
        product.categories.some(category => category.name === categoryName)
    );

    if (filteredProducts.length === 0) {
        return res.status(404).json({ error: "Inga produkter hittades för denna kategori." });
    }

    res.json(filteredProducts);
});


app.listen(3001, () => {
    console.log('Server started on port 3001');
});
