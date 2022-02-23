import React, { useState } from "react";
import { nanoid } from "nanoid";
import toast, { Toaster } from "react-hot-toast";

import Modal from "../Modal/Modal";
import MapLeafLet from "../MapLeafLet/MapLeafLet";
import AddUserCSS from "./AddUser.module.css";
import { postUser } from "../../api";
import localStorageKeys from "../../config/localStorageKeys";
import { useDispatch } from "react-redux";
import { addUserAction } from "../../redux/user/actions/userActions";

const notify = () => toast.success("User has been added");

const AddUser = ({ setAllUsers }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [currentPosition, setCurrentPosition] = useState([10, 10]);

  const createUser = async (e) => {
    e.preventDefault();

    notify();

    const newUser = {
      id: nanoid(),
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      name: {
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
      },
      address: {
        city: e.target.city.value,
        street: e.target.street.value,
        number: e.target.number.value,
        zipcode: e.target.zipcode.value,
        geolocation: {
          lat: currentPosition[0],
          long: currentPosition[1],
        },
      },
      phone: e.target.phone.value,
    };

    // Post user
    dispatch(addUserAction(newUser));
    // const res = await postUser(newUser);

    // Add user to localstorage
    const getUsersFromLocalstorage =
      JSON.parse(localStorage.getItem(localStorageKeys.USERS)) || [];
    const newUsersList = [...getUsersFromLocalstorage, newUser];
    localStorage.setItem(localStorageKeys.USERS, JSON.stringify(newUsersList));

    setAllUsers((allUsers) => [...allUsers, newUser]);

    setOpenModal(false);
  };

  return (
    <>
      <Toaster />
      <div className={AddUserCSS.addUserButton}>
        <button onClick={() => setOpenModal(true)}>Add User</button>
      </div>
      {openModal && (
        <Modal>
          <div className={AddUserCSS.addUserWrapper}>
            <form onSubmit={(e) => createUser(e)}>
              <div>
                <label>Email</label>
                <input type="email" name="email" required />

                <label>Username</label>
                <input type="text" name="username" required />

                <label>password</label>
                <input type="password" name="password" required />

                <label>firstname</label>
                <input type="text" name="firstname" required />

                <label>lastname</label>
                <input type="text" name="lastname" required />

                <label>city</label>
                <input type="text" name="city" required />

                <label>street</label>
                <input type="text" name="street" required />

                <label>number</label>
                <input type="number" name="number" required />

                <label>zipcode</label>
                <input type="text" name="zipcode" required />

                <label>phone</label>
                <input type="number" name="phone" required />
                <input type="submit" name="Create" />
              </div>
              <div className={AddUserCSS.addUserMapWrapper}>
                <MapLeafLet
                  currentPosition={currentPosition}
                  setCurrentPosition={setCurrentPosition}
                  changeLocation={true}
                />
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddUser;
// email:'John@gmail.com',
// username:'johnd',
// password:'m38rmF$',
// name:{
//     firstname:'John',
//     lastname:'Doe'
// },
// address:{
//     city:'kilcoole',
//     street:'7835 new road',
//     number:3,
//     zipcode:'12926-3874',
//     geolocation:{
//         lat:'-37.3159',
//         long:'81.1496'
//     }
// },
// phone:'1-570-236-7033'
// }
