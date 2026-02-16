"use server";

import { cookies } from "next/headers";
import { api } from '@/api/api';
import { USER_COUNT_API, ANNOUNCEMENT_API, EVENTS_API, LESSONS_WEEK_API, GET_STUDENT_CLASS_API, GET_STUDENT_API, LESSONS_FOR_PARENT_STUDENT_WEEK_API, GET_TEACHER_API, GET_CLASSES_API, ALL_EVENTS_API, GET_EXAMS_API, GET_CLASS_EXAMS_API, GET_TEACHER_EXAMS_API, GET_FULL_TEACHERS_API, GET_ALL_CLASSES_API, GET_SUBJECTS_API, ASSIGNMENT_API, GET_RESULTS_API, GET_PARENTS_API, GET_PARENT_BY_ID_API, GET_TEACHER_BY_ID_API, ANNOUNCEMENT_TEACHER_API, LESSONS_TEACHER_WEEK_API, GET_TEACHERS_STUDENT_API, GET_LESSONS_API, LESSONS_FOR_TEACHER_API, GET_EXAMS_TEACHER_API, ASSIGNMENTS_OF_TEACHER_API, GET_SUPERVISORS_CLASSES_API, GET_STUDENT_BY_ID_API, ATTENDANCE_BY_STUDENT_ID_API, ANNOUNCEMENT_STUDENT_API, LESSONS_FOR_CLASS_API, GET_TEACHERS_OF_CLASS_API, GET_EXAMS_CLASS_API, ASSIGNMENTS_OF_CLASS_API, GET_STUDENT_RESULTS_API, GET_EXAMS_OF_STUDENT_API, ASSIGNMENTS_OF_STUDENT_API, ATTENDANCE_DASHBOARD_SUMMARY_API, ATTENDANCE_DASHBOARD_CLASSES_API, ATTENDANCE_TEACHER_CLASSES_API, ATTENDANCE_CLASS_DETAIL_API, ATTENDANCE_STUDENT_MONTHLY_API, ATTENDANCE_STUDENT_CALENDAR_API, ATTENDANCE_PARENT_CHILDREN_API, ATTENDANCE_TAKE_LESSONS_API, ATTENDANCE_TAKE_ROSTER_API, ATTENDANCE_TAKE_CHECK_API, ATTENDANCE_TAKE_SUBMIT_API, GET_FULL_LIST_SUBJECTS_API, GET_ALL_PARENTS_API, GET_GRADE_LIST_API, GET_LESSONS_FULL_LIST_API, GET_STUDENTS_OF_CLASS_API, GET_EXAMS_OF_CLASS_FULL_LIST_API, ASSIGNMENTS_OF_CLASS_FULL_LIST_API, GET_CURRENT_USER_DETAILS_API } from '@/api/apiParams/admin';
import type { UsersCount, Announcement, Events, Lesson, ClassReadonly, StudentWithRelations, Teacher, TeacherWithRelations, TeacherListResponse, AnnouncementListResponse, ClassListResponse, ClassBase, EventListResponse, ExamListResponse, SubjectListResponse, StudentListResponse, AssignmentListResponse, ResultListResponse, ParentListResponse, ParentWithRelations, LessonListResponse, Attendance, AttendanceDashboardSummary, ClasswiseAttendanceResponse, TeacherClassesAttendanceResponse, ClassAttendanceDetailResponse, StudentMonthlyAttendance, CalendarHeatmapResponse, ParentChildrenAttendanceResponse, LessonsForDateResponse, LessonRosterResponse, AttendanceTakeRequest, AttendanceTakeResponse, AttendanceCheckResponse, TeacherClassSummary, Subject, Grade, SubjectWithRelations, AssignmentWithRelations, EventsWithRelations, UserProfile } from '@/types/schemas';
import { getServerAuthTokens } from "@/utils/cookie";

export async function fetchUserCountsAction(): Promise<{
    success: boolean;
    data: UsersCount | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const response = await api<UsersCount>({
            endpoint: USER_COUNT_API,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch user counts'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchUserCountsAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching user counts'
        };
    }
}

export async function fetchAnnouncementsAction(searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: AnnouncementListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore)

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Build params if search term provided
        const params = searchTerm ? { 
                search: searchTerm,
                page: pageNo
            } : {
                page: pageNo
            };

        // Make API request with server token
        const response = await api<AnnouncementListResponse>({
            endpoint: ANNOUNCEMENT_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch announcements'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchAnnouncementsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching announcements'
        };
    }
}

