import React, { useState } from "react";
import { useSelector } from "react-redux";
import Toggle from "../Toggle/Toggle";
import UsersView from "../UsersView/UsersView";
import UsersListCSS from "./UsersList.module.css";

const UsersList = () => {
  const { data } = useSelector((state) => state.userReducer);
  const [showGridView, setShowGridView] = useState(true);

  return (
    <div>
      <div className={UsersListCSS.usersListHeaderWrapper}>
        <h1>Users</h1>
        <Toggle showGridView={showGridView} setShowGridView={setShowGridView} />
      </div>
      <div
        className={
          showGridView
            ? UsersListCSS.usersGridViewWrapper
            : UsersListCSS.usersListViewWrapper
        }
      >
        {data.map((item) => {
          return (
            <UsersView
              key={item.id}
              id={item.id}
              fristname={item.name.firstname}
              lastname={item.name.lastname}
              phone={item.phone}
              email={item.email}
              showGridView={showGridView}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;
