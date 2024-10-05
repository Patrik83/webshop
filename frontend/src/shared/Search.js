import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import styles from "../styles/Search.module.css";
import useApi from "../hooks/useApi";    

const Search = () => {
  // State för sökord, vald kategori och sökresultat
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');
  const [results, setResults] = useState([]);

  // Customhook för att hämta alla kategorier
  const { data: categories, loaded: categoriesLoaded } = useApi('http://localhost:3001/categories');
  // Customhook för att hämta produkter baserat på vald kategori
  const { data: products, loaded: productsLoaded } = useApi(
    selectedOption === 'all' 
    ? 'http://localhost:3001/products' 
    : `http://localhost:3001/products/categories/${selectedOption}`
  );

    // Funktion för att hantera sökningar
    const handleSearch = useCallback((event) => {
      const searchValue = event.target.value.trim().toLowerCase();
        setInputValue(searchValue);
        // Är sökfältet tomt, retunera tom array
        if (searchValue === '') {
            setResults([]);
            return;
        }
        // Om produkten finns, filtrera och uppdatera setResults
        if (products) {
          const searchResults = products.filter(item =>
            item.name.toLowerCase().includes(searchValue));
            setResults(searchResults);
        }
    }, [products]);

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

    // Kontrollera om data är laddad
    if (!categoriesLoaded || !productsLoaded) {
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