export async function fetchAnnouncementsOfTeacherAction(teacherId: string, searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: AnnouncementListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore)

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Build params if search term provided
        const params = searchTerm ? { 
            search: searchTerm,
            page: pageNo
        } : {
            page: pageNo
        };

        // Make API request with server token
        const response = await api<AnnouncementListResponse>({
            endpoint: {
                ...ANNOUNCEMENT_TEACHER_API,
                url: `${ANNOUNCEMENT_TEACHER_API.url}/${teacherId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch announcements'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchAnnouncementsOfTeacherAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching announcements'
        };
    }
}

export async function fetchAnnouncementsOfStudentAction(studentId: string, searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: AnnouncementListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore)

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Build params if search term provided
        const params = searchTerm ? { 
            search: searchTerm,
            page: pageNo
        } : {
            page: pageNo
        };

        // Make API request with server token
        const response = await api<AnnouncementListResponse>({
            endpoint: {
                ...ANNOUNCEMENT_STUDENT_API,
                url: `${ANNOUNCEMENT_STUDENT_API.url}/${studentId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch announcements'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchAnnouncementsOfStudentAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching announcements'
        };
    }
}


export async function fetchAssignmentsAction(
    searchTerm?: string, 
    pageNo: number = 1,
    subjectId?: string,
    teacherId?: string,
    status?: string,
    dueDate?: string
): Promise<{
    success: boolean;
    data: AssignmentListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore)

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Build params object with all filters
        const params: Record<string, string | number> = {
            page: pageNo
        };

        if (searchTerm) {
            params.search = searchTerm;
        }

        if (subjectId) {
            params.subject_id = subjectId;
        }

        if (teacherId) {
            params.teacher_id = teacherId;
        }

        if (status) {
            params.status = status;
        }

        if (dueDate) {
            params.due_date = dueDate;
        }

        // Make API request with server token
        const response = await api<AssignmentListResponse>({
            endpoint: ASSIGNMENT_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch assignments'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchAssignmentsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching assignments'
        };
    }
}

