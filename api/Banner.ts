import { apiRequest } from "./config";

export const apiGetBanners = () => apiRequest({ type: "get", url: "/banners" });
