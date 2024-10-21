import React from "react";
import { Link } from "react-router-dom";
import { MenuLogic } from "./MenuLogic";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export function Menu() {
  const { showMenu, setShowMenu, categories } = MenuLogic();

  return (
    <div className={`navigation ${showMenu && "menuOpened"}`}>
      {/* Home Länk */}
      <Link to="/" onClick={() => setShowMenu(!showMenu)}>
        Startsida
      </Link>

      {/* Övriga kategorilänkar */}
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/categories/${category.name}`}
          onClick={() => setShowMenu(!showMenu)}
        >
          {category.name}
        </Link>
      ))}

      {/* Byt ikoner */}
      <div onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? (
          <CloseIcon className="closeIcon" />
        ) : (
          <MenuIcon className="hamburgerIcon" />
        )}
      </div>
    </div>
  );
}