export async function fetchAssignmentsOfTeacherAction(
    teacherId: string, 
    searchTerm?: string, 
    pageNo: number = 1,
    subjectId?: string,
    status?: string,
    dueDate?: string
): Promise<{
    success: boolean;
    data: AssignmentListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore)

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params: Record<string, string | number> = {
            page: pageNo
        };

        if (searchTerm) {
            params.search = searchTerm;
        }

        if (subjectId) {
            params.subject_id = subjectId;
        }

        if (status) {
            params.status = status;
        }

        if (dueDate) {
            params.due_date = dueDate;
        }

        console.log('Fetching assignments for teacher:', teacherId, 'with params:', params);

        // Make API request with server token
        const response = await api<AssignmentListResponse>({
            endpoint: {
                ...ASSIGNMENTS_OF_TEACHER_API,
                url: `${ASSIGNMENTS_OF_TEACHER_API.url}/${teacherId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch assignments'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchAssignmentsOfTeacherAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching assignments'
        };
    }
}

export async function fetchAssignmentsOfClassAction(
    classId: string, 
    searchTerm?: string, 
    pageNo: number = 1,
    subjectId?: string,
    filterTeacherId?: string,
    status?: string,
    dueDate?: string
): Promise<{
    success: boolean;
    data: AssignmentListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore)

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params: Record<string, string | number> = {
            page: pageNo
        };

        if (searchTerm) {
            params.search = searchTerm;
        }

        if (subjectId) {
            params.subject_id = subjectId;
        }

        if (status) {
            params.status = status;
        }

        if (dueDate) {
            params.due_date = dueDate;
        }

        if (filterTeacherId) {
            params.teacher_id = filterTeacherId;
        }

        console.log('Fetching assignments for class:', classId, 'with params:', params);

        // Make API request with server token
        const response = await api<AssignmentListResponse>({
            endpoint: {
                ...ASSIGNMENTS_OF_CLASS_API,
                url: `${ASSIGNMENTS_OF_CLASS_API.url}/${classId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch assignments'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchAssignmentsOfClassAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching assignments'
        };
    }
}

export async function fetchAssignmentsOfStudentAction(
    studentId: string, 
    searchTerm?: string, 
    pageNo: number = 1,
    subjectId?: string,
    filterTeacherId?: string,
    status?: string,
    dueDate?: string
): Promise<{
    success: boolean;
    data: AssignmentListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore)

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params: Record<string, string | number> = {
            page: pageNo
        };

        if (searchTerm) {
            params.search = searchTerm;
        }

        if (subjectId) {
            params.subject_id = subjectId;
        }

        if (status) {
            params.status = status;
        }

        if (dueDate) {
            params.due_date = dueDate;
        }

        if (filterTeacherId) {
            params.teacher_id = filterTeacherId;
        }

        console.log('Fetching assignments for student:', studentId, 'with params:', params);

        // Make API request with server token
        const response = await api<AssignmentListResponse>({
            endpoint: {
                ...ASSIGNMENTS_OF_STUDENT_API,
                url: `${ASSIGNMENTS_OF_STUDENT_API.url}/${studentId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch assignments'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchAssignmentsOfStudentAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching assignments'
        };
    }
}

export async function fetchAttendanceByStudentIdAction(id: string): Promise<{
    success: boolean;
    data: Attendance[] | null;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<Attendance[]>({
            endpoint: {
                ...ATTENDANCE_BY_STUDENT_ID_API,
                url: `${ATTENDANCE_BY_STUDENT_ID_API.url}/${id}`,
            },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch attendance'
            };
        }

        const attendanceDetails = response.data;
        return {
            success: true,
            data: attendanceDetails,
        };
    } catch (error) {
        console.error('Error in fetchAttendanceByStudentIdAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching attendance information'
        };
    }
}

export async function fetchEventsByDateAction(searchDate?: Date): Promise<{
    success: boolean;
    data: Events[] | [];
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: [],
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Better date formatting using built-in methods
        let params = {};

        if (searchDate) {
            // Format as YYYY-MM-DD consistently
            const year = searchDate.getFullYear();
            const month = String(searchDate.getMonth() + 1).padStart(2, '0');
            const day = String(searchDate.getDate()).padStart(2, '0');
            const currentDate = `${year}-${month}-${day}`;

            params = { selectDate: currentDate };
        }

        // Make API request with server token
        const response = await api<Events[]>({
            endpoint: EVENTS_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: [],
                error: response.message || 'Failed to fetch events'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchEventsByDateAction:', error);
        return {
            success: false,
            data: [],
            error: 'An unexpected error occurred while fetching events'
        };
    }
}


export async function fetchEventsListAction(searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: EventListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { 
            search: searchTerm,
            page: pageNo.toString()
         } : {
            page: pageNo.toString()
         };

        // Make API request with server token
        const response = await api<EventListResponse>({
            endpoint: ALL_EVENTS_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch events'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchEventsListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching event information'
        };
    }
}



export async function fetchLessonsWeeklyAction(): Promise<{
    success: boolean;
    data: Lesson[] | [];
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: [],
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<Lesson[]>({
            endpoint: LESSONS_WEEK_API,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: [],
                error: response.message || 'Failed to fetch events'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchLessonsWeeklyAction:', error);
        return {
            success: false,
            data: [],
            error: 'An unexpected error occurred while fetching lessons'
        };
    }
}

export async function fetchLessonsAction(searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: LessonListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { search: searchTerm, page: pageNo.toString() } : { page: pageNo.toString() };

        // Make API request with server token
        const response = await api<LessonListResponse>({
            endpoint: GET_LESSONS_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch lesson information'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchLessonsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching lesson information'
        };
    }
}

export async function fetchLessonsFullListAction(): Promise<{
    success: boolean;
    data: Lesson[] | [];
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: [],
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<Lesson[]>({
            endpoint: GET_LESSONS_FULL_LIST_API,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: [],
                error: response.message || 'Failed to fetch events'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchLessonsFullListAction:', error);
        return {
            success: false,
            data: [],
            error: 'An unexpected error occurred while fetching lessons'
        };
    }
}

export async function fetchLessonsForStudentsWeeklyAction(studentId: string): Promise<{
    success: boolean;
    data: Lesson[] | [];
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: [],
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<Lesson[]>({
            endpoint: {
                ...LESSONS_FOR_PARENT_STUDENT_WEEK_API,
                url: `${LESSONS_FOR_PARENT_STUDENT_WEEK_API.url}/${studentId}`,
            },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: [],
                error: response.message || 'Failed to fetch events'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchLessonsForStudentsWeeklyAction:', error);
        return {
            success: false,
            data: [],
            error: 'An unexpected error occurred while fetching lessons'
        };
    }
}


export async function fetchLessonsTeacherWeeklyAction(
    teacherId: string): Promise<{
    success: boolean;
    data: Lesson[] | [];
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: [],
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<Lesson[]>({
            endpoint: {
                ...LESSONS_TEACHER_WEEK_API,
                url: `${LESSONS_TEACHER_WEEK_API.url}/${teacherId}`,
            },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: [],
                error: response.message || 'Failed to fetch events'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchLessonsTeacherWeeklyAction:', error);
        return {
            success: false,
            data: [],
            error: 'An unexpected error occurred while fetching lessons'
        };
    }
}

export async function fetchLessonsForTeacherAction(teacherId: string, searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: LessonListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { search: searchTerm, page: pageNo.toString() } : { page: pageNo.toString() };

        // Make API request with server token
        const response = await api<LessonListResponse>({
            endpoint: {
                ...LESSONS_FOR_TEACHER_API,
                url: `${LESSONS_FOR_TEACHER_API.url}/${teacherId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch events'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchLessonsForTeacherAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching lessons'
        };
    }
}

export async function fetchLessonsForClassAction(classId: string, searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: LessonListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { search: searchTerm, page: pageNo.toString() } : { page: pageNo.toString() };

        // Make API request with server token
        const response = await api<LessonListResponse>({
            endpoint: {
                ...LESSONS_FOR_CLASS_API,
                url: `${LESSONS_FOR_CLASS_API.url}/${classId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch lessons'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchLessonsForClassAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching lessons'
        };
    }
}

export async function fetchResultsAction(
    searchTerm?: string, 
    pageNo: number = 1,
    filters?: {
        classId?: string;
        examId?: string;
        assignmentId?: string;
        type?: string;
    }
): Promise<{
    success: boolean;
    data: ResultListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore)

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Build params if search term provided
        const params: any = { page: pageNo };
        if (searchTerm) params.search = searchTerm;
        if (filters?.classId) params.class_id = filters.classId;
        if (filters?.examId) params.exam_id = filters.examId;
        if (filters?.assignmentId) params.assignment_id = filters.assignmentId;
        if (filters?.type) params.type = filters.type;

        // Make API request with server token
        const response = await api<ResultListResponse>({
            endpoint: GET_RESULTS_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch results'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchResultsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching results'
        };
    }
}

export async function fetchResultsOfStudentAction(
    searchTerm?: string, 
    pageNo: number = 1,
    studentId?: string,
    filters?: {
        classId?: string;
        examId?: string;
        assignmentId?: string;
        type?: string;
    }
): Promise<{
    success: boolean;
    data: ResultListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore)

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Build params if search term provided
        const params: any = { page: pageNo };
        if (searchTerm) params.search = searchTerm;
        if (filters?.classId) params.class_id = filters.classId;
        if (filters?.examId) params.exam_id = filters.examId;
        if (filters?.assignmentId) params.assignment_id = filters.assignmentId;
        if (filters?.type) params.type = filters.type;

        // Make API request with server token
        const response = await api<ResultListResponse>({
            endpoint: {
                ...GET_STUDENT_RESULTS_API,
                url: `${GET_STUDENT_RESULTS_API.url}/${studentId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch results'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchResultsOfStudentAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching results'
        };
    }
}

export async function fetchStudentClassAction(): Promise<{
    success: boolean;
    data: ClassReadonly | null;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore)

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<ClassReadonly>({
            endpoint: GET_STUDENT_CLASS_API,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch class information'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchStudentClassAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching class information'
        };
    }
}


export async function fetchStudentsAction(searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: StudentListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { search: searchTerm, page: pageNo.toString() } : { page: pageNo.toString() };

        // Make API request with server token
        const response = await api<StudentListResponse>({
            endpoint: GET_STUDENT_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch student information'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchStudentsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching student information'
        };
    }
}

export async function fetchStudentsOfClassAction(classId: string): Promise<{
    success: boolean;
    data: StudentWithRelations[] | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const response = await api<StudentWithRelations[]>({
            endpoint: {
                ...GET_STUDENTS_OF_CLASS_API,
                url: `${GET_STUDENTS_OF_CLASS_API.url}/${classId}`,
            },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch students of class'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchStudentsOfClassAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching students of class'
        };
    }
}

export async function fetchExamsOfClassAction(classId: string): Promise<{
    success: boolean;
    data: EventsWithRelations[] | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const response = await api<EventsWithRelations[]>({
            endpoint: {
                ...GET_EXAMS_OF_CLASS_FULL_LIST_API,
                url: `${GET_EXAMS_OF_CLASS_FULL_LIST_API.url}/${classId}`,
            },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch exams of class'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchExamsOfClassAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching exams of class'
        };
    }
}

export async function fetchAssignmentsOfClassFullListAction(classId: string): Promise<{
    success: boolean;
    data: AssignmentWithRelations[] | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const response = await api<AssignmentWithRelations[]>({
            endpoint: {
                ...ASSIGNMENTS_OF_CLASS_FULL_LIST_API,
                url: `${ASSIGNMENTS_OF_CLASS_FULL_LIST_API.url}/${classId}`,
            },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch assignments of class'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchAssignmentsOfClassFullListAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching assignments of class'
        };
    }
}

export async function fetchStudentByIdAction(id: string): Promise<{
    success: boolean;
    data: StudentWithRelations | null;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<StudentWithRelations>({
            endpoint: {
                ...GET_STUDENT_BY_ID_API,
                url: `${GET_STUDENT_BY_ID_API.url}/${id}`,
            },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch student'
            };
        }

        const studentDetails = response.data;
        return {
            success: true,
            data: studentDetails,
        };
    } catch (error) {
        console.error('Error in fetchStudentByIdAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching student information'
        };
    }
}

export async function fetchStudentsOfTeacherAction(teacherId: string, searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: StudentListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { search: searchTerm, page: pageNo.toString() } : { page: pageNo.toString() };

        // Make API request with server token
        const response = await api<StudentListResponse>({
            endpoint: {
                ...GET_TEACHERS_STUDENT_API,
                url: `${GET_TEACHERS_STUDENT_API.url}/${teacherId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch student information'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchStudentsOfTeacherAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching student information'
        };
    }
}


export async function fetchParentsAction(searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: ParentListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { search: searchTerm, page: pageNo.toString() } : { page: pageNo.toString() };

        // Make API request with server token
        const response = await api<ParentListResponse>({
            endpoint: GET_PARENTS_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch parent information'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchParentsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching parent information'
        };
    }
}

export async function fetchAllParentsListAction(): Promise<{
    success: boolean;
    data: ParentWithRelations[] | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<ParentWithRelations[]>({
            endpoint: GET_ALL_PARENTS_API,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch parent information'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.length || 0,
        };
    } catch (error) {
        console.error('Error in fetchAllParentsListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching parent information'
        };
    }
}

export async function fetchParentByIdAction(id: string): Promise<{
    success: boolean;
    data: ParentWithRelations | null;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<ParentWithRelations>({
            endpoint: {
                ...GET_PARENT_BY_ID_API,
                url: `${GET_PARENT_BY_ID_API.url}/${id}`,
            },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch parent'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchParentByIdAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching parent information'
        };
    }
}

export async function fetchTeacherByIdAction(id: string): Promise<{
    success: boolean;
    data: TeacherWithRelations | null;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<TeacherWithRelations>({
            endpoint: {
                ...GET_TEACHER_BY_ID_API,
                url: `${GET_TEACHER_BY_ID_API.url}/${id}`,
            },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch teacher'
            };
        }

        const teacherDetails = response.data;
        return {
            success: true,
            data: teacherDetails,
        };
    } catch (error) {
        console.error('Error in fetchTeacherByIdAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching teacher information'
        };
    }
}

export async function fetchTeachersListAction(searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: TeacherWithRelations[] | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { 
            search: searchTerm,
            page: pageNo.toString()
         } : {
            page: pageNo.toString()
         };

        // Make API request with server token
        const response = await api<TeacherListResponse>({
            endpoint: GET_TEACHER_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch teachers'
            };
        }

        const teachersData = response.data;

        const teachers = teachersData.data;

        const totalCount = teachersData.total_count || teachers.length;

        return {
            success: true,
            data: teachers,
            totalCount: totalCount,
        };
    } catch (error) {
        console.error('Error in fetchTeachersListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching teacher information'
        };
    }
}

export async function fetchTeachersOfClassesListAction(classId: string, searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: TeacherWithRelations[] | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { 
            search: searchTerm,
            page: pageNo.toString()
         } : {
            page: pageNo.toString()
         };

        // Make API request with server token
        const response = await api<TeacherListResponse>({
            endpoint: {
                ...GET_TEACHERS_OF_CLASS_API,
                url: `${GET_TEACHERS_OF_CLASS_API.url}/${classId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch teachers'
            };
        }

        const teachersData = response.data;

        const teachers = teachersData.data;

        const totalCount = teachersData.total_count || teachers?.length;

        return {
            success: true,
            data: teachers,
            totalCount: totalCount,
        };
    } catch (error) {
        console.error('Error in fetchTeachersOfClassesListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching teacher information'
        };
    }
}


export async function fetchFullTeachersListAction(): Promise<{
    success: boolean;
    data: TeacherWithRelations[] | null;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<TeacherWithRelations[]>({
            endpoint: GET_FULL_TEACHERS_API,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch teachers'
            };
        }

        const teachersData = response.data;

        return {
            success: true,
            data: teachersData
        };
    } catch (error) {
        console.error('Error in fetchFullTeachersListAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching teacher information'
        };
    }
}

export async function fetchFullGradeListAction(): Promise<{
    success: boolean;
    data: Grade[] | null;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<Grade[]>({
            endpoint: GET_GRADE_LIST_API,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch grades'
            };
        }

        const gradeData = response.data;

        return {
            success: true,
            data: gradeData
        };
    } catch (error) {
        console.error('Error in fetchFullGradeListAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching grade information'
        };
    }
}


export async function fetchClassesListAction(searchTerm?: string, supervisorId?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: ClassListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { 
            search: searchTerm,
            page: pageNo.toString()
         } : {
            page: pageNo.toString()
         };

        let response;
        
        if (!supervisorId) {

        // Make API request with server token
            response = await api<ClassListResponse>({
                endpoint: GET_CLASSES_API,
                params,
                serverToken: token.accessToken,
                isServer: true,
            });
        } else {
            response = await api<ClassListResponse>({
                endpoint: {
                    ...GET_SUPERVISORS_CLASSES_API,
                    url: `${GET_SUPERVISORS_CLASSES_API.url}/${supervisorId}`,
                },
                params,
                serverToken: token.accessToken,
                isServer: true,
            });
        }

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch classes'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchClassesListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching class information'
        };
    }
}

