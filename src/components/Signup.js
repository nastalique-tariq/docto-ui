import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, API_KEY, db } from "../api";
import { signup } from "../store/actions/auth";
import Nav from "./Nav";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cost, setCost] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    auth
      .post(`/accounts:signUp?key=${API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .then((res) => {
        db.post(`/users.json`, {
          name,
          email,
          cost,
          location,
          userId: res.data.localId,
        });
        dispatch(signup(res));
        navigate("/login");
      })
      .catch((e) => {
        setError("Oops, something went wrong!");
      });
  };

  return (
    <div className="Signup">
      <Nav />
      <header className="App-header mt-16">
        <img src="/icon.png" className="w-24 h-24 mx-auto" alt="Logo" />
        <h1 className="text-3xl font-bold text-center">Signup</h1>
      </header>

      <div className="p-4">
        <form
          onSubmit={handleSignup}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded mb-2 border border-black"
            type="text"
            placeholder="Full Name"
            required
          />

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

          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 rounded mb-2 border border-black"
            type="password"
            placeholder="Confirm Password"
            required
          />

          <input
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="p-2 rounded mb-2 border border-black"
            type="number"
            placeholder="Cost"
            min="1"
            required
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 rounded mb-2 border border-black"
            type="text"
            placeholder="Location"
            required
          />

          <button className="p-4 mt-2 rounded-md bg-black text-white">
            Signup
          </button>

          <p className="p-2 text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login here
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
