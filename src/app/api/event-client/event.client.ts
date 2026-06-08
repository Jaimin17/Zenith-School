"use client";

import { apiUrls } from "@/constants/apiUrls";
import type { FormState } from "@/lib/actions";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createEventClient(formData: FormData, token: string): Promise<FormState> {
  try {
    const apiFormData = new FormData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const start_date = formData.get("start_date") as string;
    const start_time_field = formData.get("start_time") as string;
    const end_date = formData.get("end_date") as string;
    const end_time_field = formData.get("end_time") as string;
    const class_id = formData.get("class_id") as string;

    const start_time = `${start_date}T${start_time_field}:00`;
    const end_time = `${end_date}T${end_time_field}:00`;

    apiFormData.append("title", title || "");
    apiFormData.append("description", description || "");
    apiFormData.append("start_time", start_time);
    apiFormData.append("end_time", end_time);

    if (class_id && class_id.trim() !== "") {
      apiFormData.append("class_id", class_id);
    }

    const imgEntries = formData.getAll("img");
    for (const file of imgEntries) {
      if (file instanceof File && file.size > 0) {
        apiFormData.append("img", file);
      }
    }

    // ✅ Goes directly to Railway, bypasses Vercel
    const response = await fetch(`${BASE_URL}${apiUrls.SAVE_EVENT_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ Don't set Content-Type — fetch sets multipart boundary automatically
      },
      body: apiFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: true, message: data.detail || "Failed to create event" };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateEventClient(formData: FormData, token: string): Promise<FormState> {
  try {
    const apiFormData = new FormData();

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const start_date = formData.get("start_date") as string;
    const start_time_field = formData.get("start_time") as string;
    const end_date = formData.get("end_date") as string;
    const end_time_field = formData.get("end_time") as string;
    const class_id = formData.get("class_id") as string;

    const start_time = `${start_date}T${start_time_field}:00`;
    const end_time = `${end_date}T${end_time_field}:00`;

    apiFormData.append("id", id || "");
    apiFormData.append("title", title || "");
    apiFormData.append("description", description || "");
    apiFormData.append("start_time", start_time);
    apiFormData.append("end_time", end_time);

    if (class_id && class_id.trim() !== "") {
      apiFormData.append("class_id", class_id);
    }

    const imgEntries = formData.getAll("img");
    for (const file of imgEntries) {
      if (file instanceof File && file.size > 0) {
        apiFormData.append("img", file);
      }
    }

    // ✅ Goes directly to Railway, bypasses Vercel
    const response = await fetch(`${BASE_URL}${apiUrls.UPDATE_EVENT_URL}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: apiFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: true, message: data.detail || "Failed to update event" };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}