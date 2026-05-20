import apiClient from "@/lib/apiClient";

export const authService = {
  register: (payload) => apiClient.post("/auth/register/", payload),
  login: (payload) => apiClient.post("/auth/login/", payload),
  refresh: (refresh) => apiClient.post("/auth/refresh/", { refresh }),
  logout: (refresh) => apiClient.post("/auth/logout/", { refresh }),
  forgotPassword: (payload) => apiClient.post("/auth/forgot-password/", payload),
  resetPassword: (payload) => apiClient.post("/auth/reset-password/", payload),
  verifyEmail: (payload) => apiClient.post("/auth/verify-email/", payload),
  resendVerification: (payload) => apiClient.post("/auth/resend-verification/", payload),
  changePassword: (payload) => apiClient.post("/auth/change-password/", payload),
  profile: () => apiClient.get("/auth/profile/"),
  updateProfile: (payload) => apiClient.patch("/auth/profile/", payload),
};
