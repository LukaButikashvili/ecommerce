import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import MapLeafLet from "../MapLeafLet/MapLeafLet";
import UserDetailsCSS from "./UserDetails.module.css";
import NotFoundPage from "../../pages/404/404";
import localStorageKeys from "../../config/localStorageKeys";
import { removeUserAction } from "../../redux/user/actions/userActions";

const initialState = {
  username: "username",
  email: "email",
  address: {
    citiy: "city",
    street: "street",
    geolocation: {
      lat: 10,
      long: 10,
    },
  },
};

const notify = () => toast.error("Product has been deleted");

const UserDetails = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { users } = useSelector((state) => state.userReducer);
  const { id } = useParams();

  const [user, setUser] = useState(initialState);
  const [currentPosition, setCurrentPosition] = useState([
    user.address.geolocation.lat,
    user.address.geolocation.long,
  ]);

  useEffect(() => {
    let findUser = users.filter((user) => user.id == id);

    if (!findUser.length) {
      const newUsers =
        JSON.parse(localStorage.getItem(localStorageKeys.USERS)) || [];
      findUser = newUsers.filter((user) => user.id == id);
    }

    setUser(findUser[0]);
    setCurrentPosition([
      findUser[0].address.geolocation.lat,
      findUser[0].address.geolocation.long,
    ]);
  }, [id, users]);

  const remove = async () => {
    notify();

    dispatch(removeUserAction(user.id));

    //Remove Product from localstore
    const tempProducts = JSON.parse(
      localStorage.getItem(localStorageKeys.USERS)
    );
    const newData = tempProducts.filter((item) => item.id != user.id);
    localStorage.setItem(localStorageKeys.USERS, JSON.stringify(newData));
    navigate("/users");
  };

  return (
    <>
      <Toaster />
      {user ? (
        <div className={UserDetailsCSS.userDetailsWrapper}>
          <div className={UserDetailsCSS.userDetailsBodyWrapper}>
            <div className={UserDetailsCSS.userDetailsInfoWrapper}>
              <div>
                <h1>Username:</h1>
                <h3>{user.username}</h3>
              </div>
              <div>
                <h1>Email:</h1>
                <h3>{user.email}</h3>
              </div>
              <div>
                <h1>Phone:</h1>
                <h3>{user.phone}</h3>
              </div>
              <div>
                <h1>Address:</h1>
                <h3>{user.address.city}</h3>
              </div>
              <div>
                <h1>Street:</h1>
                <h3>{user.address.street}</h3>
              </div>
              <div>
                <button
                  className={UserDetailsCSS.removeButton}
                  onClick={() => remove()}
                >
                  Remove User
                </button>
              </div>
            </div>
            <div className={UserDetailsCSS.mapWrapper}>
              <MapLeafLet
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
              />
            </div>
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default UserDetails;
