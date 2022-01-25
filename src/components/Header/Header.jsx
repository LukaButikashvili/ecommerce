import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

import routes from "../../config/routes";
import HeaderCSS from "./Header.module.css";

const Header = () => {
  const cartProducts = useSelector((state) => state.cartReducer);

  return (
    <header className={HeaderCSS.header}>
      <div className={HeaderCSS.headerWrapper}>
        <div>
          <NavLink to={routes.MAIN_PAGE}>
            <h1>EasyMarket</h1>
          </NavLink>
        </div>
        <nav>
          <ul className={HeaderCSS.ul}>
            <li>
              <NavLink
                to={routes.USERS_PAGE}
                className={(props) =>
                  props.isActive ? HeaderCSS.active : null
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.SAVED_PAGE}
                className={(props) =>
                  props.isActive ? HeaderCSS.active : null
                }
              >
                Saved
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.CHECKOUT}
                className={(props) =>
                  props.isActive ? HeaderCSS.active : null
                }
              >
                <div className={HeaderCSS.basketWrapper}>
                  <BsCart4 size={25} />
                  <div className={HeaderCSS.basketItemsQuantity}>
                    {cartProducts.products.length}
                  </div>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
