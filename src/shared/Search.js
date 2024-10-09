import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import styles from "../styles/Search.module.css";
import { getProducts, getUniqueCategories } from "../services/ProductService";

const Search = () => { /* TODO - Separera logiken från ui koden */
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsData = await getProducts(); 
        setProducts(productsData);
        
        // Hämta unika kategorier
        const uniqueCategories = await getUniqueCategories();
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  // Funktion för att hantera sökningar
  const handleSearch = useCallback((event) => {
    const searchValue = event.target.value.trim().toLowerCase();
    setInputValue(searchValue);
    
    // Är sökfältet tomt, retunera tom array
    if (searchValue === '') {
      setResults([]);
      return;
    }

    // Ifall inget kategorival gjorts -> sök i alla kategorier, annars sök i vald kategori
    if (products && products.length > 0) {
      const filteredProducts = selectedOption === 'all' 
        ? products 
        : products.filter(product => product.categories.some(category => category.name === selectedOption));

      const searchResults = filteredProducts.filter(item =>
        item.name.toLowerCase().includes(searchValue)
      );
      setResults(searchResults);
    }
  }, [products, selectedOption]);

  // Funktion för att hantera kategorival
  const handleChange = (event) => {
    const category = event.target.value;
    setSelectedOption(category);
    console.log("Option selected:", category);

    // Rensa sökfält och sökresultat vid nytt kategorival
    setInputValue('');
    setResults([]);
  };

  // Funktion för att hantera klick på sökresultat
  const handleClick = () => {
    setInputValue('');
    document.activeElement.blur();
  };

  if (loading) {
    return <div>Laddar...</div>;
  }

  return (
    <div className={styles.searchWrapper}>
      {/* Sökfält */}
      <input
        className={styles.searchinput}
        type="text"
        placeholder="&#x1f50e; Sök..."
        value={inputValue}
        onChange={handleSearch}
      />
      {/* Kategoriväljare */}
      <select 
        className={styles.searchDropdown}
        value={selectedOption} 
        onChange={handleChange}
      >
        {/* Visar alla kategorier */}
        <option value="all">Alla</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>{category.name}</option>
        ))}
      </select>

      {/* Visa sökresultat om det finns */}
      {results.length > 0 && (
        <div className={styles.resultsContainer}>
          <ul className={styles.resultsList}>
            {results.map((result) => (
              <li key={result.id}>
                <SearchIcon fontSize="small"/>
                <Link to={`/product/${result.id}`} onClick={handleClick}>
                  {result.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
