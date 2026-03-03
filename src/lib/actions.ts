"use server";

import { api } from "@/api/api";
import { SAVE_TEACHER_API, UPDATE_TEACHER_API, SAVE_STUDENT_API, UPDATE_STUDENT_API, SAVE_PARENT_API, UPDATE_PARENT_API, SAVE_SUBJECT_API, UPDATE_SUBJECT_API, SAVE_CLASS_API, UPDATE_CLASS_API, SAVE_LESSON_API, UPDATE_LESSON_API, DELETE_LESSON_API, SAVE_EXAM_API, UPDATE_EXAM_API, DELETE_EXAM_API, SAVE_ASSIGNMENT_API, UPDATE_ASSIGNMENT_API, DELETE_ASSIGNMENT_API, SAVE_RESULT_API, UPDATE_RESULT_API, SAVE_EVENT_API, UPDATE_EVENT_API, SAVE_ANNOUNCEMENT_API, UPDATE_ANNOUNCEMENT_API, DELETE_STUDENT_API, DELETE_PARENT_API, DELETE_SUBJECT_API, DELETE_CLASS_API, DELETE_RESULT_API, DELETE_EVENT_API, DELETE_ANNOUNCEMENT_API, SAVE_BANNER_API, UPDATE_BANNER_API, DELETE_BANNER_API, TOGGLE_BANNER_ACTIVE_API, SAVE_PHOTO_GALLERY_API, UPDATE_PHOTO_GALLERY_API, DELETE_PHOTO_GALLERY_API, TOGGLE_PHOTO_GALLERY_ACTIVE_API, SAVE_TESTIMONIAL_API, UPDATE_TESTIMONIAL_API, DELETE_TESTIMONIAL_API, TOGGLE_TESTIMONIAL_ACTIVE_API } from "@/api/apiParams/admin";
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
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    if (!token) {
      return {
        success: false,
        error: true,
        message: "Unauthorized: No authentication token found",
      };
    }

    // Extract ID from FormData object properly
    const studentId = formData instanceof FormData 
      ? formData.get("id") 
      : formData.id;

    if (!studentId) {
      return {
        success: false,
        error: true,
        message: "Student ID is required",
      };
    }

    console.log("Initiating student delete with ID:", studentId);

    // For DELETE requests, pass the ID as a query parameter
    const deleteApiWithId = {
      ...DELETE_STUDENT_API,
      url: `${DELETE_STUDENT_API.url}?id=${studentId}`,
    };

    const response = await api({
      endpoint: deleteApiWithId,
      payloadData: null,
      serverToken: token,
      isServer: true,
    });

    console.log("Delete student result:", response);

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete student",
      };
    }

    return {
      success: true,
      error: false,
      message: response.message || "Student deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting student:", error);
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred while deleting student",
    };
  }
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
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    if (!token) {
      return {
        success: false,
        error: true,
        message: "Unauthorized: No authentication token found",
      };
    }

    // Extract ID from FormData object properly
    const teacherId = formData instanceof FormData 
      ? formData.get("id") 
      : formData.id;

    if (!teacherId) {
      return {
        success: false,
        error: true,
        message: "Teacher ID is required",
      };
    }

    console.log("Initiating delete with ID:", teacherId);

    // Import the DELETE_TEACHER_API
    const { DELETE_TEACHER_API } = await import("@/api/apiParams/admin");
    const { api } = await import("@/api/api");

    // For DELETE requests, pass the ID as a query parameter
    const deleteApiWithId = {
      ...DELETE_TEACHER_API,
      url: `${DELETE_TEACHER_API.url}?id=${teacherId}`, // Append ID as query parameter
    };

    const response = await api({
      endpoint: deleteApiWithId,
      payloadData: null,
      serverToken: token,
      isServer: true,
    });

    console.log("Delete action result:", response);

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete teacher",
      };
    }

    return {
      success: true,
      error: false,
      message: response.message || "Teacher deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred while deleting teacher",
    };
  }
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
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    if (!token) {
      return {
        success: false,
        error: true,
        message: "Unauthorized: No authentication token found",
      };
    }

    // Extract ID from FormData object properly
    const parentId = formData instanceof FormData 
      ? formData.get("id") 
      : formData.id;

    if (!parentId) {
      return {
        success: false,
        error: true,
        message: "Parent ID is required",
      };
    }

    console.log("Initiating parent delete with ID:", parentId);

    // For DELETE requests, pass the ID as a query parameter
    const deleteApiWithId = {
      ...DELETE_PARENT_API,
      url: `${DELETE_PARENT_API.url}?id=${parentId}`,
    };

    const response = await api({
      endpoint: deleteApiWithId,
      payloadData: null,
      serverToken: token,
      isServer: true,
    });

    console.log("Delete parent result:", response);

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete parent",
      };
    }

    return {
      success: true,
      error: false,
      message: response.message || "Parent deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting parent:", error);
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred while deleting parent",
    };
  }
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
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    if (!token) {
      return {
        success: false,
        error: true,
        message: "Unauthorized: No authentication token found",
      };
    }

    // Extract ID from FormData object properly
    const subjectId = formData instanceof FormData 
      ? formData.get("id") 
      : (formData as any).id;

    if (!subjectId) {
      return {
        success: false,
        error: true,
        message: "Subject ID is required",
      };
    }

    console.log("Initiating subject delete with ID:", subjectId);

    // For DELETE requests, pass the ID as a query parameter
    const deleteApiWithId = {
      ...DELETE_SUBJECT_API,
      url: `${DELETE_SUBJECT_API.url}?id=${subjectId}`,
    };

    const response = await api({
      endpoint: deleteApiWithId,
      payloadData: null,
      serverToken: token,
      isServer: true,
    });

    console.log("Delete subject result:", response);

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete subject",
      };
    }

    return {
      success: true,
      error: false,
      message: response.message || "Subject deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting subject:", error);
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred while deleting subject",
    };
  }
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
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    if (!token) {
      return {
        success: false,
        error: true,
        message: "Unauthorized: No authentication token found",
      };
    }

    // Extract ID from FormData object properly
    const classId = formData instanceof FormData 
      ? formData.get("id") 
      : (formData as any).id;

    if (!classId) {
      return {
        success: false,
        error: true,
        message: "Class ID is required",
      };
    }

    console.log("Initiating class delete with ID:", classId);

    // For DELETE requests, pass the ID as a query parameter
    const deleteApiWithId = {
      ...DELETE_CLASS_API,
      url: `${DELETE_CLASS_API.url}?id=${classId}`,
    };

    const response = await api({
      endpoint: deleteApiWithId,
      payloadData: null,
      serverToken: token,
      isServer: true,
    });

    console.log("Delete class result:", response);

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete class",
      };
    }

    // Check if deletion was blocked due to enrolled students
    const data = response.data;
    if (data && data.students_affected > 0 && data.message?.includes("cannot be deleted")) {
      return {
        success: false,
        error: true,
        message: data.message || "Class cannot be deleted while students are enrolled. Please reassign or remove students first.",
      };
    }

    // Build detailed success message
    let successMessage = data?.message || "Class deleted successfully";
    if (data && (data.lessons_affected > 0 || data.events_affected > 0 || data.announcements_affected > 0)) {
      const parts = [];
      if (data.lessons_affected > 0) parts.push(`${data.lessons_affected} lesson(s)`);
      if (data.events_affected > 0) parts.push(`${data.events_affected} event(s)`);
      if (data.announcements_affected > 0) parts.push(`${data.announcements_affected} announcement(s)`);
      if (parts.length > 0) {
        successMessage = `Class deleted successfully. Also removed: ${parts.join(", ")}.`;
      }
    }

    return {
      success: true,
      error: false,
      message: successMessage,
    };
  } catch (error) {
    console.error("Error deleting class:", error);
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred while deleting class",
    };
  }
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
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    if (!token) {
      return {
        success: false,
        error: true,
        message: "Unauthorized: No authentication token found",
      };
    }

    // Extract ID from FormData object properly
    const lessonId = formData instanceof FormData 
      ? formData.get("id") 
      : (formData as any).id;

    if (!lessonId) {
      return {
        success: false,
        error: true,
        message: "Lesson ID is required",
      };
    }

    console.log("Initiating lesson delete with ID:", lessonId);

    // For DELETE requests, pass the ID as a query parameter
    const deleteApiWithId = {
      ...DELETE_LESSON_API,
      url: `${DELETE_LESSON_API.url}?id=${lessonId}`,
    };

    const response = await api({
      endpoint: deleteApiWithId,
      payloadData: null,
      serverToken: token,
      isServer: true,
    });

    console.log("Delete lesson result:", response);

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete lesson",
      };
    }

    // Build detailed success message based on affected records
    const data = response.data;
    let successMessage = data?.message || "Lesson deleted successfully";
    if (data && (data.exam_affected > 0 || data.assignment_affected > 0 || data.attendance_affected > 0)) {
      const parts = [];
      if (data.exam_affected > 0) parts.push(`${data.exam_affected} exam(s)`);
      if (data.assignment_affected > 0) parts.push(`${data.assignment_affected} assignment(s)`);
      if (data.attendance_affected > 0) parts.push(`${data.attendance_affected} attendance record(s)`);
      if (parts.length > 0) {
        successMessage = `Lesson deleted successfully. Also removed: ${parts.join(", ")}.`;
      }
    }

    return {
      success: true,
      error: false,
      message: successMessage,
    };
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred while deleting lesson",
    };
  }
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
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    if (!token) {
      return {
        success: false,
        error: true,
        message: "Unauthorized: No authentication token found",
      };
    }

    // Extract ID from FormData object properly
    const examId = formData instanceof FormData 
      ? formData.get("id") 
      : (formData as any).id;

    if (!examId) {
      return {
        success: false,
        error: true,
        message: "Exam ID is required",
      };
    }

    console.log("Initiating exam delete with ID:", examId);

    // For DELETE requests, pass the ID as a query parameter
    const deleteApiWithId = {
      ...DELETE_EXAM_API,
      url: `${DELETE_EXAM_API.url}?id=${examId}`,
    };

    const response = await api({
      endpoint: deleteApiWithId,
      payloadData: null,
      serverToken: token,
      isServer: true,
    });

    console.log("Delete exam result:", response);

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete exam",
      };
    }

    return {
      success: true,
      error: false,
      message: response.data?.message || "Exam deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting exam:", error);
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred while deleting exam",
    };
  }
}

