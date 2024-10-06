export const getProducts = async () => {
  const response = await fetch('/data/products.json');
  
  const data = await response.json();
  return data;
};

export const getProductById = async (id) => {
    const products = await getProducts();
    const product = products.find(product => product.id === parseInt(id, 10));
  
    return product;
  };
  

export const getUniqueCategories = async () => {
  const categories = [];
  const products = await getProducts();


  products.forEach(product => {
    product.categories.forEach(category => {
      if (!categories.some(cat => cat.id === category.id)) {
        categories.push(category);
      }
    });
  });

  return categories;
};

export const getProductsByCategory = async (categoryName) => {
    // Hämta alla produkter
    const products = await getProducts(); 
    
    // Filtrera produkter baserat på den valda kategorin
    const filteredProducts = products.filter(product => 
      product.categories.some(category => category.name === categoryName)
    );
  
    return filteredProducts;
  };
  