import { apiRequest } from "./config";

export const apiGetUsers = () => apiRequest({ type: "get", url: "/users" });
