import axios, { type AxiosError } from "axios";

type ErrorCodeKey = number | "default";

type ErrorCodeHandler = {
  [key in ErrorCodeKey]: () => void;
};

export const handleAxiosError = (
  err: Error | AxiosError,
  errorCodeHandlers: ErrorCodeHandler,
) => {
  if (axios.isAxiosError(err)) {
    const errCode = err.response?.status ?? "default";
    errorCodeHandlers[errCode]!();
  }
};
