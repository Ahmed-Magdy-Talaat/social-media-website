import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../../Contexts/User/UserContext";
import { useContext } from "react";

function Topbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <section className="topbar w-100">
      <div className="flex flex-row justify-between py-1 px-4 ">
        <Link to="/" className="flex gap-5 items-center ">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={320}
          />
        </Link>
        <div className="flex flex-row gap-5">
          <button onClick={signOut} className="py-3 ">
            <img src="/assets/icons/logout.svg" alt="logout" />
          </button>

          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              className="w-8 h-8 rounded-full"
              alt="profile"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Topbar;
