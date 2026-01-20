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

export const EVENTS_API: ApiType = {
    url: apiUrls.EVENTS_BY_DATE_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: true,
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

export const GET_STUDENT_PARENT_API: ApiType = {
    url: apiUrls.GET_STUDENT_PARENT_URL,
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

export const GET_CLASSES_API: ApiType = {
    url: apiUrls.GET_CLASSES_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}