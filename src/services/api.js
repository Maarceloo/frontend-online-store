export async function getCategories() {
  const retornoApi = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await retornoApi.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const retorntApi = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
  const categories = await retorntApi.json();
  return categories;
}
