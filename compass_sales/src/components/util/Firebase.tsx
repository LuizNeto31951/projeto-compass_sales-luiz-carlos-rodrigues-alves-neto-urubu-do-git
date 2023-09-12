import axios from 'axios';

const key = 'AIzaSyCR67RxDJjbPx1mxA-PZLQ8NuvFP5Pd9Ac';

interface AuthProps {
  mode: 'signInWithPassword' | 'signUp'; // Use a union type to specify valid values
  email: string;
  password: string;
}

async function authentication({mode, email, password}: AuthProps) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${key}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  console.log(response.data);
}

export async function login(email: string, password: string) {
  await authentication({mode: 'signInWithPassword', email, password});
}

export async function signUp(email: string, password: string) {
  await authentication({mode: 'signUp', email, password});
  await login(email, password);
}
