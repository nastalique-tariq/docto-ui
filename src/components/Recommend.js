import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import _ from "lodash";
import { api } from "../api";

const Recommend = () => {
  const navigate = useNavigate();
  const { disease } = useParams();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!disease) {
      navigate("/predict");
    }
    api.get(`/recommend/${disease}/`).then((res) => {
      console.log(res.data);
      setDoctors(res.data);
    });
    setLoading(false);
  }, [navigate, disease]);

  return (
    <div className="Recommend">
      <Nav />
      <header className="App-header mt-16">
        <img src="/icon.png" className="w-24 h-24 mx-auto" alt="Logo" />
        <h1 className="text-3xl font-bold text-center">Recommended Doctors</h1>
      </header>

      <div className="p-4 max-w-xl mx-auto">
        {loading && <p className="text-center">Loading...</p>}
        <div className="grid grid-cols-1 gap-2">
          {doctors.map((doc) => (
            <div
              key={doc["Doctor id"]}
              className="flex flex-col p-2 rounded-lg shadow-md hover:shadow-xl"
            >
              <p className="truncate hover:overflow-visible hover:whitespace-pre-line">
                <span className="text-xl font-bold">
                  {_.startCase(doc["Doctor Name"])}
                </span>
              </p>
              <p className="text-sm italic">
                (<span>{_.startCase(doc["Specialization"][0])}</span>
                {" in "}
                <span>{_.startCase(doc["City"][0])}</span>)
              </p>
              <p>
                Fee:{" "}
                <span className="font-bold">
                  {"Rs. "}
                  {Intl.NumberFormat().format(doc["Cost"][0])}
                  {"/-"}
                </span>
              </p>

              <p className="text-md truncate hover:overflow-visible hover:whitespace-pre-line">
                <span className="text-sm">Diseases Treated: </span>
                <span>
                  {doc["Disease-treated"].map((d) => `${_.startCase(d)}, `)}
                </span>
              </p>
            </div>
          ))}
        </div>
        {!loading && doctors.length === 0 && (
          <p className="text-center font-bold text-red-500 italic shadow rounded p-4">
            <span className="text-2xl">We are Sorry!</span> <br />
            Currently we don't have available doctors for this disease!
          </p>
        )}
      </div>
    </div>
  );
};

export default Recommend;
