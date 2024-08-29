import api from "./api.service";

export const updateNomineeImages = async (formData) => {
  try {
    const response = await api.post("/nominee/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error?.response.data;
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
    throw error?.response.data;
  }
};
