const BASE_URL = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://axios-2mom.onrender.com/api' : 'http://localhost:5000/api');

// Extract token from cookie
const getToken = (): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
  return match ? match[1] : null;
};

type ApiClientConfig = Omit<RequestInit, 'headers'> & { headers?: HeadersInit };
type ApiResponse<T> = { data: T };

const fetchClient = async <T = unknown>(endpoint: string, options: ApiClientConfig = {}): Promise<ApiResponse<T>> => {
  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  };

  // Skip Content-Type if it's multipart/form-data
  const headersRecord = options.headers && typeof options.headers === 'object' ? (options.headers as Record<string, string>) : null;
  if (headersRecord && headersRecord['Content-Type'] === 'multipart/form-data') {
    (config.headers as Record<string, string>)['Content-Type'] = undefined as unknown as string;
    delete (config.headers as Record<string, string>)['Content-Type'];
  }

  const response = await fetch(url, config);

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    data = { error: 'Unknown API error' };
  }

  if (!response.ok) {
    const maybeObj = data as { error?: string } | null;
    console.error('API Error:', maybeObj?.error || 'Unknown Error');
    return Promise.reject({ response: { data } });
  }

  return { data: data as T };
};

const apiClient = {
  get: <T = unknown>(url: string) => fetchClient<T>(url, { method: 'GET' }),
  post: <T = unknown>(url: string, body?: unknown, config?: ApiClientConfig) => {
    const isFormData = body instanceof FormData;
    return fetchClient<T>(url, {
      method: 'POST',
      body: isFormData ? body : JSON.stringify(body),
      ...config
    });
  },
  put: <T = unknown>(url: string, body?: unknown) => fetchClient<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body)
  }),
  delete: <T = unknown>(url: string) => fetchClient<T>(url, { method: 'DELETE' }),
};

export default apiClient;
