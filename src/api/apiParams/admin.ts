import type { ApiType } from "../api";
import { apiUrls } from "../../constants/apiUrls";

export const USER_COUNT_API: ApiType = {
    url: apiUrls.GET_USER_COUNT_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ANNOUNCEMENT_API: ApiType = {
    url: apiUrls.GET_ANNOUNCEMENT_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: true,
}

export const ANNOUNCEMENT_TEACHER_API: ApiType = {
    url: apiUrls.GET_ANNOUNCEMENT_TEACHER_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ANNOUNCEMENT_STUDENT_API: ApiType = {
    url: apiUrls.GET_ANNOUNCEMENT_FOR_STUDENT_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ASSIGNMENT_API: ApiType = {
    url: apiUrls.GET_ASSIGNMENT_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: true,
}

export const ASSIGNMENTS_OF_TEACHER_API: ApiType = {
    url: apiUrls.GET_ASSIGNMENTS_OF_TEACHER_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ASSIGNMENTS_OF_CLASS_API: ApiType = {
    url: apiUrls.GET_ASSIGNMENTS_OF_CLASS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ASSIGNMENTS_OF_STUDENT_API: ApiType = {
    url: apiUrls.GET_ASSIGNMENTS_OF_STUDENT_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ATTENDANCE_BY_STUDENT_ID_API: ApiType = {
    url: apiUrls.GET_ATTENDANCE_BY_STUDENT_ID_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const EVENTS_API: ApiType = {
    url: apiUrls.GET_EVENTS_BY_DATE_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: true,
}

export const ALL_EVENTS_API: ApiType = {
    url: apiUrls.GET_EVENTS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const LESSONS_WEEK_API: ApiType = {
    url: apiUrls.GET_LESSONS_WEEK_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_LESSONS_API: ApiType = {
    url: apiUrls.GET_LESSONS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const LESSONS_FOR_PARENT_STUDENT_WEEK_URL: ApiType = {
    url: apiUrls.GET_LESSONS_FOR_PARENT_STUDENT_WEEK_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: true,
}

export const LESSONS_TEACHER_WEEK_API: ApiType = {
    url: apiUrls.GET_LESSONS_TEACHER_WEEK_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const LESSONS_FOR_TEACHER_API: ApiType = {
    url: apiUrls.GET_LESSONS_FOR_TEACHER_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const LESSONS_FOR_CLASS_API: ApiType = {
    url: apiUrls.GET_LESSONS_FOR_CLASS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_STUDENT_CLASS_API: ApiType = {
    url: apiUrls.GET_STUDENT_CLASS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_STUDENT_API: ApiType = {
    url: apiUrls.GET_STUDENT_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: true,
}

export const GET_STUDENT_BY_ID_API: ApiType = {
    url: apiUrls.GET_STUDENT_BY_ID_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_TEACHERS_STUDENT_API: ApiType = {
    url: apiUrls.GET_STUDENTS_OF_TEACHER_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_TEACHER_BY_ID_API: ApiType = {
    url: apiUrls.GET_TEACHER_BY_ID_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_TEACHER_API: ApiType = {
    url: apiUrls.GET_TEACHER_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_FULL_TEACHERS_API: ApiType = {
    url: apiUrls.GET_ALL_TEACHERS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_TEACHERS_OF_CLASS_API: ApiType = {
    url: apiUrls.GET_TEACHERS_OF_CLASS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_CLASSES_API: ApiType = {
    url: apiUrls.GET_CLASSES_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_ALL_CLASSES_API: ApiType = {
    url: apiUrls.GET_ALL_CLASSES_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_SUPERVISORS_CLASSES_API: ApiType = {
    url: apiUrls.GET_SUPERVISORS_CLASSES_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_EXAMS_API: ApiType = {
    url: apiUrls.GET_EXAMS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_EXAMS_TEACHER_API: ApiType = {
    url: apiUrls.GET_EXAMS_TEACHER_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_EXAMS_CLASS_API: ApiType = {
    url: apiUrls.GET_EXAMS_CLASS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_EXAMS_OF_STUDENT_API: ApiType = {
    url: apiUrls.GET_EXAMS_OF_STUDENT_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false
}

export const GET_CLASS_EXAMS_API: ApiType = {
    url: apiUrls.GET_CLASS_EXAMS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_PARENTS_API: ApiType = {
    url: apiUrls.GET_PARENTS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_PARENT_BY_ID_API: ApiType = {
    url: apiUrls.GET_PARENT_BY_ID_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_RESULTS_API: ApiType = {
    url: apiUrls.GET_RESULTS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_STUDENT_RESULTS_API: ApiType = {
    url: apiUrls.GET_STUDENT_RESULTS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_TEACHER_EXAMS_API: ApiType = {
    url: apiUrls.GET_TEACHER_EXAMS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_SUBJECTS_API: ApiType = {
    url: apiUrls.GET_SUBJECTS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}