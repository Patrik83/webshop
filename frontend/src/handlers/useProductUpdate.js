import { useState, useEffect, useRef } from "react";
import axios from "axios";

// En custom hook för att hantera logik och tillstånd
const useProductUpdate = (initialProducts) => {
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const fileInputRefs = useRef({});

  useEffect(() => {
    if (initialProducts) {
      setUpdatedProducts(initialProducts);
    }
  }, [initialProducts]);

  const handleNameChange = (e) => {
    const id = Number(e.currentTarget.dataset.id);
    const newName = e.currentTarget.value;
    setUpdatedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, name: newName } : product
      )
    );
  };

  const handlePriceChange = (e) => {
    const id = Number(e.currentTarget.dataset.id);
    const newPrice = e.currentTarget.value;
    setUpdatedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, price: newPrice } : product
      )
    );
  };

  const handleCategoryChange = (e) => {
    const id = Number(e.currentTarget.dataset.id);
    const newCategoryId = Number(e.currentTarget.value);
    setUpdatedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, Categories: [{ id: newCategoryId }], } : product
      )
    );
  };
  
  const handleImageChange = (event, productId, imageId) => {
    if (event.type === "click") {
      // Klicka på den dolda filinmatningen för att öppna filväljaren
      fileInputRefs.current[`${productId}-${imageId}`].click();
    }
    else if (event.type === "change") {
      // Hämta den valda filen
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        // Uppdatera tillståndet med den nya valda filen
        setSelectedImages(prevState => ({
          ...prevState,
          [productId]: {
            ...prevState[productId],
            [imageId]: selectedFile
          }
        }));
      }
    }
  };

  const handleSaveAllChanges = async () => {
    try {
      const saveRequests = updatedProducts.map(async (product) => {
        const productData = {
          name: product.name,
          price: product.price,
          categoryId: product.Categories[0]?.id,

          // Eftersom samma produkt kan ha flera bilder så...
          // uppdatera bildernas namn baserat på temporära bild-ändringar 
          // eller behåll orginal bilderna
          images: product.Images.map(image => ({
            id: image.id,
            imageUrl: selectedImages[product.id] && selectedImages[product.id][image.id]
              ? selectedImages[product.id][image.id].name // Använder den nyvalda bilden
              : image.imageUrl // Annars behåller den senast sparade
          }))
        };
    
        const response = await axios.put(`http://localhost:3001/products/${product.id}`, productData);
        console.log(`Changes saved for product ${product.id}!`, response.data);
        return response;
      });
    
      const responses = await Promise.all(saveRequests);
      console.log("All changes saved successfully:", responses);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  
  return {
    updatedProducts,
    selectedImages,
    fileInputRefs,
    handleNameChange,
    handlePriceChange,
    handleCategoryChange,
    handleImageChange,
    handleSaveAllChanges
  };
};

export default useProductUpdate;