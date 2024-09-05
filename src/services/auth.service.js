import api from "./api.service";

export const authSignup = async (data) => {
  try {
    const response = await api.post("/signup", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const authLogin = async (data) => {
  try {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", data.username);
    formData.append("password", data.password);

    const response = await api.post("/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const forgetPassword = async (email) => {
  try {
    const response = await api.post("/forget-password", { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
