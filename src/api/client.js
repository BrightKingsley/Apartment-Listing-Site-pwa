import axios from "axios";
import { WEB_SERVER } from "../constants";

const apiClient = axios.create({
  baseURL: WEB_SERVER,
});

export default apiClient;
