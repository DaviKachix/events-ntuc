import type { ApiResponse } from "@/types/api";
import type { Event } from "@/types/event";

export const API = "https://157.180.17.101:8443/api/v1";

type RequestOptions = RequestInit & {
  timeout?: number;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T | null> {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, options.timeout || 15000);

  try {
    const res = await fetch(`${API}${endpoint}`, {
      ...options,
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const text = await res.text();

    if (!text) {
      console.error("Empty response from API");
      return null;
    }

    let json: ApiResponse<T>;

    try {
      json = JSON.parse(text);
    } catch (parseError) {
      console.error("Invalid JSON response:", parseError);
      console.error(text);
      return null;
    }

    if (!res.ok) {
      console.error("HTTP Error:", res.status, json.message);
      return null;
    }

    if (!json.success) {
      console.error("API Error:", json.message);
      return null;
    }

    return json.data;
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.error("Request timeout");
    } else {
      console.error("Request failed:", error);
    }

    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/* =========================
   EVENTS
========================= */

export async function getEvents() {
  return request<Event[]>("/events");
}

export async function getEvent(slug: string) {
  if (!slug) {
    console.error("Missing event slug");
    return null;
  }

  return request<Event>(`/events/${slug}`);
}

/* =========================
   REGISTRATIONS
========================= */

export async function registerEvent(
  id: number,
  data: Record<string, any>
) {
  if (!id) {
    console.error("Missing event ID");
    return null;
  }

  return request<any>(`/registrations/register/${id}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}