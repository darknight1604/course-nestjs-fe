import { config } from "@app/config";
import type { AuthResponse } from "@app/types";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

class HttpClient {
  private instance: AxiosInstance;
  private accessToken: string | null = null;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ✅ Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Example: attach token from localStorage
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data; // unwrap data directly
      },
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await this.refreshToken();
            return this.instance.request(error.config);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  // GET
  public get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.get(url, config);
  }

  // POST
  public post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config);
  }

  // PUT
  public put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config);
  }

  // PATCH
  public patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.patch(url, data, config);
  }

  // DELETE
  public delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.delete(url, config);
  }

  async refreshToken(): Promise<AuthResponse> {
    const response: AuthResponse = await this.instance.post(
      "/auth/refresh-token"
    );
    this.accessToken = response.accessToken;
    return response;
  }
}

export const apiClient = new HttpClient(config.apiBaseUrl);
