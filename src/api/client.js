import { create } from "apisauce";
import { WEB_SERVER } from "../constants";

const apiClient = create({
  baseURL: WEB_SERVER,
});

export default apiClient;
