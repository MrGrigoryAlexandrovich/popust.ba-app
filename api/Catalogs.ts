import { apiRequest } from "./config";

export const apiGetCatalogs = ({ url }: { readonly url: string }) =>
  apiRequest({ type: "get", url });
