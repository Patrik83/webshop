const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const productData = require("./data/products.json")


app.get("/api/products", (req, res) => {
    res.json(productData)
});

app.get("/api/products/:productId", (req, res) => {
    const productId = parseInt(req.params.productId, 10);

    // Find the product with the specified productId
    const product = productData.find(product => product.id === productId);

    if (!product) {
        return res.status(404).json({ error: "Inga produkter hittades." });
    }

    res.json(product);
});

// Hämta alla unika kategorier direkt från produkterna
app.get("/categories", (req, res) => {
    const categories = [];

    productData.forEach(product => {
        product.categories.forEach(category => {
            if (!categories.some(cat => cat.id === category.id)) {
                categories.push(category);  // Lägg till om kategorin inte redan finns
            }
        });
    });

    res.json(categories);  // Skicka unika kategorier som svar
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
