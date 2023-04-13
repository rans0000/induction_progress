import { RootState } from "./store";

export const prepareHeaders = (headers: Headers, api: any) => {
  const token = (api.getState() as RootState).auth.token;
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
};
