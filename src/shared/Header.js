import React, { useContext} from "react";
import { Link } from 'react-router-dom';
import { Menu } from "./menu/Menu";
import { CartContext } from "../context/CartManager";
import Search from './Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import style from "../styles/layouts/Header.module.css";

export default function Header() {
  const { cartItemCount } = useContext(CartContext);

  return (
    <div className={style.container}>
      <div className={style.menu}>
        <Menu />
      </div>
      <div className={style.cart}>
        <Link to="/cart">
          <ShoppingCartIcon fontSize="large" color="action"/> ({cartItemCount()})
        </Link>
      </div>
      <div className={style.search}>
        <Search />
      </div>
    </div>
  )
}
