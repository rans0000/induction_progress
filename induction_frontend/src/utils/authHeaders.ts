import { RootState } from "./store";

export const prepareHeaders = (headers: Headers, api: any) => {
  let token: string | null = "";
  try {
    token =
      (api.getState() as RootState).auth.token || localStorage.getItem("token");
  } catch (err) {
    throw err;
  }
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
};
