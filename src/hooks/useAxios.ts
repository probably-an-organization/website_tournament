import axios, { type AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "./context/providers/useGlobalContext";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_HTTP;

type AxiosResponse<T> = {
  data: T;
  status: number;
};

const DEFAULT_CONFIG = {
  timeout: 5000,
};

export default function useAxios() {
  const [queryCounter, setQueryCounter] = useState<number>(0);

  const { setLoading } = useGlobalContext();

  useEffect(() => {
    setLoading(queryCounter > 0);
  }, [queryCounter]);

  const handle = async <T>(
    axiosFn: (defaultConfig: object) => Promise<AxiosResponse<T>>,
  ): Promise<AxiosResponse<T>> => {
    setQueryCounter((prev) => prev + 1);
    try {
      const result = await axiosFn(DEFAULT_CONFIG);
      return { data: result.data, status: result.status };
    } finally {
      setQueryCounter((prev) => prev - 1);
    }
  };

  const get = async <T>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return handle<T>(
      async (defaultConfig: object) =>
        await axios.get<T>(path, { ...defaultConfig, ...config }),
    );
  };

  const post = async <T>(
    path: string,
    data: object,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return handle<T>(
      async (defaultConfig) =>
        await axios.post<T>(path, data, { ...defaultConfig, ...config }),
    );
  };

  const put = async <T>(
    path: string,
    data: object,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return handle<T>(
      async (defaultConfig) =>
        await axios.put<T>(path, data, { ...defaultConfig, ...config }),
    );
  };

  return { get, post, put };
}
