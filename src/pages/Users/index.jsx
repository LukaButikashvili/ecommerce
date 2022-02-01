import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import UsersList from "../../components/UsersList/UsersList";
import statuses from "../../config/statuses";
import Loader from "../../components/Loader/Loader";

const UsersPage = () => {
  const { status } = useSelector((state) => state.userReducer);
  return (
    <div>
      <Header />
      {(status === statuses.INITIAL || status === statuses.PENDING) && (
        <Loader />
      )}
      {status === statuses.SUCCESS && <UsersList />}
    </div>
  );
};

export default UsersPage;
