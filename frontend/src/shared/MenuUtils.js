import { useState, useEffect, useCallback } from "react";
import { getUniqueCategories } from "../services/ProductService";

export const MenuUtils = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const uniqueCategories = await getUniqueCategories();
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);  

  // Stänger menyn om man klickar utanför klassen .navigation
  const closeOpenMenus = useCallback((e) => {
    if (showMenu && !e.target.closest('.navigation')) {
      setShowMenu(false);
    }
  }, [showMenu, setShowMenu]);

  useEffect(() => {
    document.addEventListener('mousedown', closeOpenMenus);
    return () => {
      document.removeEventListener('mousedown', closeOpenMenus);
    };
  }, [closeOpenMenus]);

  return { showMenu, setShowMenu, categories };
};