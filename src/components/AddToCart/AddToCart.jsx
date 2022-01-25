import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToBasketAction } from "../../redux/cart/actions/cartActions";
import QuantityChangerButtons from "../QuantityChangerButtons/QuantityChangerButtons";
import AddToCartCSS from "./AddToCart.module.css";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartReducer);

  const addProductToBasket = () => {
    const addNewProductToCart = {
      newProduct: { productId: product.id, quantity: 1, price: product.price },
    };

    dispatch(addProductToBasketAction(addNewProductToCart));
  };

  const findIndexOfBasketProduct = cartProducts.products.findIndex(
    (basketProduct) => basketProduct.productId === product.id
  );

  return (
    <>
      {findIndexOfBasketProduct >= 0 ? (
        <div className={AddToCartCSS.quantityChangerWrapper}>
          <QuantityChangerButtons
            id={product.id}
            quantity={cartProducts.products[findIndexOfBasketProduct].quantity}
          />
        </div>
      ) : (
        <button
          className={AddToCartCSS.addToCartButton}
          onClick={() => addProductToBasket()}
        >
          Add To Cart
        </button>
      )}
    </>
  );
};

export default AddToCart;
