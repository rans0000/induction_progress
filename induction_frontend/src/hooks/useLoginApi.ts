import axios from "axios";
import { useQuery } from "react-query";
import { Token } from "../models/auth.model";
import { User } from "../models/user.models";

/**
 * get login token
 */
const getLoginDetails = async (
  email: string,
  password: string
): Promise<Token> => {
  return axios
    .post(`${process.env.REACT_APP_BASEURL}/users/login`, {
      email,
      password,
    })
    .then((response) => response.data);
};

/**
 * get logged in user data
 */
const getCurrentUser = async (token: string): Promise<User> => {
  return axios
    .get(`${process.env.REACT_APP_BASEURL}/users/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

/**
 * login with email & password - get token and use it for user details
 */

const authenticateUser = async <T extends { queryKey: string[] }>({
  queryKey,
}: T): Promise<User> => {
  const [t, email, password] = queryKey;
  const response = await getLoginDetails(email, password);
  return getCurrentUser(response.token);
};

/**
 * service hooks
 */

const useLoginApi = (
  email: string,
  password: string,
  onSuccess: (data: User) => void,
  onError: (error: object) => void
) => {
  return useQuery(["login", email, password], authenticateUser, {
    enabled: false,
    onSuccess,
    onError,
  });
};

export { useLoginApi };
