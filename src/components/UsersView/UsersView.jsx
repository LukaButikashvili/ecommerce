import React from "react";
import { Link } from "react-router-dom";
import UsersViewCSS from "./UsersView.module.css";

const UsersView = ({
  firstname,
  lastname,
  phone,
  email,
  showGridView = true,
  id,
}) => {
  return (
    <div
      className={
        showGridView
          ? UsersViewCSS.usersGridViewBodyWrapper
          : UsersViewCSS.usersListViewBodyWrapper
      }
    >
      <Link to={`/users/${id}`}>
        <div>
          <h1>{firstname}</h1>
          <h1>{lastname}</h1>
        </div>
      </Link>
      <div>
        <h1>{phone}</h1>
        <h1>{email}</h1>
      </div>
    </div>
  );
};

export default UsersView;
