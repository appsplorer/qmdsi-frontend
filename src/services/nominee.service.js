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

export const updateImages = async (
  accessToken,
  personalId,
) => {
  try {
    const formData = new FormData();
    formData.append("personalId", personalId);
    console.log(formData)
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
    throw error?.response.data;
  }
};

export const getUserNominee = async (accessToken) => {
  try {
    const response = await api.get("/nominee", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching nominee data:", error);
    throw error;
  }
};
