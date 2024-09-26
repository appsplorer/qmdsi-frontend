import api from "./api.service";

export const getUserDeposits = async () => {
  try {
    const response = await api.get("/deposits");
    return response.data;
  } catch (error) {
    console.error("Error fetching deposits data:", error);
    throw error;
  }
};

export const getDeposit = async (id) => {
  try {
    const response = await api.get(`/deposits/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching deposit:", error);
    throw error;
  }
};

export const processDeposit = async (id) => {
  try {
    const response = await api.post(`/deposits/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error processing deposit:", error);
    throw error;
  }
};

export const depositFiat = async (amount) => {
  try {
    const response = await api.post("/fiat/deposit", amount);
    return response.data;
  } catch (error) {
    console.error("Error depositing fiat:", error);
    throw error;
  }
};

export const getRate = async () => {
  try {
    const response = await api.get("/rate");
    return response.data;
  } catch (error) {
    console.error("Error fetching rate:", error);
    throw error;
  }
};
