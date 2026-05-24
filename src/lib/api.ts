const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
const AI_URL = process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('accessToken');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Study Plans
  async getStudyPlans() {
    return this.request<ApiResponse<any[]>>('/study-plans');
  }

  async createStudyPlan(data: any) {
    return this.request<ApiResponse<any>>('/study-plans', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateStudyPlan(id: number, data: any) {
    return this.request<ApiResponse<any>>(`/study-plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteStudyPlan(id: number) {
    return this.request<ApiResponse<void>>(`/study-plans/${id}`, {
      method: 'DELETE',
    });
  }

  // Workspaces
  async getWorkspaces() {
    return this.request<ApiResponse<any[]>>('/workspaces');
  }

  async createWorkspace(data: any) {
    return this.request<ApiResponse<any>>('/workspaces', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateWorkspace(id: number, data: any) {
    return this.request<ApiResponse<any>>(`/workspaces/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteWorkspace(id: number) {
    return this.request<ApiResponse<void>>(`/workspaces/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async getAnalytics() {
    return this.request<ApiResponse<any>>('/analytics/dashboard');
  }

  async getStudyTrends(days: number = 30) {
    return this.request<ApiResponse<any>>(`/analytics/trends?days=${days}`);
  }

  // Gamification
  async getAchievements() {
    return this.request<ApiResponse<any[]>>('/gamification/achievements');
  }

  async getUserAchievements() {
    return this.request<ApiResponse<any[]>>('/gamification/user/achievements');
  }

  async getUserProgress() {
    return this.request<ApiResponse<any>>('/gamification/progress');
  }

  async updateProgress(activityType: string, value: number) {
    return this.request<ApiResponse<any>>('/gamification/progress', {
      method: 'POST',
      body: JSON.stringify({ activityType, value }),
    });
  }

  // Study Sessions
  async getStudySessions() {
    return this.request<ApiResponse<any[]>>('/study-sessions');
  }

  async createStudySession(data: any) {
    return this.request<ApiResponse<any>>('/study-sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async completeStudySession(id: number) {
    return this.request<ApiResponse<any>>(`/study-sessions/${id}/complete`, {
      method: 'POST',
    });
  }

  // Onboarding
  async startOnboarding() {
    return this.request<ApiResponse<any>>('/onboarding/start', {
      method: 'POST',
    });
  }

  async updateOnboarding(data: any) {
    return this.request<ApiResponse<any>>('/onboarding/update', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getOnboardingStatus() {
    return this.request<ApiResponse<any>>('/onboarding/status');
  }

  async skipOnboarding() {
    return this.request<ApiResponse<any>>('/onboarding/skip', {
      method: 'POST',
    });
  }

  // AI Context
  async getAIContext() {
    return this.request<ApiResponse<any>>('/ai-context');
  }

  async storeAIContext(data: any) {
    return this.request<ApiResponse<any>>('/ai-context', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getChatHistory(sessionId: string) {
    return this.request<ApiResponse<any[]>>(`/ai-context/history/${sessionId}`);
  }

  // Reminders
  async getReminders() {
    return this.request<ApiResponse<any[]>>('/reminders');
  }

  async createReminder(data: any) {
    return this.request<ApiResponse<any>>('/reminders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async completeReminder(id: number) {
    return this.request<ApiResponse<any>>(`/reminders/${id}/complete`, {
      method: 'POST',
    });
  }

  async deleteReminder(id: number) {
    return this.request<ApiResponse<void>>(`/reminders/${id}`, {
      method: 'DELETE',
    });
  }
}

class AIClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${AI_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error('AI request failed');
    }

    return response.json();
  }

  async generateStudyPlan(data: any) {
    return this.request<any>('/notes/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateQuiz(data: any) {
    return this.request<any>('/quiz/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateFlashcards(data: any) {
    return this.request<any>('/flashcards/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async semanticSearch(data: any) {
    return this.request<any>('/search/hybrid', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async chat(data: any) {
    return this.request<any>('/chat/message', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient();
export const aiApi = new AIClient();
