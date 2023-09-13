import axios from 'axios';

const key = 'AIzaSyCR67RxDJjbPx1mxA-PZLQ8NuvFP5Pd9Ac';

export async function login(email: string, password: string) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    },
  );
  let token = response.data.idToken;
  let id = response.data.localId;
  const data = {token, id};
  return data;
}

interface signUpProps {
  name: string;
  email: string;
  password: string;
}

export async function signUp({name, email, password}: signUpProps) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    },
  );

  let id = response.data.localId;
  axios.post(
    `https://react-sales-33a67-default-rtdb.firebaseio.com/users/${id}.json`,
    {name, email, password},
  );

  let token = response.data.idToken;
  const data = {token, id};
  return data;
}

export async function fetchUser(id: string) {
  const response = await axios.get(
    `https://react-sales-33a67-default-rtdb.firebaseio.com/users/${id}.json`,
  );
  let user = {};
  for (const key in response.data) {
    user = {
      name: response.data[key].name,
      email: response.data[key].email,
    };
  }
  return user;
}

export function resetPassword(email: string) {
  const response = axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`,
    {
      requestType: 'PASSWORD_RESET',
      email: email,
    },
  );
}
