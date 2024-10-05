import { useState, useEffect, useCallback } from "react";
import useApi from '../hooks/useApi';

export const MenuUtils = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { data: categories, loaded } = useApi('http://localhost:3001/categories');

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

  return { showMenu, setShowMenu, categories, loaded };
};