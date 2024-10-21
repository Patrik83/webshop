import React, { useContext} from "react";
import { Link } from 'react-router-dom';
import { CartContext } from "../../context/CartManager";
import { Menu } from "../header/Menu";
import Search from "../header/Search";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Badge from '@mui/material/Badge';
import style from "../../styles/layouts/Header.module.css";

export default function Header() {
  const { cartItemCount } = useContext(CartContext);

  return (
    <div className={style.container}>
      <div className={style.menu}>
        <Menu />
      </div>
      <div className={style.cart}>
        <Link to="/cart">
          <Badge badgeContent={cartItemCount()} color="primary">
            <ShoppingCartIcon fontSize="large" color="action" />
            {/* <ShoppingBagIcon fontSize="large" color="action" /> */}
          </Badge>
        </Link>
      </div>
      <div className={style.search}>
        <Search />
      </div>
    </div>
  )
}
