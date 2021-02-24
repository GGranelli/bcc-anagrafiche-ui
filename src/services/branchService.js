import httpService from "./httpService";
import { apiFilialiEndpoint } from "../config.json";

export function getBranches() {
  const headers = { Authorization: localStorage.getItem("TOKEN") };
  const conf = { headers: { ...headers } };
  return httpService.get(apiFilialiEndpoint, conf);
}
