let cart = [];

export function getLocal() {
  cart = JSON.parse(localStorage.getItem('cartArray'));
}

export function setLocal() {
  localStorage.setItem('cartArray', JSON.stringify(cart));
}

export function exportCart() {
  return cart;
}

function getCartIndex(id) {
  const index = cart.findIndex((value) => value.id === id);
  return index;
}

export function exclude(id) {
  const index = getCartIndex(id);
  cart.splice(index, 1);
  setLocal();
}

export function increase(id) {
  const index = getCartIndex(id);
  cart[index].quantity += 1;
  setLocal();
}

export function decrease(id) {
  const index = getCartIndex(id);

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart[index].quantity = 1;
  }
  setLocal();
}

export function makeCartItem(object) {
  const { id } = object;
  const haveObject = cart.some((value) => value.id === id);
  if (!haveObject) {
    cart.push(object);
  } else {
    increase(id);
  }
  setLocal();
}
