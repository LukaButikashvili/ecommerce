import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import { findSameElements } from "../../utils/findSameElements";
import CartProductsView from "../CartProductsView/CartProductsView";

const SelectedUserCart = () => {
  const [setMyCart, selectedUserCart, setSelectedUserCart] = useOutletContext();

  const { cartProducts } = useSelector((state) => state.cartReducer);
  const { userId } = useParams();

  useEffect(() => {
    const myCartProducts = JSON.parse(JSON.stringify(cartProducts));

    // If user doesn't have a cart products
    if (!selectedUserCart.length) {
      setMyCart(cartProducts);
      setSelectedUserCart([]);
      return;
    }

    // find same products
    const findSimilars = findSameElements(myCartProducts, selectedUserCart);

    setMyCart(findSimilars[0]);
    setSelectedUserCart(findSimilars[1]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, cartProducts]);

  return (
    <div>
      <CartProductsView
        cartProducts={selectedUserCart}
        showGridView={false}
        colorSameProducts={true}
      />
    </div>
  );
};

export default SelectedUserCart;
