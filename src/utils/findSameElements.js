function findSameElements(cart1, cart2) {
  const myCart = [...cart1];
  const userCart = [...cart2];

  for (let i = 0; i < myCart.length; i++) {
    for (let k = 0; k < userCart.length; k++) {
      if (myCart[i].productId === userCart[k].productId) {
        myCart[i].areSame = true;
        userCart[k].areSame = true;
      }
    }
  }
  return [myCart, userCart];
}
export { findSameElements };
