import React from "react";
import style from "../../styles/Popup.module.css";

const Popup = ({ trigger, children }) => {
    // Om trigger är sann, rendera popup fönstret
    if (!trigger) return null;

    return (
        <div className={style.popup}>
          <div className={style.popupInner}>
            {children}
          </div>
        </div>
    );
};

export default Popup;
