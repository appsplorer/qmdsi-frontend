import api from "./api.service";

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
