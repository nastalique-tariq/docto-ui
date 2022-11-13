import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  return (
    <div className="flex p-4 gap-4 justify-around">
      <Link className="flex gap-1 items-center" to={"/"}>
        <img className="w-8 h-8" src="/icon.png" alt="Icon" /> Docto
      </Link>
      {isLoggedIn ? (
        <>
          <Link to={"/predict"}>Predict</Link>
          <Link to={"/logout"}>Logout</Link>
        </>
      ) : (
        <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </>
      )}
    </div>
  );
};

export default Nav;
