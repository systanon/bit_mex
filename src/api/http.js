import axios from "axios";
import { headersCalculation } from "./headersCalculation";

const config = {
  timeout: 5 * 1000,
};

const http = axios.create(config);

http.interceptors.request.use(
  async function (config) {
    const { signature, ...remainingHeaders } = config.headers;
    if (!signature) return config;

    const additionalHeaders = await headersCalculation(
      config.method,
      config.url,
      config.data
    );

    const headers = { ...remainingHeaders, ...additionalHeaders };
    return { ...config, ...{ headers } };
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { http };
