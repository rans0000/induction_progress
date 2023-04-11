import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";

/**@todo: typedef needed */

const getLoginDetails = async (email: string, password: string) => {
  return axios
    .post(`${process.env.REACT_APP_BASEURL}/users/login`, {
      email,
      password,
    })
    .then((response) => response.data);
};

const getCurrentUser = async (token: string) => {
  return axios
    .get(`${process.env.REACT_APP_BASEURL}/users/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

const authenticateUser = async <T extends { queryKey: string[] }>({
  queryKey,
}: T) => {
  const [t, email, password] = queryKey;
  const response = await getLoginDetails(email, password);
  return getCurrentUser(response.token);
};

const useLoginApi = (
  email: string,
  password: string,
  onSuccess: () => void,
  onError: () => void
) => {
  return useQuery(["login", email, password], authenticateUser, {
    enabled: false,
    onSuccess,
    onError,
  });
};

export { useLoginApi };
