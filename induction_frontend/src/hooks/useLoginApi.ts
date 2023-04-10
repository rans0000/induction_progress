import { useQuery } from "react-query";

const getLoginDetails = async <T extends { queryKey: string[] }>({
  queryKey,
}: T) => {
  const [t, email, password] = queryKey;
  return fetch(`${process.env.REACT_APP_BASEURL}/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => data.json());
};

const getCurrentUser = async <T extends { queryKey: string[] }>({
  queryKey,
}: T) => {
  const [t, token] = queryKey;
  return fetch(`${process.env.REACT_APP_BASEURL}/users/current-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.json());
};

const useLoginApi = (email: string, password: string) => {
  return useQuery(["login", email, password], getLoginDetails, {
    enabled: false,
  });
};

/**@todo: typedef needed */
const useCurrentUserApi = (token: string, enabled: boolean) => {
  return useQuery(["token", token], getCurrentUser, { enabled });
};

export { useLoginApi, useCurrentUserApi };
