import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";

import { fetchUsersCarts } from "../../api";
import { cloneUsersCart } from "../../redux/cart/actions/cartActions";
import Header from "../../components/Header/Header";
import DiffCSS from "./Diff.module.css";
import Modal from "../../components/Modal/Modal";
import CartProductsView from "../../components/CartProductsView/CartProductsView";
import statuses from "../../config/statuses";

const Diff = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { users } = useSelector((state) => state.userReducer);
  const { cartProducts } = useSelector((state) => state.cartReducer);
  const { status } = useSelector((state) => state.productReducer);

  const [usersCarts, setUsersCarts] = useState([]);

  const [selectedUserCart, setSelectedUserCart] = useState([]);
  const [myCart, setMyCart] = useState(cartProducts);
  const [selectedValue, setSelectedValue] = useState(userId || "");

  const [showModal, setShowModal] = useState(false);

  // Get All Users Carts
  useEffect(() => {
    const getAllUsersCarts = async () => {
      const data = await fetchUsersCarts();
      setUsersCarts(data);
    };
    getAllUsersCarts();
  }, []);

  useEffect(() => {
    if (!usersCarts.length) {
      return;
    }

    const findUserCart = usersCarts.find((cart) => {
      return cart.userId == selectedValue;
    });

    if (!findUserCart) {
      navigate(`${selectedValue}`);
      setSelectedUserCart([]);
      return;
    }

    setSelectedUserCart(findUserCart.products);
    navigate(`${selectedValue}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, usersCarts]);

  const cloneCart = () => {
    dispatch(cloneUsersCart(selectedUserCart));
    setMyCart(selectedUserCart);
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div className={DiffCSS.diffPageWrapper}>
        <div className={DiffCSS.diffPageHeaderWrapper}>
          <h1>My Cart</h1>
          <button
            className={DiffCSS.cloneButton}
            onClick={() => setShowModal(true)}
          >
            Clone
          </button>
          <select
            className={DiffCSS.selectInput}
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option key="" value="" selected disabled hidden>
              Select User
            </option>
            {users.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.username}
                </option>
              );
            })}
          </select>
        </div>

        {status === statuses.SUCCESS && (
          <div className={DiffCSS.usersCartsWrapper}>
            <CartProductsView
              cartProducts={myCart}
              showGridView={false}
              colorSameProducts={true}
            />
            <Outlet
              context={[setMyCart, selectedUserCart, setSelectedUserCart]}
            />
          </div>
        )}

        {showModal && (
          <Modal>
            <div className={DiffCSS.confirmationModalWrapper}>
              <div>
                <GiConfirmed
                  size={120}
                  style={{
                    color: "#3ae374",
                  }}
                />
              </div>
              <h1>Are you sure ? </h1>
              <p>
                Do you really want to clone cart? This process cannot be undone
              </p>
              <div>
                <button
                  className={DiffCSS.denyButton}
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
                <button
                  className={DiffCSS.confirmButton}
                  onClick={() => cloneCart()}
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Diff;
