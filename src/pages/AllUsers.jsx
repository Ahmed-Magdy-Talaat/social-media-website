import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../API/User";
import UserCard from "../Components/_root/shared/UserCard";
import Loader from "react-js-loader";
function AllUsers() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["getAllUsers"], queryFn: getAllUsers });
  // console.log(users);
  return (
    <div className="common-container">
      <div className="user-container ">
        <div className="flex flex-row gap-5 w-full">
          <img src="/assets/icons/people.svg" alt="people" />
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>

        <div className="user-grid ">
          {isLoading ? (
            <Loader
              type="spinner-default"
              className="absolute left-2/3"
              size={100}
            />
          ) : null}
          {users &&
            users.map((user) => <UserCard user={user} key={user._id} />)}

          {isError && <p>Error loading users.</p>}
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
