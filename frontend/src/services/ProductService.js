export const getProducts = async () => {
  const response = await fetch('../data/products.json');
  const data = await response.json();
  return data;
};

export const getProductById = (id) => {
  return getProducts().then((products) => products.find(product => product.id === id));
};

export const getUniqueCategories = (products) => {
  const categories = [];
  products.forEach(product => {
    product.categories.forEach(category => {
      if (!categories.some(cat => cat.id === category.id)) {
        categories.push(category);
      }
    });
  });
  return categories;
};

export const getProductsByCategory = (categoryName) => {
  return getProducts().then(products =>
    products.filter(product =>
      product.categories.some(category => category.name === categoryName)
    )
  );
};