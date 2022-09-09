export async function getCategories() {
  const endPoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const categories = await (await fetch(endPoint)).json();
  return categories;
}

export async function getProductsFromCategoryAndQuery({ categoryId, query }) {
  let endPoint = '';
  const queryLeng = query.length;
  const categLeng = categoryId.length;
  const isDefined = 0;
  if (queryLeng > isDefined && categLeng > isDefined) {
    endPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`
  } else if (queryLeng === isDefined) {
    endPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`
  } else {
    endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`
  }
  console.log(endPoint)
  const products = await (await fetch(endPoint)).json();
  return products;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
