/**
 * Centralized API Client with retry logic, token refresh, and error handling
 */
import { ApiResponse } from './api';

class ApiClient {
  private baseURL: string;
  private aiURL: string;
  private maxRetries: number = 3;
  private retryDelay: number = 1000;
  private tokenRefreshPromise: Promise<string> | null = null;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://105.190.134.41:8080/api';
    this.aiURL = process.env.NEXT_PUBLIC_AI_URL || 'http://105.190.134.41:8000';
  }

  private async getAccessToken(): Promise<string | null> {
    return localStorage.getItem('accessToken');
  }

  private async getRefreshToken(): Promise<string | null> {
    return localStorage.getItem('refreshToken');
  }

  private async refreshAccessToken(): Promise<string> {
    if (this.tokenRefreshPromise) {
      return this.tokenRefreshPromise;
    }

    this.tokenRefreshPromise = (async () => {
      try {
        const refreshToken = await this.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await fetch(`${this.baseURL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          throw new Error('Token refresh failed');
        }

        const data = await response.json();
        const newAccessToken = data.accessToken;
        
        localStorage.setItem('accessToken', newAccessToken);
        
        return newAccessToken;
      } catch (error) {
        // Clear tokens on refresh failure
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw error;
      } finally {
        this.tokenRefreshPromise = null;
      }
    })();

    return this.tokenRefreshPromise;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    useAI: boolean = false
  ): Promise<T> {
    const url = useAI ? `${this.aiURL}${endpoint}` : `${this.baseURL}${endpoint}`;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        let token = await this.getAccessToken();
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        };

        const response = await fetch(url, {
          ...options,
          headers,
        });

        // Handle 401 Unauthorized - try to refresh token
        if (response.status === 401 && !useAI) {
          try {
            token = await this.refreshAccessToken();
            
            // Retry with new token
            const headersWithNewToken: HeadersInit = {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              ...options.headers,
            };

            const retryResponse = await fetch(url, {
              ...options,
              headers: headersWithNewToken,
            });

            if (!retryResponse.ok) {
              throw new Error(`Request failed with status ${retryResponse.status}`);
            }

            return retryResponse.json();
          } catch (refreshError) {
            // Token refresh failed, redirect to login
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            throw new Error('Session expired. Please login again.');
          }
        }

        if (!response.ok) {
          const error = await response.json().catch(() => ({ message: 'Request failed' }));
          throw new Error(error.message || `Request failed with status ${response.status}`);
        }

        return response.json();
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on 4xx errors (except 429 rate limit)
        if (error instanceof Error && error.message.includes('401')) {
          throw error;
        }

        // Retry on network errors or 5xx errors
        if (attempt < this.maxRetries) {
          await this.sleep(this.retryDelay * (attempt + 1));
          continue;
        }

        throw lastError;
      }
    }

    throw lastError || new Error('Request failed');
  }

  // Generic GET request
  async get<T>(endpoint: string, useAI: boolean = false): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, useAI);
  }

  // Generic POST request
  async post<T>(endpoint: string, data: any, useAI: boolean = false): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }, useAI);
  }

  // Generic PUT request
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Generic DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // File upload
  async upload<T>(endpoint: string, file: File): Promise<T> {
    const token = await this.getAccessToken();
    const formData = new FormData();
    formData.append('file', file);

    const headers: HeadersInit = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    return response.json();
  }

  // Study Plans
  async getStudyPlans() {
    return this.get<ApiResponse<any[]>>('/study-plans');
  }

  async createStudyPlan(data: any) {
    return this.post<ApiResponse<any>>('/study-plans', data);
  }

  async updateStudyPlan(id: number, data: any) {
    return this.put<ApiResponse<any>>(`/study-plans/${id}`, data);
  }

  async deleteStudyPlan(id: number) {
    return this.delete<ApiResponse<void>>(`/study-plans/${id}`);
  }

  // Workspaces
  async getWorkspaces() {
    return this.get<ApiResponse<any[]>>('/workspaces');
  }

  async createWorkspace(data: any) {
    return this.post<ApiResponse<any>>('/workspaces', data);
  }

  // AI Chat
  async chat(message: string, conversationId?: string) {
    return this.post<ApiResponse<any>>('/chat', { message, conversationId }, true);
  }

  // AI Predictions
  async predict(features: number[]) {
    return this.post<ApiResponse<any>>('/inference/predict', { features }, true);
  }

  // AI Image Analysis
  async analyzeImage(file: File) {
    return this.upload<ApiResponse<any>>('/inference/analyze-image', file);
  }
}

// Singleton instance
const apiClient = new ApiClient();

export default apiClient;
