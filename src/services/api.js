export async function getCategories() {
  const retornoApi = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = retornoApi.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const retorntApi = await fetch(`https://api.mercadolibre.com/sites/MLA/search?=${categoryId}&q=${query}`);
  const categories = retorntApi.json();
  return categories;
}
