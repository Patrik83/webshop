import React from "react";
import { Link } from "react-router-dom";
import SearchLogic from "./SearchLogic";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/Search.module.css";

const Search = () => {
  const {
    selectedOption,
    results,
    categories,
    handleSearch,
    handleCategoryChange,
    handleResultClick,
  } = SearchLogic();

  return (
    <div className={styles.searchWrapper}>
      {/* Sökfält */}
      <input
        className={`${styles.searchinput} searchinput`}
        type="text"
        placeholder="&#x1f50e; Sök..."
        onChange={handleSearch}
      />

      {/* Kategoriväljare */}
      <select
        className={styles.searchDropdown}
        value={selectedOption}
        onChange={handleCategoryChange}
      >
        <option value="all">Alla</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Visa sökresultat */}
      {results.length > 0 && (
        <div className={styles.resultsContainer}>
          <ul className={styles.resultsList}>
            {results.map((result) => (
              <li key={result.id}>
                <SearchIcon fontSize="small" />
                <Link to={`/product/${result.id}`} onClick={handleResultClick}>
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
