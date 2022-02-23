import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddUser from "../AddUser/AddUser";
import Toggle from "../Toggle/Toggle";
import UsersView from "../UsersView/UsersView";
import SearchBox from "../Searchbox/Searchbox";
import UsersListCSS from "./UsersList.module.css";

const UsersList = () => {
  const { users } = useSelector((state) => state.userReducer);
  const [showGridView, setShowGridView] = useState(true);
  const [allUsers, setAllUsers] = useState(users);

  return (
    <div className={UsersListCSS.usersListWrapper}>
      <div className={UsersListCSS.usersSearchWrapper}>
        <SearchBox data={allUsers} linkPath="users" />
        <AddUser setAllUsers={setAllUsers} />
      </div>
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
        {allUsers.map((item) => {
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
