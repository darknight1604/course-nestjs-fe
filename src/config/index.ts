type AppConfig = {
  apiBaseUrl: string;
};

export const config: AppConfig = {
  apiBaseUrl: import.meta.env.API_BASE_URL || "http://localhost:3000",
};
