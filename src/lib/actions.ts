"use server";

import { api } from "@/api/api";
import { SAVE_TEACHER_API, UPDATE_TEACHER_API, SAVE_STUDENT_API, UPDATE_STUDENT_API, SAVE_PARENT_API, UPDATE_PARENT_API, SAVE_SUBJECT_API, UPDATE_SUBJECT_API, SAVE_CLASS_API, UPDATE_CLASS_API, SAVE_LESSON_API, UPDATE_LESSON_API, SAVE_EXAM_API, UPDATE_EXAM_API, SAVE_ASSIGNMENT_API, UPDATE_ASSIGNMENT_API, SAVE_RESULT_API, UPDATE_RESULT_API } from "@/api/apiParams/admin";
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
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();
    
    // Map form fields to API expected fields
    apiFormData.append("username", formData.username || "");
    apiFormData.append("first_name", formData.first_name || "");
    apiFormData.append("last_name", formData.last_name || "");
    apiFormData.append("email", formData.email || "");
    apiFormData.append("password", formData.password || "");
    apiFormData.append("phone", formData.phone || "");
    apiFormData.append("address", formData.address || "");
    apiFormData.append("blood_type", formData.blood_type || "");
    apiFormData.append("sex", formData.sex || "");
    apiFormData.append("dob", formData.dob || "");
    apiFormData.append("parent_id", formData.parent_id || "");
    apiFormData.append("class_id", formData.class_id || "");
    apiFormData.append("grade_id", formData.grade_id || "");

    // Handle image if provided
    if (formData.img && formData.img instanceof File) {
      apiFormData.append("img", formData.img);
    }

    const response = await api({
      endpoint: SAVE_STUDENT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { 
        success: false, 
        error: true, 
        message: response.message || "Failed to create student" 
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating student:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateStudent(formData: FormDataType): Promise<FormState> {
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
    apiFormData.append("parent_id", formData.parent_id || "");
    apiFormData.append("class_id", formData.class_id || "");
    apiFormData.append("grade_id", formData.grade_id || "");

    // Handle image if provided
    if (formData.img && formData.img instanceof File) {
      apiFormData.append("img", formData.img);
    }

    const response = await api({
      endpoint: UPDATE_STUDENT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { 
        success: false, 
        error: true, 
        message: response.message || "Failed to update student" 
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating student:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
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

// Parent actions
export async function createParent(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();
    
    // Map form fields to API expected fields
    apiFormData.append("username", formData.username || "");
    apiFormData.append("first_name", formData.first_name || "");
    apiFormData.append("last_name", formData.last_name || "");
    apiFormData.append("email", formData.email || "");
    apiFormData.append("password", formData.password || "");
    apiFormData.append("phone", formData.phone || "");
    apiFormData.append("address", formData.address || "");

    const response = await api({
      endpoint: SAVE_PARENT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { 
        success: false, 
        error: true, 
        message: response.message || "Failed to create parent" 
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating parent:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateParent(formData: FormDataType): Promise<FormState> {
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

    const response = await api({
      endpoint: UPDATE_PARENT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { 
        success: false, 
        error: true, 
        message: response.message || "Failed to update parent" 
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating parent:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deleteParent(formData: FormDataType): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting parent:", formData);
  return { success: true, error: false };
}

// Subject actions
export async function createSubject(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();
    
    // Map form fields to API expected fields
    apiFormData.append("name", formData.name || "");

    const teachers = Array.isArray(formData.teachers) 
      ? formData.teachers.join(",") 
      : formData.teachers || "";
    apiFormData.append("teachers", teachers);

    const response = await api({
      endpoint: SAVE_SUBJECT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { 
        success: false, 
        error: true, 
        message: response.message || "Failed to create subject" 
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating subject:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateSubject(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();
    
    // Include ID for update
    apiFormData.append("id", formData.id || "");
    apiFormData.append("name", formData.name || "");

    const teachers = Array.isArray(formData.teachers) 
      ? formData.teachers.join(",") 
      : formData.teachers || "";
    apiFormData.append("teachers", teachers);

    const response = await api({
      endpoint: UPDATE_SUBJECT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { 
        success: false, 
        error: true, 
        message: response.message || "Failed to update subject" 
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating subject:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deleteSubject(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting subject:", formData);
  return { success: true, error: false };
}

// Class actions
export async function createClass(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();
    
    // Map form fields to API expected fields
    apiFormData.append("name", formData.name || "");
    apiFormData.append("capacity", formData.capacity || 0);
    apiFormData.append("supervisorId", formData.supervisorId || "");
    apiFormData.append("gradeId", formData.gradeId || "");

    const response = await api({
      endpoint: SAVE_CLASS_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { 
        success: false, 
        error: true, 
        message: response.message || "Failed to create class" 
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating class:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateClass(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();
    
    // Include ID for update
    apiFormData.append("id", formData.id || "");
    apiFormData.append("name", formData.name || "");
    apiFormData.append("capacity", formData.capacity || 0);
    apiFormData.append("supervisorId", formData.supervisorId || "");
    apiFormData.append("gradeId", formData.gradeId || "");

    const response = await api({
      endpoint: UPDATE_CLASS_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { 
        success: false, 
        error: true, 
        message: response.message || "Failed to update class" 
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating class:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deleteClass(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting class:", formData);
  return { success: true, error: false };
}

// Lesson actions
export async function createLesson(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    apiFormData.append("name", formData.name || "");
    apiFormData.append("day", formData.day || "");
    apiFormData.append("start_time", formData.start_time || "");
    apiFormData.append("end_time", formData.end_time || "");
    apiFormData.append("subject_id", formData.subject_id || "");
    apiFormData.append("class_id", formData.class_id || "");
    apiFormData.append("teacher_id", formData.teacher_id || "");

    const response = await api({
      endpoint: SAVE_LESSON_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to create lesson",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating lesson:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateLesson(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    apiFormData.append("id", formData.id || "");
    apiFormData.append("name", formData.name || "");
    apiFormData.append("day", formData.day || "");
    apiFormData.append("start_time", formData.start_time || "");
    apiFormData.append("end_time", formData.end_time || "");
    apiFormData.append("subject_id", formData.subject_id || "");
    apiFormData.append("class_id", formData.class_id || "");
    apiFormData.append("teacher_id", formData.teacher_id || "");

    const response = await api({
      endpoint: UPDATE_LESSON_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to update lesson",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating lesson:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deleteLesson(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting lesson:", formData);
  return { success: true, error: false };
}

// Exam actions
export async function createExam(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    apiFormData.append("title", formData.title || "");
    apiFormData.append("start_time", formData.start_time || "");
    apiFormData.append("end_time", formData.end_time || "");
    apiFormData.append("lesson_id", formData.lesson_id || "");

    const response = await api({
      endpoint: SAVE_EXAM_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to create exam",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating exam:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateExam(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    apiFormData.append("id", formData.id || "");
    apiFormData.append("title", formData.title || "");
    apiFormData.append("start_time", formData.start_time || "");
    apiFormData.append("end_time", formData.end_time || "");
    apiFormData.append("lesson_id", formData.lesson_id || "");

    const response = await api({
      endpoint: UPDATE_EXAM_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to update exam",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating exam:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
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
export async function createAssignment(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    apiFormData.append("title", formData.title || "");
    apiFormData.append("description", formData.description || "");
    apiFormData.append("start_date", formData.start_date || "");
    apiFormData.append("end_date", formData.end_date || "");
    apiFormData.append("lesson_id", formData.lesson_id || "");

    // Handle PDF file if provided
    if (formData.pdf && formData.pdf instanceof File) {
      apiFormData.append("pdf", formData.pdf);
    }

    const response = await api({
      endpoint: SAVE_ASSIGNMENT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to create assignment",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating assignment:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateAssignment(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    apiFormData.append("id", formData.id || "");
    apiFormData.append("title", formData.title || "");
    apiFormData.append("description", formData.description || "");
    apiFormData.append("start_date", formData.start_date || "");
    apiFormData.append("end_date", formData.end_date || "");
    apiFormData.append("lesson_id", formData.lesson_id || "");

    // Handle PDF file if provided (optional for update)
    if (formData.pdf && formData.pdf instanceof File) {
      apiFormData.append("pdf", formData.pdf);
    }

    const response = await api({
      endpoint: UPDATE_ASSIGNMENT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to update assignment",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating assignment:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deleteAssignment(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting assignment:", formData);
  return { success: true, error: false };
}

// Result actions
export async function createResult(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    apiFormData.append("score", formData.score?.toString() || "");
    apiFormData.append("student_id", formData.student_id || "");
    
    // Only include exam_id or assignment_id, not both
    if (formData.exam_id && formData.exam_id !== "") {
      apiFormData.append("exam_id", formData.exam_id);
    }
    if (formData.assignment_id && formData.assignment_id !== "") {
      apiFormData.append("assignment_id", formData.assignment_id);
    }

    const response = await api({
      endpoint: SAVE_RESULT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to create result",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating result:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateResult(formData: FormDataType): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    apiFormData.append("id", formData.id || "");
    apiFormData.append("score", formData.score?.toString() || "");
    apiFormData.append("student_id", formData.student_id || "");
    
    // Only include exam_id or assignment_id, not both
    if (formData.exam_id && formData.exam_id !== "") {
      apiFormData.append("exam_id", formData.exam_id);
    }
    if (formData.assignment_id && formData.assignment_id !== "") {
      apiFormData.append("assignment_id", formData.assignment_id);
    }

    const response = await api({
      endpoint: UPDATE_RESULT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to update result",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating result:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deleteResult(formData: FormData): Promise<FormState> {
  // TODO: Implement actual API call
  console.log("Deleting result:", formData);
  return { success: true, error: false };
}
