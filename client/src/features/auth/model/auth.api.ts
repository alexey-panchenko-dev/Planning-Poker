import { apiInstance } from "../../../shared/api/base";

export const login = (data: any) => {
  return apiInstance.post("/auth/login", data);
};

export const register = (data: any) => {
  return apiInstance.post("/auth/register", data);
};

export const getMe = () => {
  return apiInstance.get("/auth/me");
};
