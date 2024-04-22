import axios, {  AxiosError, AxiosRequestConfig } from "axios";

const apiInstance = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});


type TInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => Promise<T>;

export const createInstance: TInstance = (config, options?) => {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;
