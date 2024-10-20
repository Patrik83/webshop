import React, { useContext } from 'react';
import { CartContext } from "../../context/CartManager";
import style from "../../styles/CartPage.module.css";
import Image from '../../components/product/Image';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function CartPage() {
  // Använder useContext för att få tillgång till värden och funktioner från CartContext
  const { cartItems, handleQuantityChange, removeFromCart, getCartTotal, clearCart } = useContext(CartContext)

  // Beräknar det totala antalet varor i kundvagnen genom att summera varje varas mängd
  const cartItemCount = cartItems.reduce((total, item) => total + item.amount, 0);

  return (  
    <main className={style.cartWrapper}>

      {/* Dölj meddelande om varukorgen är tom */}
      {cartItems.length > 0 && ( 
        <h1 className={style.cartAmountText}>
        Varukorgen: {cartItemCount}
      </h1>
      )}

      {/* MIDDLE BOX */}
      <div className={style.cartMiddleBox}>
      
      {/* Om varukorgen är tom, visa ett meddelande */}
      {cartItems.length === 0 && <h1>Din varukorg är tom</h1>}

       {/* Annars, visa de tillagda produkterna */}
        {cartItems.map((item) => (
          <div className={style.cartItem} key={item.id}>
            <div className={style.cartImg}>
              <Image 
                imageUrl={item.Images[0].imageUrl} 
                altText={`Bild på ${item.name}`} 
              />
            </div>
            
            <div className={style.itemDetails}>
              <div className={style.detailText}>
                <h2>{item.name}</h2>
                <p>{item.price}</p>
              </div>
              <div className={style.btnWrapper}>
                <select 
                  className={style.amountDropdown}
                  value={item.amount} 
                  onChange={(e) => handleQuantityChange(item, parseInt(e.target.value, 10))}
                >
                  {/* Skapar en lista med 1-5 alternativ av antalet som kan väljas */}
                  {[1, 2, 3, 4, 5].map(optionValue => (
                    <option key={optionValue} value={optionValue}>{optionValue}</option>
                  ))}
                </select>
                <DeleteForeverIcon 
                onClick={() => removeFromCart(item)}
                fontSize="large"
                style={{cursor: "pointer"}}
              />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Höger sidomeny med orderinformation */}
      <div className={style.productDetails}> {/* Kanske döpa om denna till orderDetails */}
          <p>Totalsumma {getCartTotal()} kr</p>
          
           {/* Om varukorgen inte är tom, visa knappen för att tömma varukorgen */}
          {cartItems.length > 0 && ( 
            <div className={style.btns}>
              <button style={{ cursor: "pointer" }} onClick={() => clearCart()}>
                Töm Varukorgen
              </button>
              {/* <button style={{ cursor: "pointer" }}>
                Gå vidare
              </button> */}
            </div>
          )}
      </div>
    </main>
  );
};
