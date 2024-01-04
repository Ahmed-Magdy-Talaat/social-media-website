import { useContext } from "react";
import UserContext from "../../../Contexts/User/UserContext";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../../Constants";

function LeftSidebar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { pathname } = useLocation();
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/sign-in");
  };
  return (
    <div className="leftsidebar">
      <div className="flex flex-col items-start gap-6 w-full">
        <div className="flex flex-row items-center justify-between pb-3 px-4  w-full">
          <Link to="/" className="flex flex-col items-center ">
            <img
              src="/assets/images/logo.svg"
              alt="logo"
              width={180}
              height={300}
            />
          </Link>
        </div>

        <Link
          to={`/profile/${user._id}`}
          className="flex flex-row pb-5 px-2  gap-5"
        >
          <img
            src={user.imageUrl || `/assets/icons/profile-placeholder.svg`}
            className="h-12 w-12 rounded-full"
          />
          <div className="flex flex-col">
            <div className="font-bold text-xl">{user.Name}</div>
            <div className="text-slate-300">@{user.userName}</div>
          </div>
        </Link>

        <ul className="flex flex-col gap-3 w-full">
          {sidebarLinks.map((link) => {
            const active = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`ease-in-out duration-100 ${
                  active && "bg-primary-500"
                } hover:bg-primary-500 group  rounded-lg rounded-1 align-center  py-3 px-2 w-full`}
              >
                <NavLink
                  to={link.route}
                  className={`ease-in-out duration-100 flex flex-row gap-6 text-lg group-hover:invert-white ${
                    active && "invert-white"
                  }`}
                >
                  <img src={link.imgURL} />
                  <div>{link.label}</div>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <button
          onClick={signOut}
          className="fixed bottom-14 flex flex-row gap-6 px-2 text-lg"
        >
          <img src="/assets/icons/logout.svg" alt="logout" />
          <div>Sign out</div>
        </button>
      </div>
    </div>
  );
}

export default LeftSidebar;
