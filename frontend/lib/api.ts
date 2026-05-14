import type { ApiResponse } from "@/types/api";
import type { Event } from "@/types/event";

export const API = "http://157.180.17.101:5001/api/v1";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    cache: "no-store",
  });

  const text = await res.text();

  if (!text) {
    throw new Error("Empty response from API");
  }

  const json = JSON.parse(text) as ApiResponse<T>;

  if (!json.success) {
    throw new Error(json.message || "API Error");
  }

  return json.data;
}

// EVENTS
export function getEvents() {
  return request<Event[]>(`${API}/events`);
}

export function getEvent(slug: string) {
  return request<Event>(`${API}/events/${slug}`);
}

// REGISTER
export function registerEvent(id: number, data: any) {
  return request<any>(`${API}/registrations/register/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}