import jwt_decode from "jwt-decode";

const TOKEN = "Token";
const UserData = "personObject";

export const storeToken = (token) => localStorage.setItem(TOKEN, token);
export const storeUserData = (userData) => {
  let personObject = userData;
  localStorage.setItem(UserData, JSON.stringify(personObject));
};

export const getToken = () => localStorage.getItem(TOKEN);

export const logout = () => {
  let items = [TOKEN, UserData];
  items.forEach((i) => localStorage.removeItem(i));
};

export const getUserData = () => {
  try {
    let jsonString = localStorage.getItem("personObject");
    let retrievedObject = JSON.parse(jsonString);
    return retrievedObject;
  } catch (e) {
    return false;
  }
};

export const isLoggedIn = () => {
  return getToken() ? true : false;
};

export const checkTokenExpiration = () => {
  let token = localStorage.getItem(TOKEN);

  if (token) {
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("expire");
      return 1;
    } else {
      console.log("not expire");
      return 0;
    }
  }
  return;
};

export const handleTokenExpiration = () => {
  const tokenExpired = checkTokenExpiration();
  if (tokenExpired) {
    logout();
    window.location.reload();
  }
};
