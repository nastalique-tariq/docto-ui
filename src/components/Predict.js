import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { diseases } from "../data/diseases";
import { api } from "../api";
import Select from "react-select";
import Nav from "./Nav";
import _ from "lodash";

const Predict = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const [symptoms, setSymptoms] = useState([]);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disease, setDisease] = useState("");

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!symptoms.length) {
      setError("You must select your symptoms!");
    }

    const sym = symptoms
      .slice(0, 17)
      .map((s) => `${s.value}-`)
      .toString()
      .replace(/,/g, "")
      .replace(/-$/, "");

    const res = await api.get(`/predict/${sym}/`);
    console.log("RES", res);
    setDisease(res?.data?.result);
    setLoading(false);
  };

  useEffect(() => {
    setOptions(
      Object.keys(diseases).map((k) => {
        return { value: diseases[k], label: _.startCase(k.toString()) };
      })
    );
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="Predict">
      <Nav />
      <header className="App-header mt-16">
        <img src="/icon.png" className="w-24 h-24 mx-auto" alt="Logo" />
        <h1 className="text-3xl font-bold text-center">Predict</h1>
      </header>

      <div className="p-4">
        <form
          onSubmit={handlePredict}
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

          <Select
            className="mb-2"
            value={symptoms}
            onChange={setSymptoms}
            options={options}
            isMulti
            placeholder="Select your Symptoms"
          />

          {!loading && (
            <button className="p-4 mt-2 rounded-md bg-black text-white">
              Predict
            </button>
          )}

          {disease && (
            <>
              <p className="mt-4 text-center text-xl">
                You are unfortunately suffering from:{" "}
                <span className="font-bold">{_.startCase(disease)}</span>
              </p>
              <Link
                to={`/recommend/${disease}`}
                className="p-4 text-center w-fit mt-2 rounded-md bg-gray-400 text-white mx-auto"
              >
                Recommend a Doctor
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Predict;
