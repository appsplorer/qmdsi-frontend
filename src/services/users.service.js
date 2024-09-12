import api from "./api.service";

export const updateProfileImages = async (
  accessToken,
  profilePicture,
  idPicture
) => {
  try {
    const formData = new FormData();
    formData.append("profile_picture", profilePicture);
    formData.append("id_picture", idPicture);

    const response = await api.post("/personal_information/images", formData, {
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

export const updatePersonalInfo = async (accessToken, data) => {
  try {
    const response = await api.post("/personal_information", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error?.response.data;
  }
};

export const getUserPersonalInfo = async (accessToken) => {
  try {
    const response = await api.get("/personal_information", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUser = async (accessToken) => {
  try {
    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUserRefs = async (accessToken) => {
  try {
    const response = await api.get("/refs", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const swapToken = async (accessToken, tokenIn, amountIn) => {
  const res = await api.post(
    "/swap",
    { tokenIn, amountIn },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};


export const getUserBalances = async (userId) => {
  const res = await api.get(`/api/account/balance?userId]${userId}`)
  console.log(res.data)
}