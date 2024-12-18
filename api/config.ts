import axios, { AxiosPromise } from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://popust-ba-be.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRequest = async ({
  type,
  url,
  apiPayload,
}: {
  type: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiPayload?: any;
}) => {
  let request: AxiosPromise;
  switch (type) {
    case "get":
      request = axiosInstance.get(url, {});
      break;
    case "put":
      request = axiosInstance.put(url, apiPayload, {});
      break;
    case "delete":
      request = axiosInstance.delete(url, {});
      break;
    case "post":
    default:
      request = axiosInstance.post(url, apiPayload, {});
  }
  return request
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