export async function fetchAllClassesAction(): Promise<{
    success: boolean;
    data: ClassReadonly[] | null;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<ClassReadonly[]>({
            endpoint: GET_ALL_CLASSES_API,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch all classes'
            };
        }

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Error in fetchAllClassesAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching all classes'
        };
    }
}


export async function fetchExamListAction(
    searchTerm?: string, 
    pageNo: number = 1,
    classId?: string,
    teacherId?: string
): Promise<{
    success: boolean;
    data: ExamListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Build query parameters
        const params = new URLSearchParams();
        params.append('page', pageNo.toString());
        
        if (searchTerm) {
            params.append('search', searchTerm);
        }
        
        if (classId) {
            params.append('classId', classId);
        }
        
        if (teacherId) {
            params.append('teacherId', teacherId);
        }

        // Make API request with server token
        let response;

        if (!classId && !teacherId) {
            response = await api<ExamListResponse>({
                endpoint: GET_EXAMS_API,
                params,
                serverToken: token.accessToken,
                isServer: true,
            });
        } else if (classId && !teacherId) {
            response = await api<ExamListResponse>({
                endpoint: {
                    ...GET_CLASS_EXAMS_API,
                    url: `${GET_CLASS_EXAMS_API.url}/${classId}`,
                },
                params,
                serverToken: token.accessToken,
                isServer: true,
            });
        } else if (teacherId && !classId) {
            response = await api<ExamListResponse>({
                endpoint: {
                    ...GET_TEACHER_EXAMS_API,
                    url: `${GET_TEACHER_EXAMS_API.url}/${teacherId}`,
                },
                params,
                serverToken: token.accessToken,
                isServer: true,
            });
        } else {
            params.delete('classId');
            params.delete('teacherId');

            // Both classId and teacherId provided - fetch by class then filter by teacher
            response = await api<ExamListResponse>({
                endpoint: {
                    ...GET_CLASS_EXAMS_API,
                    url: `${GET_CLASS_EXAMS_API.url}/${classId}`,
                },
                params,
                serverToken: token.accessToken,
                isServer: true,
            });

            if (!response.error && response.data) {
                // Filter by teacherId on client side if both classId and teacherId are provided
                const filteredExams = response.data.data.filter(exam => exam.lesson.teacher.id === teacherId);
                
                // Calculate proper pagination for filtered results
                const pageSize = 10;
                const totalFiltered = filteredExams.length;
                const startIndex = (pageNo - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const paginatedExams = filteredExams.slice(startIndex, endIndex);

                response.data.data = paginatedExams;
                response.data.total_count = totalFiltered;
                response.data.total_pages = Math.ceil(totalFiltered / pageSize);
                response.data.page = pageNo;
                response.data.has_next = endIndex < totalFiltered;
                response.data.has_prev = pageNo > 1;
            }
        }

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch exams'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchExamListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching exam information'
        };
    }
}

