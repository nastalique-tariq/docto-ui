import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      Logging out...
    </div>
  );
};

export default Logout;
