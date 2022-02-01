import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Map from "../Map/Map";
import UserDetailsCSS from "./UserDetails.module.css";
import NotFoundPage from "../../pages/404/404";

const initialState = {
  username: "username",
  email: "email",
  address: {
    citiy: "city",
    street: "street",
    geolocation: {
      lat: 0,
      long: 0,
    },
  },
};

const UserDetails = () => {
  const { data } = useSelector((state) => state.userReducer);
  const { id } = useParams();

  const [user, setUser] = useState(() => initialState);

  useEffect(() => {
    const findUser = data.filter((user) => user.id == id);
    setUser(findUser[0]);
  }, [id, data]);

  console.log(user);
  return (
    <>
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
            </div>
            <div className={UserDetailsCSS.mapWrapper}>
              <Map
                lat={user.address.geolocation.lat}
                long={user.address.geolocation.long}
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
