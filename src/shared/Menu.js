import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { MenuUtils } from "./MenuUtils";

export function Menu() {
  const { showMenu, setShowMenu, categories } = MenuUtils();

  return (
    <div className={`navigation ${showMenu && 'menuOpened'}`}>
      {/* Home Länk */}
      <Link 
        to="/" 
        onClick={() => setShowMenu(!showMenu)}
      >
        Startsida
      </Link>
      {/* Kategori Länkar */}
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/categories/${category.name}`}
          onClick={() => setShowMenu(!showMenu)}
        >
          {category.name}
        </Link>
      ))}

      {/* Skifta ikoner */}
      <div onClick={() => setShowMenu(!showMenu)}>
        {showMenu
          ? <CloseIcon className='closeIcon' /> 
          : <MenuIcon className='hamburgerIcon' />
        }
      </div>
    </div>
  );
}
