export async function getCategories() {
  const endPoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const categories = await (await fetch(endPoint)).json();
  return categories;
}

export async function getProductsFromCategoryAndQuery({ categoryId, query }) {
  let endPoint = '';
  if (query !== '' && categoryId !== '') {
    endPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  } else if (query === '') {
    endPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  } else {
    endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  }
  const products = await (await fetch(endPoint)).json();
  return products;
}

export async function getProductById(id) {
  const endPoint = `https://api.mercadolibre.com/items/${id}`;
  const productId = await (await fetch(endPoint)).json();
  return productId;
}
