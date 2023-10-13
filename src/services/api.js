import axios from "axios";

const API_URI = "http://localhost:8000";

export const validateJWTToken = async (token) => {
  try {
    const res = await axios.get(`${API_URI}/auth`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error response from API:", error.response);
    return null;
  }
};

export const API_GMAIL = async (serviceUrlObject, requestData = {}, type) => {
  const { params, urlParams, ...body } = requestData;

  return await axios({
    method: serviceUrlObject.method,
    url: `${API_URI}/${serviceUrlObject.endpoint}/${type}`,
    data: requestData,
  });
};

export default API_GMAIL;
