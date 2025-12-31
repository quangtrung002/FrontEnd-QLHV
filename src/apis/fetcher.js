import axios from "axios";
import { notificationError } from "notification/notification";


export function findError(errorCode) {
  const listErrorMessages = [];

  return listErrorMessages.find((error) => error.error_code === errorCode);
}

const handleError = (dataError) => {
  try {
    const { errorCode } = dataError;
    let errorMessage;
    const error = findError(errorCode);
    if (error) {
      errorMessage = error.description;
    } else {
      errorMessage = dataError.errorMessage;
    }
    if (errorMessage) notificationError(errorMessage);

    if (error?.isLogout) {
    }
  } catch (e) {
    console.warn(e);
    notificationError("Something is wrong. Please try again");
  }
};

export async function fetcher(config, options = {}) {
  const token = localStorage.getItem("access_token");

  const defaultOptions = {
    isFormData: false,
    token,
    ...options,
  };

  const apiClient = axios.create({
    headers: {
      "Content-Type": defaultOptions.isFormData
        ? "multipart/form-data"
        : "application/json",
    },
    baseURL: "http://localhost:3001/api/v1",
  });

  if (defaultOptions.token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${defaultOptions.token}`;
  }

  return new Promise((resolve, reject) => {
    apiClient
      .request(config)
      .then(async (response) => {
        if (response.data.success) {
          if (response.data.data === undefined) {
            const dataEmpty = {
              errorCode: "ERROR",
              errorMessage: "Data is empty",
            };
            reject(dataEmpty);
            return;
          }
          resolve(response.data);
          return;
        }

        const dataError = {
          errorCode: "ERROR",
          errorMessage: response.data.msg,
        };
        if (defaultOptions.displayError) {
          handleError(dataError);
        }
        reject(dataError);
      })
      .catch(async (error) => {
        // if (axios.isAxiosError(error) && error.response?.status === 401) {
        //    const refreshToken = localStorage.getItem("refresh_token");
        //    if (!refreshToken) {
        //      return;
        //    }
        //    const response = await axios.post(
        //      "http://localhost:3001/api/v1/auth/refresh-token",
        //      {
        //        refresh_token: refreshToken,
        //      }
        //    );
        //    const newAccessToken = response.data.data.access_token;
        //    localStorage.setItem("access_token", newAccessToken);
        //    apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        //    return apiClient
        //      .request(config)
        //      .then((response) => response.data);
        // }

        if (axios.isAxiosError(error)) {
          const dataError = error.response?.data;
          
          // Kiểm tra an toàn để tránh lỗi undefined khi gọi msg.toLowerCase()
          if (dataError && dataError.msg) {
              const msg = dataError.msg.toLowerCase();
              notificationError(msg.charAt(0).toUpperCase() + msg.slice(1));
          } else {
              // Xử lý trường hợp không có msg nếu cần thiết
              // notificationError("An error occurred");
          }

          return;
        }

        return reject(error);
      });
  });
}