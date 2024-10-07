import React, { useContext } from 'react';
import { CartContext } from "../../context/CartManager";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import style from "../../styles/CartPage.module.css";
import Image from '../../components/product/Image';

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext)
  // Beräknar totala antalet varor i kundvagnen
  const cartItemCount = cartItems.reduce((total, item) => total + item.amount, 0);

  return (  
    <main className={style.cartWrapper}>
      {/* MIDDLE BOX */}
      <div className={style.cartMiddleBox}>
      {/* Vid tom varukorg */}
      {cartItems.length === 0 && <h1>Varukorgen är tom</h1>}
      {/* Annars visa tillagda produkter */}
        {cartItems.map((item) => (
          <div className={style.cartItem} key={item.id}>
            <Image 
              imageUrl={item.Images[0].imageUrl} 
              altText={`Bild på ${item.name}`} 
            />
            <div className={style.itemDetails}>
              <div className={style.detailText}>
                <h2>{item.name}</h2>
                <p>{item.price}</p>
              </div>
              <div>
                <button className={style.btn} onClick={() => addToCart(item)}>
                  {/* Ikon för att öka kvantitet */}
                  <AddCircleIcon/>
                </button>
                <button className={style.btn} onClick={() => removeFromCart(item.id)}>
                  {/* Ikon för att minska kvantiet */}
                  <RemoveCircleIcon/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Höger sidomeny med orderinformation */}
      <div className={style.productDetails}>
          <p>Totalsumma {getCartTotal()} kr</p>
          <br />
          <p>Antal varor {cartItemCount}</p>
          <br />
          {/* Finns inga varor i varukorgen döljs knappen */}
          {cartItems.length > 0 && ( 
            <div className={style.btns}>
              <button style={{ cursor: "pointer" }} onClick={() => clearCart()}>
                Töm Varukorgen
              </button>
            </div>
          )}
      </div>
    </main>
  );
};
