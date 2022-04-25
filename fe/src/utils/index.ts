import axios, { AxiosRequestConfig } from 'axios';

export const createRequest = async (
  endpoint: string,
  requestConfig?: AxiosRequestConfig
): Promise<any> => {
  const response = await axios({
    ...requestConfig,
    url: endpoint,
  });

  return response?.data;
};