// Announcement actions
export async function createAnnouncement(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const announcement_date = formData.get("announcement_date") as string;
    const class_id = formData.get("class_id") as string;
    const pdf = formData.get("attachment") as File | null;

    apiFormData.append("title", title || "");
    apiFormData.append("description", description || "");
    apiFormData.append("announcement_date", announcement_date || "");
    
    // Only append class_id if it has a value
    if (class_id && class_id.trim() !== "") {
      apiFormData.append("class_id", class_id);
    }

    // Handle PDF file if provided
    if (pdf && pdf instanceof File) {
      apiFormData.append("pdf", pdf);
    }

    const response = await api({
      endpoint: SAVE_ANNOUNCEMENT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to create announcement",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating announcement:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateAnnouncement(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const announcement_date = formData.get("announcement_date") as string;
    const class_id = formData.get("class_id") as string;
    const pdf = formData.get("attachment") as File | null;

    apiFormData.append("id", id || "");
    apiFormData.append("title", title || "");
    apiFormData.append("description", description || "");
    apiFormData.append("announcement_date", announcement_date || "");
    
    // Only append class_id if it has a value
    if (class_id && class_id.trim() !== "") {
      apiFormData.append("class_id", class_id);
    }

    // Handle PDF file if provided
    if (pdf && pdf instanceof File) {
      apiFormData.append("pdf", pdf);
    }

    const response = await api({
      endpoint: UPDATE_ANNOUNCEMENT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to update announcement",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating announcement:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deleteAnnouncement(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const id = formData.get("id") as string;
    console.log("Deleting announcement with ID:", id);

    const response = await api({
      endpoint: {
        ...DELETE_ANNOUNCEMENT_API,
        url: `${DELETE_ANNOUNCEMENT_API.url}?id=${id}`,
      },
      serverToken: token,
      isServer: true,
    });

    console.log("Delete announcement response:", response);

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete announcement",
      };
    }

    return {
      success: true,
      error: false,
      message: response.data?.message || "Announcement deleted successfully",
    };
  } catch (error) {
    console.error("Delete announcement error:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

// Event actions
export async function createEvent(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const start_date = formData.get("start_date") as string;
    const start_time_field = formData.get("start_time") as string;
    const end_date = formData.get("end_date") as string;
    const end_time_field = formData.get("end_time") as string;
    const class_id = formData.get("class_id") as string;

    // Combine date and time into ISO datetime format
    const start_time = `${start_date}T${start_time_field}:00`;
    const end_time = `${end_date}T${end_time_field}:00`;

    apiFormData.append("title", title || "");
    apiFormData.append("description", description || "");
    apiFormData.append("start_time", start_time);
    apiFormData.append("end_time", end_time);

    if (class_id && class_id.trim() !== "") {
      apiFormData.append("class_id", class_id);
    }

    // Append all uploaded images (field name must be 'img' to match API)
    const imgEntries = formData.getAll("img");
    for (const file of imgEntries) {
      if (file instanceof File && file.size > 0) {
        apiFormData.append("img", file);
      }
    }

    const response = await api({
      endpoint: SAVE_EVENT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { success: false, error: true, message: response.message || "Failed to create event" };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateEvent(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const start_date = formData.get("start_date") as string;
    const start_time_field = formData.get("start_time") as string;
    const end_date = formData.get("end_date") as string;
    const end_time_field = formData.get("end_time") as string;
    const class_id = formData.get("class_id") as string;

    // Combine date and time into ISO datetime format
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

    // Append all uploaded images (field name must be 'img' to match API)
    const imgEntries = formData.getAll("img");
    for (const file of imgEntries) {
      if (file instanceof File && file.size > 0) {
        apiFormData.append("img", file);
      }
    }

    const response = await api({
      endpoint: UPDATE_EVENT_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return { success: false, error: true, message: response.message || "Failed to update event" };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deleteEvent(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const id = formData.get("id") as string;
    console.log("Deleting event with ID:", id);

    const response = await api({
      endpoint: {
        ...DELETE_EVENT_API,
        url: `${DELETE_EVENT_API.url}?id=${id}`,
      },
      serverToken: token,
      isServer: true,
    });

    console.log("Delete event response:", response);

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete event",
      };
    }

    return {
      success: true,
      error: false,
      message: response.data?.message || "Event deleted successfully",
    };
  } catch (error) {
    console.error("Delete event error:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
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
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const id = formData.get("id") as string;
    console.log("Deleting assignment with ID:", id);

    const response = await api({
      endpoint: {
        ...DELETE_ASSIGNMENT_API,
        url: `${DELETE_ASSIGNMENT_API.url}?id=${id}`,
      },
      serverToken: token,
      isServer: true,
    });

    console.log("Delete assignment response:", response);

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete assignment",
      };
    }

    return {
      success: true,
      error: false,
      message: response.data?.message || "Assignment deleted successfully",
    };
  } catch (error) {
    console.error("Delete assignment error:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
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
    try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const id = formData.get("id") as string;
    console.log("Deleting result with ID:", id);

    const response = await api({
      endpoint: {
        ...DELETE_RESULT_API,
        url: `${DELETE_RESULT_API.url}?id=${id}`,
      },
      serverToken: token,
      isServer: true,
    });

    console.log("Delete result response:", response);

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete result",
      };
    }

    return {
      success: true,
      error: false,
      message: response.data?.message || "Result deleted successfully",
    };
  } catch (error) {
    console.error("Delete result error:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

// Banner actions
export async function createBanner(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const is_active = formData.get("is_active") as string;
    const image = formData.get("image") as File | null;

    apiFormData.append("title", title || "");
    apiFormData.append("description", description || "");
    apiFormData.append("is_active", is_active === "true" ? "true" : "false");

    if (image && image instanceof File) {
      apiFormData.append("image", image);
    }

    const response = await api({
      endpoint: SAVE_BANNER_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to create banner",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating banner:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateBanner(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const is_active = formData.get("is_active") as string;
    const image = formData.get("image") as File | null;

    apiFormData.append("id", id || "");
    apiFormData.append("title", title || "");
    apiFormData.append("description", description || "");
    apiFormData.append("is_active", is_active === "true" ? "true" : "false");

    if (image && image instanceof File && image.size > 0) {
      apiFormData.append("image", image);
    }

    const response = await api({
      endpoint: UPDATE_BANNER_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to update banner",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating banner:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deleteBanner(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const id = formData.get("id") as string;

    const response = await api({
      endpoint: {
        ...DELETE_BANNER_API,
        url: `${DELETE_BANNER_API.url}?id=${id}`,
      },
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete banner",
      };
    }

    return {
      success: true,
      error: false,
      message: response.data?.message || "Banner deleted successfully",
    };
  } catch (error) {
    console.error("Delete banner error:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function toggleBannerActive(bannerId: string): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const response = await api({
      endpoint: {
        ...TOGGLE_BANNER_ACTIVE_API,
        url: `${TOGGLE_BANNER_ACTIVE_API.url}?id=${bannerId}`,
      },
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to toggle banner status",
      };
    }

    return {
      success: true,
      error: false,
      message: response.data?.message || "Banner status updated successfully",
    };
  } catch (error) {
    console.error("Toggle banner active error:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

// Photo Gallery actions
export async function createPhotoGallery(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const is_active = formData.get("is_active") as string;
    const image = formData.get("image") as File | null;

    apiFormData.append("title", title || "");
    apiFormData.append("description", description || "");
    apiFormData.append("is_active", is_active === "true" ? "true" : "false");

    if (image && image instanceof File) {
      apiFormData.append("image", image);
    }

    const response = await api({
      endpoint: SAVE_PHOTO_GALLERY_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to create photo",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating photo:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updatePhotoGallery(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const apiFormData = new FormData();

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const is_active = formData.get("is_active") as string;
    const image = formData.get("image") as File | null;

    apiFormData.append("id", id || "");
    apiFormData.append("title", title || "");
    apiFormData.append("description", description || "");
    apiFormData.append("is_active", is_active === "true" ? "true" : "false");

    if (image && image instanceof File && image.size > 0) {
      apiFormData.append("image", image);
    }

    const response = await api({
      endpoint: UPDATE_PHOTO_GALLERY_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to update photo",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating photo:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deletePhotoGallery(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const id = formData.get("id") as string;

    const response = await api({
      endpoint: {
        ...DELETE_PHOTO_GALLERY_API,
        url: `${DELETE_PHOTO_GALLERY_API.url}?id=${id}`,
      },
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete photo",
      };
    }

    return {
      success: true,
      error: false,
      message: response.data?.message || "Photo deleted successfully",
    };
  } catch (error) {
    console.error("Delete photo error:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function togglePhotoGalleryActive(photoId: string): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const response = await api({
      endpoint: {
        ...TOGGLE_PHOTO_GALLERY_ACTIVE_API,
        url: `${TOGGLE_PHOTO_GALLERY_ACTIVE_API.url}?id=${photoId}`,
      },
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to toggle photo status",
      };
    }

    return {
      success: true,
      error: false,
      message: response.data?.message || "Photo status updated successfully",
    };
  } catch (error) {
    console.error("Toggle photo active error:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function createTestimonial(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const description = (formData.get("description") as string | null)?.trim() || "";
    const ratingValue = formData.get("rating");
    const is_active = formData.get("is_active") as string;

    const rating = Number(ratingValue);

    if (description.length < 4) {
      return { success: false, error: true, message: "Description must be at least 4 characters long" };
    }

    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      return { success: false, error: true, message: "Rating must be between 0 and 5" };
    }

    const apiFormData = new FormData();
    apiFormData.append("description", description);
    apiFormData.append("rating", String(rating));
    apiFormData.append("is_active", is_active === "true" ? "true" : "false");

    const response = await api({
      endpoint: SAVE_TESTIMONIAL_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to create testimonial",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function updateTestimonial(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const id = (formData.get("id") as string | null)?.trim() || "";
    const description = (formData.get("description") as string | null)?.trim() || "";
    const ratingValue = formData.get("rating");
    const is_active = formData.get("is_active") as string;

    const rating = Number(ratingValue);

    if (!id) {
      return { success: false, error: true, message: "Testimonial ID is required" };
    }

    if (description.length < 4) {
      return { success: false, error: true, message: "Description must be at least 4 characters long" };
    }

    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      return { success: false, error: true, message: "Rating must be between 0 and 5" };
    }

    const apiFormData = new FormData();
    apiFormData.append("id", id);
    apiFormData.append("description", description);
    apiFormData.append("rating", String(rating));
    apiFormData.append("is_active", is_active === "true" ? "true" : "false");

    const response = await api({
      endpoint: UPDATE_TESTIMONIAL_API,
      payloadData: apiFormData,
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to update testimonial",
      };
    }

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function deleteTestimonial(formData: FormData): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const id = (formData.get("id") as string | null)?.trim() || "";

    if (!id) {
      return { success: false, error: true, message: "Testimonial ID is required" };
    }

    const response = await api({
      endpoint: {
        ...DELETE_TESTIMONIAL_API,
        url: `${DELETE_TESTIMONIAL_API.url}?id=${id}`,
      },
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to delete testimonial",
      };
    }

    return {
      success: true,
      error: false,
      message: response.data?.message || "Testimonial deleted successfully",
    };
  } catch (error) {
    console.error("Delete testimonial error:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}

export async function toggleTestimonialActive(testimonialId: string): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    const response = await api({
      endpoint: {
        ...TOGGLE_TESTIMONIAL_ACTIVE_API,
        url: `${TOGGLE_TESTIMONIAL_ACTIVE_API.url}?id=${testimonialId}`,
      },
      serverToken: token,
      isServer: true,
    });

    if (response.error) {
      return {
        success: false,
        error: true,
        message: response.message || "Failed to toggle testimonial status",
      };
    }

    return {
      success: true,
      error: false,
      message: response.data?.message || "Testimonial status updated successfully",
    };
  } catch (error) {
    console.error("Toggle testimonial active error:", error);
    return { success: false, error: true, message: "An unexpected error occurred" };
  }
}