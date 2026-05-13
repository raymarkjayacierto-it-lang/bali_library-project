const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

type ApiResource = 'books' | 'users' | 'transactions' | 'fines' | 'notifications' | 'reservations'

async function request<T>(resource: ApiResource, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')

  const response = await fetch(`${API_BASE_URL}/api/${resource}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const api = {
  list: <T>(resource: ApiResource) => request<T[]>(resource),
  create: <T>(resource: ApiResource, data: unknown) => request<T>(resource, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: <T>(resource: ApiResource, id: string, data: Record<string, unknown>) => request<T>(resource, {
    method: 'PUT',
    body: JSON.stringify({ id, ...data }),
  }),
  remove: (resource: ApiResource, id: string) => request<{ success: boolean }>(resource, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  }),
}
