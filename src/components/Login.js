import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_KEY, auth } from "../api";
import { login } from "../store/actions/auth";
import Nav from "./Nav";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    auth
      .post(`/accounts:signInWithPassword?key=${API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .then((res) => {
        dispatch(login(res));
      })
      .catch((e) => {
        console.log("ERROR", e);
        setError("Invalid credentials!");
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="Login">
      <Nav />
      <header className="App-header mt-16">
        <img src="/icon.png" className="w-24 h-24 mx-auto" alt="Logo" />
        <h1 className="text-3xl font-bold text-center">Login</h1>
      </header>

      <div className="p-4">
        <form
          onSubmit={handleLogin}
          className="flex flex-col lg:max-w-xl mx-auto"
        >
          {error && (
            <div
              className="mb-4 bg-red-100 border border-red-400 text-red-700 p-2 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
              <span className="absolute top-0 bottom-0 right-0 p-2">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => setError("")}
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded mb-2 border border-black"
            type="email"
            placeholder="Email"
            required
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded mb-2 border border-black"
            type="password"
            placeholder="Password"
            required
          />

          <button className="p-4 mt-2 rounded-md bg-black text-white">
            Login
          </button>

          <p className="p-2 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Signup here
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
