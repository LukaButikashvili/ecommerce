import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToBasketAction,
  decreaseProductQuantity,
  increaseProductQuantity,
} from "../../redux/cart/actions/cartActions";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartReducer);

  const addProductToBasket = () => {
    const addNewProductToCart = {
      newProduct: { productId: product.id, quantity: 1 },
    };

    dispatch(addProductToBasketAction(addNewProductToCart));
  };

  const findIndexOfBasketProduct = cartProducts.products.findIndex(
    (basketProduct) => basketProduct.productId === product.id
  );

  return (
    <>
      {findIndexOfBasketProduct >= 0 ? (
        <>
          <button onClick={() => dispatch(decreaseProductQuantity(product.id))}>
            -
          </button>
          <h1>{cartProducts.products[findIndexOfBasketProduct].quantity}</h1>
          <button onClick={() => dispatch(increaseProductQuantity(product.id))}>
            +
          </button>
        </>
      ) : (
        <button onClick={() => addProductToBasket()}>Add To Cart</button>
      )}
    </>
  );
};

export default AddToCart;
