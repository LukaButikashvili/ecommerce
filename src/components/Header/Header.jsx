import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../../config/routes";
import HeaderCSS from "./Header.module.css";

const Header = () => {
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
            <li>Basket</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
