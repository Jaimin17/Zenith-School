export const apiUrls = {
    LOGIN_URL: "api/v1/auth/access-token",

    USER_PROFILE_ENDPOINT: "api/v1/auth/getUserDetail",

    LOGOUT_URL: "api/v1/auth/logout",

    UPDATE_PROFILE_URL: "api/v1/auth/updateProfile",

    UPDATE_PROFILE_IMAGE_URL: "api/v1/auth/updateProfilePicture",

    CHANGE_PASSWORD_URL: "api/v1/auth/changePassword",

    GET_USER_COUNT_URL: "api/v1/admin/allUsersCount",

    CHAT_BOT_URL: "api/v1/chatbot/chat",

    GET_ANNOUNCEMENT_URL: "api/v1/announcements/getAll",

    GET_ANNOUNCEMENT_TEACHER_URL: "api/v1/announcements/teacher",

    GET_ANNOUNCEMENT_FOR_STUDENT_URL: "api/v1/announcements/student",

    SAVE_ANNOUNCEMENT_URL: "api/v1/announcements/save",

    UPDATE_ANNOUNCEMENT_URL: "api/v1/announcements/update",

    DELETE_ANNOUNCEMENT_URL: "api/v1/announcements/delete",

    GET_ASSIGNMENT_URL: "api/v1/assignments/getAll",

    GET_ASSIGNMENTS_OF_TEACHER_URL: "api/v1/assignments/teacher",

    GET_ASSIGNMENTS_OF_CLASS_URL: "api/v1/assignments/class",

    GET_ASSIGNMENTS_OF_STUDENT_URL: "api/v1/assignments/student",

    GET_ATTENDANCE_BY_STUDENT_ID_URL: "api/v1/attendance/getAttendanceOfStudent",

    // Attendance Dashboard & Views
    GET_ATTENDANCE_DASHBOARD_SUMMARY_URL: "api/v1/attendance/dashboard/summary",

    GET_ATTENDANCE_DASHBOARD_CLASSES_URL: "api/v1/attendance/dashboard/classes",

    GET_ATTENDANCE_TEACHER_CLASSES_URL: "api/v1/attendance/teacher/classes",

    GET_ATTENDANCE_CLASS_DETAIL_URL: "api/v1/attendance/class",

    GET_ATTENDANCE_STUDENT_MONTHLY_URL: "api/v1/attendance/student",

    GET_ATTENDANCE_STUDENT_CALENDAR_URL: "api/v1/attendance/student",

    GET_ATTENDANCE_PARENT_CHILDREN_URL: "api/v1/attendance/parent/children",

    // Attendance Taking URLs
    GET_ATTENDANCE_TAKE_LESSONS_URL: "api/v1/attendance/take/lessons",

    GET_ATTENDANCE_TAKE_ROSTER_URL: "api/v1/attendance/take/roster",

    GET_ATTENDANCE_TAKE_CHECK_URL: "api/v1/attendance/take/check",

    POST_ATTENDANCE_TAKE_URL: "api/v1/attendance/take",

    GET_EVENTS_BY_DATE_URL: "api/v1/events/getAllByDate",

    GET_LESSONS_WEEK_URL: "api/v1/lesson/getAllOfCurrentWeek",

    GET_LESSONS_FOR_PARENT_STUDENT_WEEK_URL: "api/v1/lesson/getLessonForStudent",

    GET_LESSONS_TEACHER_WEEK_URL: "api/v1/lesson/teacher/weekly",

    GET_LESSONS_FOR_TEACHER_URL: "api/v1/lesson/teacher",

    GET_LESSONS_FOR_CLASS_URL: "api/v1/lesson/class",

    GET_LESSONS_URL: "api/v1/lesson/getAll",

    GET_LESSONS_FULL_LIST_URL: "api/v1/lesson/getFullList",

    GET_STUDENT_CLASS_URL: "api/v1/classes/getStudentClass",

    GET_STUDENT_URL: "api/v1/student/getAll",

    GET_STUDENTS_OF_CLASS_URL: "api/v1/student/getStudentsOfClass",

    GET_STUDENTS_OF_TEACHER_URL: "api/v1/student/byTeacher",

    GET_STUDENT_BY_ID_URL: "api/v1/student/get",

    GET_TEACHER_BY_ID_URL: "api/v1/teacher/get",

    GET_TEACHER_URL: "api/v1/teacher/getAll",

    GET_ALL_TEACHERS_URL: "api/v1/teacher/getFullList",

    GET_TEACHERS_OF_CLASS_URL: "api/v1/teacher",

    GET_GRADE_LIST_URL: "api/v1/grade/getAll",

    GET_CLASSES_URL: "api/v1/classes/getAll",

    GET_ALL_CLASSES_URL: "api/v1/classes/getFullList",

    GET_SUPERVISORS_CLASSES_URL: "api/v1/classes",

    GET_EVENTS_URL: "api/v1/events/getAll",

    GET_EVENT_BY_ID_URL: "api/v1/events/getById",

    GET_PUBLIC_EVENTS_URL: "api/v1/events/getAllPublicEvents",

    SAVE_EVENT_URL: "api/v1/events/save",

    UPDATE_EVENT_URL: "api/v1/events/update",

    DELETE_EVENT_URL: "api/v1/events/delete",

    GET_EXAMS_URL: "api/v1/exam/getAll",

    GET_EXAMS_TEACHER_URL: "api/v1/exam/teacher",

    GET_EXAMS_CLASS_URL: "api/v1/exam/class",

    GET_EXAMS_OF_STUDENT_URL: "api/v1/exam/student",

    GET_CLASS_EXAMS_URL: "api/v1/exam/class",

    GET_EXAMS_OF_CLASS_FULL_LIST_URL: "api/v1/exam/allOfClass",

    GET_PARENTS_URL: "api/v1/parent/getAll",

    GET_ALL_PARENTS_URL: "api/v1/parent/getFullList",

    GET_PARENT_BY_ID_URL: "api/v1/parent/getById",

    GET_RESULTS_URL: "api/v1/results/getAll",

    GET_STUDENT_RESULTS_URL: "api/v1/results/student",

    GET_SUBJECTS_URL: "api/v1/subject/getAll",

    GET_FULL_LIST_SUBJECTS_URL: "api/v1/subject/getFullList",

    GET_TEACHER_EXAMS_URL: "api/v1/exam/teacher",

    SAVE_TEACHER_URL: "api/v1/teacher/save",

    UPDATE_TEACHER_URL: "api/v1/teacher/update",

    DELETE_TEACHER_URL: "api/v1/teacher/delete",

    SAVE_STUDENT_URL: "api/v1/student/save",

    UPDATE_STUDENT_URL: "api/v1/student/update",

    DELETE_STUDENT_URL: "api/v1/student/delete",

    SAVE_PARENT_URL: "api/v1/parent/save",

    UPDATE_PARENT_URL: "api/v1/parent/update",

    DELETE_PARENT_URL: "api/v1/parent/delete",

    SAVE_SUBJECT_URL: "api/v1/subject/save",

    UPDATE_SUBJECT_URL: "api/v1/subject/update",

    DELETE_SUBJECT_URL: "api/v1/subject/delete",

    SAVE_CLASS_URL: "api/v1/classes/save",

    UPDATE_CLASS_URL: "api/v1/classes/update",

    DELETE_CLASS_URL: "api/v1/classes/delete",

    SAVE_LESSON_URL: "api/v1/lesson/save",

    UPDATE_LESSON_URL: "api/v1/lesson/update",

    DELETE_LESSON_URL: "api/v1/lesson/delete",

    SAVE_EXAM_URL: "api/v1/exam/save",

    UPDATE_EXAM_URL: "api/v1/exam/update",

    DELETE_EXAM_URL: "api/v1/exam/delete",

    SAVE_ASSIGNMENT_URL: "api/v1/assignments/save",

    UPDATE_ASSIGNMENT_URL: "api/v1/assignments/update",

    DELETE_ASSIGNMENT_URL: "api/v1/assignments/delete",

    GET_ASSIGNMENTS_OF_CLASS_FULL_LIST_URL: "api/v1/assignments/allOfClass",

    SAVE_RESULT_URL: "api/v1/results/save",

    UPDATE_RESULT_URL: "api/v1/results/update",

    DELETE_RESULT_URL: "api/v1/results/delete",

    GET_BANNER_URL: "api/v1/banner/getAll",

    GET_BANNER_BY_ID_URL: "api/v1/banner/get",

    SAVE_BANNER_URL: "api/v1/banner/save",

    UPDATE_BANNER_URL: "api/v1/banner/update",

    DELETE_BANNER_URL: "api/v1/banner/delete",

    TOGGLE_BANNER_ACTIVE_URL: "api/v1/banner/toggle-active",

    GET_PHOTO_GALLERY_URL: "api/v1/photoGallery/getAll",

    GET_PHOTO_GALLERY_BY_ID_URL: "api/v1/photoGallery/get",

    SAVE_PHOTO_GALLERY_URL: "api/v1/photoGallery/save",

    UPDATE_PHOTO_GALLERY_URL: "api/v1/photoGallery/update",

    DELETE_PHOTO_GALLERY_URL: "api/v1/photoGallery/delete",

    TOGGLE_PHOTO_GALLERY_ACTIVE_URL: "api/v1/photoGallery/toggle-active",

    GET_TESTIMONIALS_URL: "api/v1/testimonials/getAll",

    GET_TESTIMONIALS_ACTIVE_URL: "api/v1/testimonials/getAllActive",

    GET_TESTIMONIAL_BY_ID_URL: "api/v1/testimonials/get",

    SAVE_TESTIMONIAL_URL: "api/v1/testimonials/save",

    UPDATE_TESTIMONIAL_URL: "api/v1/testimonials/update",

    DELETE_TESTIMONIAL_URL: "api/v1/testimonials/delete",

    TOGGLE_TESTIMONIAL_ACTIVE_URL: "api/v1/testimonials/toggle-active",
}