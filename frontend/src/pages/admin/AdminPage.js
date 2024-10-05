import React, { useState } from "react";
import useApi from "../../hooks/useApi";
import useProductUpdate from "../../handlers/useProductUpdate";
import ShowProducts from "../../components/Admin/ShowProducts";
import EditProduct from "../../components/Admin/EditProduct";
import Popup from "../../components/Admin/Popup";

const AdminPage = () => {
  // Hämta kategorier från API
  const { data: categories, loaded: categoriesLoaded } = useApi('http://localhost:3001/categories/');
  // Hämta produkter från API
  const { data: products, loaded: productsLoaded } = useApi('http://localhost:3001/products/');

  // Använd custom hook för att hantera uppdateringar av produkter
  const productUpdateProps = useProductUpdate(products);

  // State för att hantera popupens synlighet
  const [isPopupVisible, setPopupVisible] = useState(false);
  // State för vald produkt som ska redigeras
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Visa laddningsmeddelande tills data är inläst
  if (!productsLoaded || !categoriesLoaded) {
    return <div>Laddar...</div>;
  }

  // Hantera när en produkt väljs för redigering
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setPopupVisible(true);
  };

  // Stäng popup och rensa vald produkt
  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      {/* Visa lista med produkter */}
      <ShowProducts
        products={productUpdateProps.updatedProducts}
        categories={categories}
        {...productUpdateProps} // Sprid ut props från custom hook
        onEditProduct={handleEditProduct}
      />
      {/* Visa popup för redigering av produkt */}
      <Popup trigger={isPopupVisible} setTrigger={setPopupVisible}>
        {selectedProduct && (
          <EditProduct 
            product={selectedProduct}
            Categories={categories}
            {...productUpdateProps} // Sprid ut props från custom hook
            onClose={handleClosePopup}
          />
        )}
      </Popup>
    </div>
  );
};

export default AdminPage;