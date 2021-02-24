import httpService from "./httpService";
import {
  apiClienteEndpoint,
  apiVerifyAnagraficaEndpoint,
} from "../config.json";

function getHeader() {
  const headers = { Authorization: localStorage.getItem("TOKEN") };
  return headers;
}

function customerUrl(x) {
  return `${apiClienteEndpoint}${x}`;
}

function markAsEditedUrl(x) {
  return `${apiVerifyAnagraficaEndpoint}${x}`;
}

export function getCustomers(branch, nag, customerName, birthDate) {
  const config = { headers: { ...getHeader() } };

  let url = "?branch=" + branch + "&nag=" + nag;

  if (customerName !== "") {
    url += "&customerName=" + customerName;
  }

  if (birthDate !== "") {
    url += "&birthDate=" + birthDate;
  }

  return httpService.get(customerUrl(url), config);
}

export function customerMarkAsEdited(items) {
  const config = { headers: { ...getHeader() } };

  const data = {};
  items.map((item) => (data[item.path] = item.flagged));
  return httpService.post(apiVerifyAnagraficaEndpoint, data, config);
}
