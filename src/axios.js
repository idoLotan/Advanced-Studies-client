import axios from "axios";
import { storeToken, storeUserData } from "./auth/localStorage";

export const baseUrl = "http://localhost:4000";

export const PostAuth = async (url, data) => {
  const returnValue = [];
  await axios
    .post(`${baseUrl}/${url}`, data)
    .then((data) => {
      storeToken(data.data.data[0]);
      storeUserData(data.data.data[1]);
    })
    .catch((err) => {
      returnValue.push(...err.response.data.message);
    });
  return returnValue;
};

export const postImage = async (imageType, image, id) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const resp = await axios.post(
      `${baseUrl}/courses/images/${imageType}/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(resp);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};
