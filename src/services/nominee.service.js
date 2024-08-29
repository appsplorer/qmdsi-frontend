import api from "./api.service";

export const updateNomineeImages = async (accessToken, idPicture) => {
  try {
    const formData = new FormData();
    formData.append("id_picture", idPicture);

    const response = await api.post("/nominee/image", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading profile images:", error);
    throw error;
  }
};

export const updateNomineeInfo = async (accessToken, data) => {
  try {
    const response = await api.post("/nominee", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
