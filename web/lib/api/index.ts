import { NextRequest } from "next/server";

import axios from "axios";

import { BASE_URL } from "../constants";

export async function callApi<T>(
  endpoint: string,
  req?: NextRequest,
  headers?: Record<string, string>,
): Promise<{ data: T | null; ok: boolean; status: number }> {
  const url = new URL(endpoint, BASE_URL).toString();
  if (req) {
    const cookie = req.headers.get("cookie");
    if (cookie) {
      headers = headers || {};
      headers.Cookie = cookie;
    }
  }

  const res = await axios.get<T>(url, {
    withCredentials: true,
    headers,
  });

  return { data: res.data, ok: res.status === 200, status: res.status };
}

export async function callPostApi<T>(
  endpoint: string,
  payload: unknown,
  req?: NextRequest,
  headers?: Record<string, string>,
): Promise<{ data: T | null; ok: boolean; status: number }> {
  const url = new URL(endpoint, BASE_URL).toString();
  if (req) {
    const cookie = req.headers.get("cookie");
    if (cookie) {
      headers = headers || {};
      headers.Cookie = cookie;
    }
  }

  const res = await axios.post<T>(url, payload, {
    withCredentials: true,
    headers,
  });

  return { data: res.data, ok: res.status === 200, status: res.status };
}
