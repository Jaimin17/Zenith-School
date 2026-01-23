import type { ApiType } from "../api";
import { apiUrls } from "../../constants/apiUrls";

export const USER_COUNT_API: ApiType = {
    url: apiUrls.USER_COUNT_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ANNOUNCEMENT_API: ApiType = {
    url: apiUrls.ANNOUNCEMENT_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: true,
}

export const ASSIGNMENT_API: ApiType = {
    url: apiUrls.ASSIGNMENT_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: true,
}

export const EVENTS_API: ApiType = {
    url: apiUrls.EVENTS_BY_DATE_URL,
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
    url: apiUrls.LESSONS_WEEK_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const LESSONS_FOR_PARENT_STUDENT_WEEK_URL: ApiType = {
    url: apiUrls.LESSONS_FOR_PARENT_STUDENT_WEEK_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: true,
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

export const GET_EXAMS_API: ApiType = {
    url: apiUrls.GET_EXAMS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_CLASS_EXAMS_API: ApiType = {
    url: apiUrls.GET_CLASS_EXAMS_URL,
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