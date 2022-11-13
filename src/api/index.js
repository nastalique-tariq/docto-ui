import axios from "axios";

export const API_KEY = "AIzaSyCDknTm795UKd7QZd1E629p8CEmetSSG_o";

export const api = axios.create({
  baseURL: "https://api-docto.herokuapp.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const auth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const db = axios.create({
  baseURL: "https://docto1-default-rtdb.firebaseio.com",
});
