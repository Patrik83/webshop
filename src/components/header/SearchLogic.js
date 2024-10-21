import { useState, useEffect } from "react";
import { getProducts, getUniqueCategories } from "../../services/ProductService";

const SearchLogic = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsData = await getProducts();
        const uniqueCategories = await getUniqueCategories();
        setProducts(productsData);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.trim().toLowerCase();
    if (!searchValue) return setResults([]);

    const filteredProducts = selectedOption === "all"
      ? products
      : products.filter(product =>
          product.categories.some(category => category.name === selectedOption)
        );

    const searchResults = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchValue)
    );

    setResults(searchResults);
  };

  const handleCategoryChange = (event) => {
    setSelectedOption(event.target.value);
    document.querySelector(".searchinput").value = ""; // Rensa sökfältet
    setResults([]); // Återställ sökresultaten
  };

  const handleResultClick = () => {
    const searchInput = document.querySelector(".searchinput");
    searchInput.value = ""; // Rensa sökfältet
    searchInput.blur(); // Avmarkera inputfältet
  };

  return {
    selectedOption,
    results,
    categories,
    handleSearch,
    handleCategoryChange,
    handleResultClick,
  };
};

export default SearchLogic;
