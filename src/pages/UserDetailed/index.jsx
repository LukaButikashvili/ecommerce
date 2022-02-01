import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import UserDetails from "../../components/UserDetails/UserDetails";
import statuses from "../../config/statuses";
import Loader from "../../components/Loader/Loader";

const UserDetailedPage = () => {
  const { status } = useSelector((state) => state.userReducer);

  return (
    <div>
      <Header />
      {(status === statuses.INITIAL || status === statuses.PENDING) && (
        <Loader />
      )}
      {status === statuses.SUCCESS && <UserDetails />}
    </div>
  );
};

export default UserDetailedPage;
