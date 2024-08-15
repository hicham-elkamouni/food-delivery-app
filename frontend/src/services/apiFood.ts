import axios from "axios";

const apiFood = axios.create({
  baseURL: "http://localhost:3333",
});

export default apiFood;
