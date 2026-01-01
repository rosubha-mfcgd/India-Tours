import axiosClient from "./axiosClient";

export const getImage = (fileId) => {
  return axiosClient.get(`/imagedetails/${fileId}`, {
    responseType: "blob", // important to get binary data
  });
};