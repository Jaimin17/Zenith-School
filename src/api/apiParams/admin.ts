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

export const GET_CURRENT_USER_DETAILS_API: ApiType = {
    url: apiUrls.USER_PROFILE_ENDPOINT,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const CHAT_BOT_API: ApiType = {
    url: apiUrls.CHAT_BOT_URL,
    method: "POST",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: true,
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

export const SAVE_ANNOUNCEMENT_API: ApiType = {
    url: apiUrls.SAVE_ANNOUNCEMENT_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: false,
    isForm: false,
}

export const UPDATE_ANNOUNCEMENT_API: ApiType = {
    url: apiUrls.UPDATE_ANNOUNCEMENT_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: false,
    isForm: false,
}

export const DELETE_ANNOUNCEMENT_API: ApiType = {
    url: apiUrls.DELETE_ANNOUNCEMENT_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
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

export const ASSIGNMENTS_OF_CLASS_FULL_LIST_API: ApiType = {
    url: apiUrls.GET_ASSIGNMENTS_OF_CLASS_FULL_LIST_URL,
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

// Attendance Dashboard APIs
export const ATTENDANCE_DASHBOARD_SUMMARY_API: ApiType = {
    url: apiUrls.GET_ATTENDANCE_DASHBOARD_SUMMARY_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ATTENDANCE_DASHBOARD_CLASSES_API: ApiType = {
    url: apiUrls.GET_ATTENDANCE_DASHBOARD_CLASSES_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ATTENDANCE_TEACHER_CLASSES_API: ApiType = {
    url: apiUrls.GET_ATTENDANCE_TEACHER_CLASSES_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ATTENDANCE_CLASS_DETAIL_API: ApiType = {
    url: apiUrls.GET_ATTENDANCE_CLASS_DETAIL_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ATTENDANCE_STUDENT_MONTHLY_API: ApiType = {
    url: apiUrls.GET_ATTENDANCE_STUDENT_MONTHLY_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ATTENDANCE_STUDENT_CALENDAR_API: ApiType = {
    url: apiUrls.GET_ATTENDANCE_STUDENT_CALENDAR_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ATTENDANCE_PARENT_CHILDREN_API: ApiType = {
    url: apiUrls.GET_ATTENDANCE_PARENT_CHILDREN_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

// Attendance Taking APIs
export const ATTENDANCE_TAKE_LESSONS_API: ApiType = {
    url: apiUrls.GET_ATTENDANCE_TAKE_LESSONS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ATTENDANCE_TAKE_ROSTER_API: ApiType = {
    url: apiUrls.GET_ATTENDANCE_TAKE_ROSTER_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ATTENDANCE_TAKE_CHECK_API: ApiType = {
    url: apiUrls.GET_ATTENDANCE_TAKE_CHECK_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ATTENDANCE_TAKE_SUBMIT_API: ApiType = {
    url: apiUrls.POST_ATTENDANCE_TAKE_URL,
    method: "POST",
    withToken: true,
    isMultipart: false,
    showToast: true,
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

export const ALL_PUBLIC_EVENTS_API: ApiType = {
    url: apiUrls.GET_PUBLIC_EVENTS_URL,
    method: "GET",
    withToken: false,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_PUBLIC_EVENT_BY_ID_API: ApiType = {
    url: apiUrls.GET_PUBLIC_EVENT_BY_ID_URL,
    method: "GET",
    withToken: false,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_EVENT_BY_ID_API: ApiType = {
    url: apiUrls.GET_EVENT_BY_ID_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const SAVE_EVENT_API: ApiType = {
    url: apiUrls.SAVE_EVENT_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: false,
    isForm: false,
}

export const UPDATE_EVENT_API: ApiType = {
    url: apiUrls.UPDATE_EVENT_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: false,
    isForm: false,
}

export const DELETE_EVENT_API: ApiType = {
    url: apiUrls.DELETE_EVENT_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
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

export const GET_LESSONS_FULL_LIST_API: ApiType = {
    url: apiUrls.GET_LESSONS_FULL_LIST_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const LESSONS_FOR_PARENT_STUDENT_WEEK_API: ApiType = {
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

export const GET_STUDENTS_OF_CLASS_API: ApiType = {
    url: apiUrls.GET_STUDENTS_OF_CLASS_URL,
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

export const GET_GRADE_LIST_API: ApiType = {
    url: apiUrls.GET_GRADE_LIST_URL,
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

export const GET_EXAMS_OF_CLASS_FULL_LIST_API: ApiType = {
    url: apiUrls.GET_EXAMS_OF_CLASS_FULL_LIST_URL,
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

export const GET_ALL_PARENTS_API: ApiType = {
    url: apiUrls.GET_ALL_PARENTS_URL,
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

export const GET_FULL_LIST_SUBJECTS_API: ApiType = {
    url: apiUrls.GET_FULL_LIST_SUBJECTS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const SAVE_TEACHER_API: ApiType = {
    url: apiUrls.SAVE_TEACHER_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_TEACHER_API: ApiType = {
    url: apiUrls.UPDATE_TEACHER_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_TEACHER_API: ApiType = {
    url: apiUrls.DELETE_TEACHER_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const SAVE_STUDENT_API: ApiType = {
    url: apiUrls.SAVE_STUDENT_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_STUDENT_API: ApiType = {
    url: apiUrls.UPDATE_STUDENT_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_STUDENT_API: ApiType = {
    url: apiUrls.DELETE_STUDENT_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const SAVE_PARENT_API: ApiType = {
    url: apiUrls.SAVE_PARENT_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_PARENT_API: ApiType = {
    url: apiUrls.UPDATE_PARENT_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_PARENT_API: ApiType = {
    url: apiUrls.DELETE_PARENT_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const SAVE_SUBJECT_API: ApiType = {
    url: apiUrls.SAVE_SUBJECT_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false
}

export const UPDATE_SUBJECT_API: ApiType = {
    url: apiUrls.UPDATE_SUBJECT_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_SUBJECT_API: ApiType = {
    url: apiUrls.DELETE_SUBJECT_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const SAVE_CLASS_API: ApiType = {
    url: apiUrls.SAVE_CLASS_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false
}

export const UPDATE_CLASS_API: ApiType = {
    url: apiUrls.UPDATE_CLASS_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_CLASS_API: ApiType = {
    url: apiUrls.DELETE_CLASS_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const SAVE_LESSON_API: ApiType = {
    url: apiUrls.SAVE_LESSON_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_LESSON_API: ApiType = {
    url: apiUrls.UPDATE_LESSON_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_LESSON_API: ApiType = {
    url: apiUrls.DELETE_LESSON_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const SAVE_EXAM_API: ApiType = {
    url: apiUrls.SAVE_EXAM_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_EXAM_API: ApiType = {
    url: apiUrls.UPDATE_EXAM_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_EXAM_API: ApiType = {
    url: apiUrls.DELETE_EXAM_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const SAVE_ASSIGNMENT_API: ApiType = {
    url: apiUrls.SAVE_ASSIGNMENT_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_ASSIGNMENT_API: ApiType = {
    url: apiUrls.UPDATE_ASSIGNMENT_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_ASSIGNMENT_API: ApiType = {
    url: apiUrls.DELETE_ASSIGNMENT_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const SAVE_RESULT_API: ApiType = {
    url: apiUrls.SAVE_RESULT_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_RESULT_API: ApiType = {
    url: apiUrls.UPDATE_RESULT_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_RESULT_API: ApiType = {
    url: apiUrls.DELETE_RESULT_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const BANNER_API: ApiType = {
    url: apiUrls.GET_BANNER_URL,
    method: "GET",
    withToken: false,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const BANNER_BY_ID_API: ApiType = {
    url: apiUrls.GET_BANNER_BY_ID_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const SAVE_BANNER_API: ApiType = {
    url: apiUrls.SAVE_BANNER_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_BANNER_API: ApiType = {
    url: apiUrls.UPDATE_BANNER_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_BANNER_API: ApiType = {
    url: apiUrls.DELETE_BANNER_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const TOGGLE_BANNER_ACTIVE_API: ApiType = {
    url: apiUrls.TOGGLE_BANNER_ACTIVE_URL,
    method: "PATCH",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const PHOTO_GALLERY_API: ApiType = {
    url: apiUrls.GET_PHOTO_GALLERY_URL,
    method: "GET",
    withToken: false,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const PHOTO_GALLERY_BY_ID_API: ApiType = {
    url: apiUrls.GET_PHOTO_GALLERY_BY_ID_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const SAVE_PHOTO_GALLERY_API: ApiType = {
    url: apiUrls.SAVE_PHOTO_GALLERY_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_PHOTO_GALLERY_API: ApiType = {
    url: apiUrls.UPDATE_PHOTO_GALLERY_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_PHOTO_GALLERY_API: ApiType = {
    url: apiUrls.DELETE_PHOTO_GALLERY_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const TOGGLE_PHOTO_GALLERY_ACTIVE_API: ApiType = {
    url: apiUrls.TOGGLE_PHOTO_GALLERY_ACTIVE_URL,
    method: "PATCH",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const TESTIMONIAL_API: ApiType = {
    url: apiUrls.GET_TESTIMONIALS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const TESTIMONIAL_ACTIVE_API: ApiType = {
    url: apiUrls.GET_TESTIMONIALS_ACTIVE_URL,
    method: "GET",
    withToken: false,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const TESTIMONIAL_BY_ID_API: ApiType = {
    url: apiUrls.GET_TESTIMONIAL_BY_ID_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const SAVE_TESTIMONIAL_API: ApiType = {
    url: apiUrls.SAVE_TESTIMONIAL_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_TESTIMONIAL_API: ApiType = {
    url: apiUrls.UPDATE_TESTIMONIAL_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_TESTIMONIAL_API: ApiType = {
    url: apiUrls.DELETE_TESTIMONIAL_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const TOGGLE_TESTIMONIAL_ACTIVE_API: ApiType = {
    url: apiUrls.TOGGLE_TESTIMONIAL_ACTIVE_URL,
    method: "PATCH",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

// ── Academic Years ────────────────────────────────────────────────────────────
export const GET_ACADEMIC_YEARS_API: ApiType = {
    url: apiUrls.GET_ACADEMIC_YEARS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ACHIEVEMENT_API: ApiType = {
    url: apiUrls.GET_ACHIEVEMENTS_URL,
    method: "GET",
    withToken: false,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ACHIEVEMENT_PUBLIC_API: ApiType = {
    url: apiUrls.GET_ACHIEVEMENTS_PUBLIC_URL,
    method: "GET",
    withToken: false,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const ACHIEVEMENT_BY_ID_API: ApiType = {
    url: apiUrls.GET_ACHIEVEMENT_BY_ID_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_ACADEMIC_YEARS_ALL_API: ApiType = {
    url: apiUrls.GET_ACADEMIC_YEARS_ALL_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_VISIBLE_ACADEMIC_YEARS_API: ApiType = {
    url: apiUrls.GET_VISIBLE_ACADEMIC_YEARS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_ACADEMIC_YEAR_ACTIVE_API: ApiType = {
    url: apiUrls.GET_ACADEMIC_YEAR_ACTIVE_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const SAVE_ACADEMIC_YEAR_API: ApiType = {
    url: apiUrls.SAVE_ACADEMIC_YEAR_URL,
    method: "POST",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const SAVE_ACHIEVEMENT_API: ApiType = {
    url: apiUrls.SAVE_ACHIEVEMENT_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_ACHIEVEMENT_API: ApiType = {
    url: apiUrls.UPDATE_ACHIEVEMENT_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_ACHIEVEMENT_API: ApiType = {
    url: apiUrls.DELETE_ACHIEVEMENT_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}


export const ACTIVATE_ACADEMIC_YEAR_API: ApiType = {
    url: apiUrls.ACTIVATE_ACADEMIC_YEAR_URL,
    method: "PATCH",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const TOGGLE_ACHIEVEMENT_ACTIVE_API: ApiType = {
    url: apiUrls.TOGGLE_ACHIEVEMENT_ACTIVE_URL,
    method: "PATCH",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const UPDATE_ACADEMIC_YEAR_API: ApiType = {
    url: apiUrls.UPDATE_ACADEMIC_YEAR_URL,
    method: "PATCH",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const SPORTS_PROGRAM_API: ApiType = {
    url: apiUrls.GET_SPORTS_PROGRAMS_URL,
    method: "GET",
    withToken: false,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const SEED_STUDENTS_TO_YEAR_API: ApiType = {
    url: apiUrls.SEED_STUDENTS_TO_YEAR_URL,
    method: "POST",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

// ── Students: children / promotion / history ─────────────────────────────────
export const GET_CHILDREN_OF_PARENT_API: ApiType = {
    url: apiUrls.GET_CHILDREN_OF_PARENT_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const SPORTS_PROGRAM_BY_ID_API: ApiType = {
    url: apiUrls.GET_SPORTS_PROGRAM_BY_ID_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const BULK_PROMOTE_STUDENTS_API: ApiType = {
    url: apiUrls.BULK_PROMOTE_STUDENTS_URL,
    method: "POST",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const SAVE_SPORTS_PROGRAM_API: ApiType = {
    url: apiUrls.SAVE_SPORTS_PROGRAM_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_SPORTS_PROGRAM_API: ApiType = {
    url: apiUrls.UPDATE_SPORTS_PROGRAM_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_SPORTS_PROGRAM_API: ApiType = {
    url: apiUrls.DELETE_SPORTS_PROGRAM_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const ASSIGN_CLASS_TO_STUDENT_API: ApiType = {
    url: apiUrls.ASSIGN_CLASS_TO_STUDENT_URL,
    method: "POST",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const TOGGLE_SPORTS_PROGRAM_ACTIVE_API: ApiType = {
    url: apiUrls.TOGGLE_SPORTS_PROGRAM_ACTIVE_URL,
    method: "PATCH",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const GET_STUDENT_SELF_YEAR_DATA_API: ApiType = {
    url: apiUrls.GET_STUDENT_SELF_YEAR_DATA_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}
// ─── Job Openings ─────────────────────────────────────────────────────────────

export const JOB_OPENINGS_API: ApiType = {
    url: apiUrls.GET_JOB_OPENINGS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const GET_LESSONS_BY_YEAR_API: ApiType = {
    url: apiUrls.GET_LESSONS_BY_YEAR_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const LESSON_COUNT_BY_YEAR_API: ApiType = {
    url: apiUrls.LESSON_COUNT_BY_YEAR_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const COPY_LESSONS_FROM_PREVIOUS_YEAR_API: ApiType = {
    url: apiUrls.COPY_LESSONS_FROM_PREVIOUS_YEAR_URL,
    method: "POST",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const JOB_OPENINGS_PUBLIC_API: ApiType = {
    url: apiUrls.GET_JOB_OPENINGS_PUBLIC_URL,
    method: "GET",
    withToken: false,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const SAVE_JOB_OPENING_API: ApiType = {
    url: apiUrls.SAVE_JOB_OPENING_URL,
    method: "POST",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const UPDATE_JOB_OPENING_API: ApiType = {
    url: apiUrls.UPDATE_JOB_OPENING_URL,
    method: "PUT",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_JOB_OPENING_API: ApiType = {
    url: apiUrls.DELETE_JOB_OPENING_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

export const TOGGLE_JOB_OPENING_STATUS_API: ApiType = {
    url: apiUrls.TOGGLE_JOB_OPENING_STATUS_URL,
    method: "PATCH",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}

// ─── Job Applications ─────────────────────────────────────────────────────────

export const JOB_APPLICATIONS_API: ApiType = {
    url: apiUrls.GET_JOB_APPLICATIONS_URL,
    method: "GET",
    withToken: true,
    isMultipart: false,
    showToast: false,
    isForm: false,
}

export const SAVE_JOB_APPLICATION_API: ApiType = {
    url: apiUrls.SAVE_JOB_APPLICATION_URL,
    method: "POST",
    withToken: false,
    isMultipart: true,
    showToast: false,
    isForm: false,
}

export const UPDATE_JOB_APPLICATION_STATUS_API: ApiType = {
    url: apiUrls.UPDATE_JOB_APPLICATION_STATUS_URL,
    method: "PATCH",
    withToken: true,
    isMultipart: true,
    showToast: true,
    isForm: false,
}

export const DELETE_JOB_APPLICATION_API: ApiType = {
    url: apiUrls.DELETE_JOB_APPLICATION_URL,
    method: "DELETE",
    withToken: true,
    isMultipart: false,
    showToast: true,
    isForm: false,
}