export async function fetchExamsOfTeacherListAction(teacherId: string, searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: ExamListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { 
            search: searchTerm,
            page: pageNo.toString()
         } : {
            page: pageNo.toString()
         };

        // Make API request with server token
        const response = await api<ExamListResponse>({
            endpoint: {
                ...GET_EXAMS_TEACHER_API,
                url: `${GET_EXAMS_TEACHER_API.url}/${teacherId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch exams'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchExamsOfTeacherListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching exam information'
        };
    }
}

export async function fetchExamsOfClassListAction(classId: string, searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: ExamListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { 
            search: searchTerm,
            page: pageNo.toString()
         } : {
            page: pageNo.toString()
         };

        // Make API request with server token
        const response = await api<ExamListResponse>({
            endpoint: {
                ...GET_EXAMS_CLASS_API,
                url: `${GET_EXAMS_CLASS_API.url}/${classId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch exams'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchExamsOfClassListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching exam information'
        };
    }
}

export async function fetchExamsOfStudentListAction(studentId: string, searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: ExamListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = searchTerm ? { 
            search: searchTerm,
            page: pageNo.toString()
         } : {
            page: pageNo.toString()
         };

        // Make API request with server token
        const response = await api<ExamListResponse>({
            endpoint: {
                ...GET_EXAMS_OF_STUDENT_API,
                url: `${GET_EXAMS_OF_STUDENT_API.url}/${studentId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch exams'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchExamsOfStudentListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching exam information'
        };
    }
}

export async function fetchSubjectFullListAction(): Promise<{
    success: boolean;
    data: SubjectWithRelations[] | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const response = await api<SubjectWithRelations[]>({
            endpoint: GET_FULL_LIST_SUBJECTS_API,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch subjects'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.length,
        };
    } catch (error) {
        console.error('Error in fetchSubjectFullListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching subject information'
        };
    }
}

export async function fetchSubjectListAction(searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: SubjectListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = {
            search: searchTerm || '',
            page: pageNo.toString(),
        }

        // Make API request with server token
        const response = await api<SubjectListResponse>({
            endpoint: GET_SUBJECTS_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch subjects'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchSubjectListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching subject information'
        };
    }
}

// ==================== ATTENDANCE ACTIONS ====================

export async function fetchAttendanceDashboardSummaryAction(date?: string): Promise<{
    success: boolean;
    data: AttendanceDashboardSummary | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = date ? { date } : {};

        const response = await api<AttendanceDashboardSummary>({
            endpoint: ATTENDANCE_DASHBOARD_SUMMARY_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch attendance dashboard summary'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchAttendanceDashboardSummaryAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching attendance summary'
        };
    }
}

export async function fetchAttendanceDashboardClassesAction(date?: string): Promise<{
    success: boolean;
    data: ClasswiseAttendanceResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = date ? { date } : {};

        const response = await api<ClasswiseAttendanceResponse>({
            endpoint: ATTENDANCE_DASHBOARD_CLASSES_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch class-wise attendance'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchAttendanceDashboardClassesAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching class-wise attendance'
        };
    }
}

export async function fetchTeacherClassesAttendanceAction(teacherId: string, date?: string): Promise<{
    success: boolean;
    data: TeacherClassSummary[] | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = date ? { target_date: date } : {};

        const response = await api<TeacherClassSummary[]>({
            endpoint: ATTENDANCE_TEACHER_CLASSES_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch teacher classes attendance'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchTeacherClassesAttendanceAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching teacher attendance'
        };
    }
}

export async function fetchClassAttendanceDetailAction(classId: string, date?: string): Promise<{
    success: boolean;
    data: ClassAttendanceDetailResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params = date ? { target_date: date } : {};

        const response = await api<ClassAttendanceDetailResponse>({
            endpoint: {
                ...ATTENDANCE_CLASS_DETAIL_API,
                url: `${ATTENDANCE_CLASS_DETAIL_API.url}/${classId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch class attendance details'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchClassAttendanceDetailAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching class attendance details'
        };
    }
}

export async function fetchStudentMonthlyAttendanceAction(studentId: string, month?: number, year?: number): Promise<{
    success: boolean;
    data: StudentMonthlyAttendance | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params: Record<string, string> = {};
        if (month) params.month = month.toString();
        if (year) params.year = year.toString();

        const response = await api<StudentMonthlyAttendance>({
            endpoint: {
                ...ATTENDANCE_STUDENT_MONTHLY_API,
                url: `${ATTENDANCE_STUDENT_MONTHLY_API.url}/${studentId}/monthly`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch student monthly attendance'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchStudentMonthlyAttendanceAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching student attendance'
        };
    }
}

export async function fetchStudentCalendarAttendanceAction(studentId: string, month?: number, year?: number): Promise<{
    success: boolean;
    data: CalendarHeatmapResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params: Record<string, string> = {};
        if (month) params.month = month.toString();
        if (year) params.year = year.toString();

        const response = await api<CalendarHeatmapResponse>({
            endpoint: {
                ...ATTENDANCE_STUDENT_CALENDAR_API,
                url: `${ATTENDANCE_STUDENT_CALENDAR_API.url}/${studentId}/calendar`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch student calendar attendance'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchStudentCalendarAttendanceAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching student calendar'
        };
    }
}

export async function fetchParentChildrenAttendanceAction(month?: number, year?: number): Promise<{
    success: boolean;
    data: ParentChildrenAttendanceResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params: Record<string, string> = {};
        if (month) params.month = month.toString();
        if (year) params.year = year.toString();

        const response = await api<ParentChildrenAttendanceResponse>({
            endpoint: ATTENDANCE_PARENT_CHILDREN_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch children attendance'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchParentChildrenAttendanceAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching children attendance'
        };
    }
}

// ==================== ATTENDANCE TAKING ACTIONS ====================

export async function fetchLessonsForTakingAttendanceAction(targetDate?: string, classId?: string): Promise<{
    success: boolean;
    data: LessonsForDateResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params: Record<string, string> = {};
        if (targetDate) params.target_date = targetDate;
        if (classId) params.class_id = classId;

        const response = await api<LessonsForDateResponse>({
            endpoint: ATTENDANCE_TAKE_LESSONS_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch lessons for attendance'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchLessonsForTakingAttendanceAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching lessons'
        };
    }
}

export async function fetchLessonRosterAction(lessonId: string, targetDate?: string): Promise<{
    success: boolean;
    data: LessonRosterResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params: Record<string, string> = {};
        if (targetDate) params.target_date = targetDate;

        const response = await api<LessonRosterResponse>({
            endpoint: {
                ...ATTENDANCE_TAKE_ROSTER_API,
                url: `${ATTENDANCE_TAKE_ROSTER_API.url}/${lessonId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch lesson roster'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchLessonRosterAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching roster'
        };
    }
}

export async function checkAttendanceExistsAction(lessonId: string, targetDate?: string): Promise<{
    success: boolean;
    data: AttendanceCheckResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params: Record<string, string> = {};
        if (targetDate) params.target_date = targetDate;

        const response = await api<AttendanceCheckResponse>({
            endpoint: {
                ...ATTENDANCE_TAKE_CHECK_API,
                url: `${ATTENDANCE_TAKE_CHECK_API.url}/${lessonId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to check attendance status'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in checkAttendanceExistsAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while checking attendance'
        };
    }
}

export async function submitAttendanceAction(request: AttendanceTakeRequest): Promise<{
    success: boolean;
    data: AttendanceTakeResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const response = await api<AttendanceTakeResponse>({
            endpoint: ATTENDANCE_TAKE_SUBMIT_API,
            payloadData: request,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to submit attendance'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in submitAttendanceAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while submitting attendance'
        };
    }
}

// ===================== USER PROFILE =====================
export async function fetchUserProfileAction(): Promise<{
    success: boolean;
    data: UserProfile | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const response = await api<any>({
            endpoint: GET_CURRENT_USER_DETAILS_API,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch user profile'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchUserProfileAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching user profile'
        };
    }
}