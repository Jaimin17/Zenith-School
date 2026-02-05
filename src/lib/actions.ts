"use server";

import { api } from "@/api/api";
import { SAVE_TEACHER_API, UPDATE_TEACHER_API } from "@/api/apiParams/admin";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "@/constants/appConstants";

type FormState = {
  success: boolean;
  error: boolean;
  message?: string;
};

type FormDataType = Record<string, any>;

async function handleFormAction(
  action: (formData: FormDataType) => Promise<FormState>,
  formData: FormDataType
): Promise<FormState> {
  try {
    return await action(formData);
  } catch (error) {
    console.error("Form action error:", error);
    return { success: false, error: true };
  }
}

// Student actions
export async function createStudent(formData: FormDataType): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Creating student:", formData);
  return { success: true, error: false };
}

export async function updateStudent(formData: FormDataType): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Updating student:", formData);
  return { success: true, error: false };
}

export async function deleteStudent(formData: FormDataType): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting student:", formData);
  return { success: true, error: false };
}

// Teacher actions
export async function createTeacher(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();
    
    // Map form fields to API expected fields
    apiFormData.append("username", formData.username || "");
    apiFormData.append("first_name", formData.first_name || "");
    apiFormData.append("last_name", formData.last_name || "");
    apiFormData.append("email", formData.email || "");
    apiFormData.append("phone", formData.phone || "");
    apiFormData.append("address", formData.address || "");
    apiFormData.append("blood_type", formData.blood_type || "");
    apiFormData.append("sex", formData.sex || "");
    apiFormData.append("dob", formData.dob || "");
    apiFormData.append("password", formData.password || "");
    
    // Convert subjects array to comma-separated string
    const subjects = Array.isArray(formData.subjects) 
      ? formData.subjects.join(",") 
      : formData.subjects || "";
    apiFormData.append("subjects", subjects);

    // Handle image if provided
    if (formData.img && formData.img instanceof File) {
      apiFormData.append("img", formData.img);
    }

    const response = await api({
      endpoint: SAVE_TEACHER_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { 
        success: false, 
        error: true, 
        message: response.message || "Failed to create teacher" 
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating teacher:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateTeacher(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();
    
    // Include ID for update
    apiFormData.append("id", formData.id || "");
    apiFormData.append("username", formData.username || "");
    apiFormData.append("first_name", formData.first_name || "");
    apiFormData.append("last_name", formData.last_name || "");
    apiFormData.append("email", formData.email || "");
    apiFormData.append("phone", formData.phone || "");
    apiFormData.append("address", formData.address || "");
    apiFormData.append("blood_type", formData.blood_type || "");
    apiFormData.append("sex", formData.sex || "");
    apiFormData.append("dob", formData.dob || "");
    
    // Convert subjects array to comma-separated string
    const subjects = Array.isArray(formData.subjects) 
      ? formData.subjects.join(",") 
      : formData.subjects || "";
    apiFormData.append("subjects", subjects);

    // Handle image if provided
    if (formData.img && formData.img instanceof File) {
      apiFormData.append("img", formData.img);
    }

    const response = await api({
      endpoint: UPDATE_TEACHER_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { 
        success: false, 
        error: true, 
        message: response.message || "Failed to update teacher" 
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating teacher:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deleteTeacher(formData: FormDataType): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting teacher:", formData);
  return { success: true, error: false };
}

// Subject actions
export async function createSubject(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Creating subject:", formData);
  return { success: true, error: false };
}

export async function updateSubject(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Updating subject:", formData);
  return { success: true, error: false };
}

export async function deleteSubject(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting subject:", formData);
  return { success: true, error: false };
}

// Class actions
export async function createClass(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Creating class:", formData);
  return { success: true, error: false };
}

export async function updateClass(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Updating class:", formData);
  return { success: true, error: false };
}

export async function deleteClass(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting class:", formData);
  return { success: true, error: false };
}

// Exam actions
export async function createExam(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Creating exam:", formData);
  return { success: true, error: false };
}

export async function updateExam(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Updating exam:", formData);
  return { success: true, error: false };
}

export async function deleteExam(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting exam:", formData);
  return { success: true, error: false };
}

// Announcement actions
export async function createAnnouncement(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Creating announcement:", formData);
  return { success: true, error: false };
}

export async function updateAnnouncement(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Updating announcement:", formData);
  return { success: true, error: false };
}

export async function deleteAnnouncement(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting announcement:", formData);
  return { success: true, error: false };
}

// Event actions
export async function createEvent(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Creating event:", formData);
  return { success: true, error: false };
}

export async function updateEvent(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Updating event:", formData);
  return { success: true, error: false };
}

export async function deleteEvent(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting event:", formData);
  return { success: true, error: false };
}

// Assignment actions
export async function createAssignment(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Creating assignment:", formData);
  return { success: true, error: false };
}

export async function updateAssignment(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Updating assignment:", formData);
  return { success: true, error: false };
}

export async function deleteAssignment(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting assignment:", formData);
  return { success: true, error: false };
}

// Result actions
export async function createResult(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Creating result:", formData);
  return { success: true, error: false };
}

export async function updateResult(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Updating result:", formData);
  return { success: true, error: false };
}

export async function deleteResult(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting result:", formData);
  return { success: true, error: false };
}
