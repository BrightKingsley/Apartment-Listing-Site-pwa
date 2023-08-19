import axios from "axios";
import { WEB_SERVER } from "../constants";

const apiClient = axios.create({
  baseURL: WEB_SERVER,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://raale-brightkingsley.onrender.com",
  },
});

export default apiClient;
