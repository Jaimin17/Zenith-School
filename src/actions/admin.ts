"use server";

import { cookies } from "next/headers";
import { api } from '@/api/api';
import { CHANGE_PASSWORD_API, UPDATE_PROFILE_API, UPDATE_PROFILE_PICTURE_API } from "@/api/apiParams/auth";
import { USER_COUNT_API, ANNOUNCEMENT_API, EVENTS_API, LESSONS_WEEK_API, GET_STUDENT_CLASS_API, GET_STUDENT_API, LESSONS_FOR_PARENT_STUDENT_WEEK_API, GET_TEACHER_API, GET_CLASSES_API, ALL_EVENTS_API, GET_EVENT_BY_ID_API, GET_PUBLIC_EVENT_BY_ID_API, GET_EXAMS_API, GET_CLASS_EXAMS_API, GET_TEACHER_EXAMS_API, GET_FULL_TEACHERS_API, GET_ALL_CLASSES_API, GET_SUBJECTS_API, ASSIGNMENT_API, GET_RESULTS_API, GET_PARENTS_API, GET_PARENT_BY_ID_API, GET_TEACHER_BY_ID_API, ANNOUNCEMENT_TEACHER_API, LESSONS_TEACHER_WEEK_API, GET_TEACHERS_STUDENT_API, GET_LESSONS_API, LESSONS_FOR_TEACHER_API, GET_EXAMS_TEACHER_API, ASSIGNMENTS_OF_TEACHER_API, GET_SUPERVISORS_CLASSES_API, GET_STUDENT_BY_ID_API, ATTENDANCE_BY_STUDENT_ID_API, ANNOUNCEMENT_STUDENT_API, LESSONS_FOR_CLASS_API, GET_TEACHERS_OF_CLASS_API, GET_EXAMS_CLASS_API, ASSIGNMENTS_OF_CLASS_API, GET_STUDENT_RESULTS_API, GET_EXAMS_OF_STUDENT_API, ASSIGNMENTS_OF_STUDENT_API, ATTENDANCE_DASHBOARD_SUMMARY_API, ATTENDANCE_DASHBOARD_CLASSES_API, ATTENDANCE_TEACHER_CLASSES_API, ATTENDANCE_CLASS_DETAIL_API, ATTENDANCE_STUDENT_MONTHLY_API, ATTENDANCE_STUDENT_CALENDAR_API, ATTENDANCE_PARENT_CHILDREN_API, ATTENDANCE_TAKE_LESSONS_API, ATTENDANCE_TAKE_ROSTER_API, ATTENDANCE_TAKE_CHECK_API, ATTENDANCE_TAKE_SUBMIT_API, GET_FULL_LIST_SUBJECTS_API, GET_ALL_PARENTS_API, GET_GRADE_LIST_API, GET_LESSONS_FULL_LIST_API, GET_STUDENTS_OF_CLASS_API, GET_EXAMS_OF_CLASS_FULL_LIST_API, ASSIGNMENTS_OF_CLASS_FULL_LIST_API, GET_CURRENT_USER_DETAILS_API, CHAT_BOT_API, BANNER_API, PHOTO_GALLERY_API, TESTIMONIAL_API, TESTIMONIAL_ACTIVE_API, ALL_PUBLIC_EVENTS_API, GET_ACADEMIC_YEARS_ALL_API, GET_ACADEMIC_YEARS_API, GET_ACADEMIC_YEAR_ACTIVE_API, SAVE_ACADEMIC_YEAR_API, ACTIVATE_ACADEMIC_YEAR_API, GET_CHILDREN_OF_PARENT_API, BULK_PROMOTE_STUDENTS_API, ASSIGN_CLASS_TO_STUDENT_API, UPDATE_ACADEMIC_YEAR_API, SEED_STUDENTS_TO_YEAR_API, GET_STUDENT_SELF_YEAR_DATA_API, GET_LESSONS_BY_YEAR_API, GET_VISIBLE_ACADEMIC_YEARS_API, SPORTS_PROGRAM_API, JOB_OPENINGS_PUBLIC_API, JOB_OPENINGS_API, JOB_APPLICATIONS_API, ACHIEVEMENT_API, ACHIEVEMENT_PUBLIC_API } from '@/api/apiParams/admin';
import type { UsersCount, Announcement, Events, Lesson, ClassReadonly, StudentWithRelations, Teacher, TeacherWithRelations, TeacherListResponse, AnnouncementListResponse, ClassListResponse, ClassBase, EventListResponse, ExamListResponse, SubjectListResponse, StudentListResponse, AssignmentListResponse, ResultListResponse, ParentListResponse, ParentWithRelations, LessonListResponse, Attendance, AttendanceDashboardSummary, ClasswiseAttendanceResponse, TeacherClassesAttendanceResponse, ClassAttendanceDetailResponse, StudentMonthlyAttendance, CalendarHeatmapResponse, ParentChildrenAttendanceResponse, ClassesForDateResponse, ClassRosterResponse, AttendanceTakeRequest, AttendanceTakeResponse, AttendanceCheckResponse, TeacherClassSummary, Subject, Grade, SubjectWithRelations, AssignmentWithRelations, EventsWithRelations, UserProfile, ChangeUserPasswordRequest, UpdateProfileRequest, BannerListResponse, PhotoGalleryListResponse, TestimonialListResponse, Testimonial, AcademicYear, AcademicYearListResponse, ChildItem, BulkPromoteRequest, BulkPromoteResponse, StudentYearDataResponse, StudentHistoryResponse, SportsProgramListResponse, JobOpening, JobOpeningListResponse, JobApplicationListResponse, Achievement, AchievementListResponse } from '@/types/schemas';
import { getServerAuthTokens } from "@/utils/cookie";

export async function getChatBotTokenAction(): Promise<{
  success: boolean;
  accessToken: string | null;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();
    const token = getServerAuthTokens(cookieStore);

    if (!token?.accessToken) {
      return {
        success: false,
        accessToken: null,
        error: "Unauthorized: No authentication token found",
      };
    }

    return {
      success: true,
      accessToken: token.accessToken,
    };
  } catch (error) {
    console.error("Error in getChatBotTokenAction:", error);
    return {
      success: false,
      accessToken: null,
      error: "Failed to retrieve authentication token",
    };
  }
}


export async function fetchUserCountsAction(yearId?: string): Promise<{
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

        const params = yearId ? { year_id: yearId } : undefined;

        const response = await api<UsersCount>({
            endpoint: USER_COUNT_API,
            params,
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

export async function fetchAnnouncementsAction(
    searchTerm?: string,
    pageNo: number = 1,
    fromDate?: string,
    toDate?: string,
    selectedChildId?: string | null
): Promise<{
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

        // Build params
        const params: Record<string, string | number> = { page: pageNo };
        if (searchTerm) params.search = searchTerm;
        if (fromDate) params.from_date = fromDate;
        if (toDate) params.to_date = toDate;
        if (selectedChildId) params.student_id = selectedChildId;

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
    dueDate?: string,
    yearId?: string
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

        if (yearId) {
            params.academic_year_id = yearId;
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
    dueDate?: string,
    yearId?: string
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

        if (yearId) {
            params.academic_year_id = yearId;
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
    dueDate?: string,
    yearId?: string
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

        if (yearId) {
            params.academic_year_id = yearId;
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
        const selectedYearId = cookieStore.get("selected_year_id")?.value;

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

export async function fetchPublicEventsListAction(pageNo: number = 1): Promise<{
    success: boolean;
    data: EventListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        const params = { 
            page: pageNo.toString()
         };

        // Make API request with server token
        const response = await api<EventListResponse>({
            endpoint: ALL_PUBLIC_EVENTS_API,
            params,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch public events'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchPublicEventsListAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching public event information'
        };
    }
}


export async function fetchEventsListAction(searchTerm?: string, pageNo: number = 1, fromDate?: string, toDate?: string, selectedChildId?: string): Promise<{
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

        const params: Record<string, string> = { page: pageNo.toString() };
        if (searchTerm) params.search = searchTerm;
        if (fromDate) params.from_date = fromDate;
        if (toDate) params.to_date = toDate;
        if (selectedChildId) params.student_id = selectedChildId;
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

export async function fetchAchievementsAction(searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: AchievementListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        // ACHIEVEMENT_API is public (withToken: false) so no server token required
        const params: Record<string, string | number> = { page: pageNo };
        if (searchTerm) params.search = searchTerm;

        const response = await api<AchievementListResponse>({
            endpoint: ACHIEVEMENT_API,
            params,
            isServer: true,
            withoutToken: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch achievements'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchAchievementsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching achievements'
        };
    }
}

export async function fetchPublicAchievementsAction(pageNo: number = 1): Promise<{
    success: boolean;
    data: AchievementListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        const response = await api<AchievementListResponse>({
            endpoint: ACHIEVEMENT_PUBLIC_API,
            params: { page: pageNo },
            isServer: true,
            withoutToken: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch achievements'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchPublicAchievementsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching achievements'
        };
    }
}

export async function fetchEventByIdAction(eventId: string): Promise<{
    success: boolean;
    data: EventsWithRelations | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return { success: false, data: null, error: 'Unauthorized: No authentication token found' };
        }

        const response = await api<EventsWithRelations>({
            endpoint: {
                ...GET_EVENT_BY_ID_API,
                url: `${GET_EVENT_BY_ID_API.url}/${eventId}`,
            },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return { success: false, data: null, error: response.message || 'Failed to fetch event' };
        }

        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchEventByIdAction:', error);
        return { success: false, data: null, error: 'An unexpected error occurred' };
    }
}

export async function fetchPublicEventByIdAction(eventId: string): Promise<{
    success: boolean;
    data: EventsWithRelations | null;
    error?: string;
}> {
    try {
        const response = await api<EventsWithRelations>({
            endpoint: {
                ...GET_PUBLIC_EVENT_BY_ID_API,
                url: `${GET_PUBLIC_EVENT_BY_ID_API.url}/${eventId}`,
            },
            isServer: true,
            withoutToken: true,
        });

        if (response.error || !response.data) {
            return { success: false, data: null, error: response.message || 'Failed to fetch event' };
        }

        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchPublicEventByIdAction:', error);
        return { success: false, data: null, error: 'An unexpected error occurred' };
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

export async function fetchLessonsAction(searchTerm?: string, pageNo: number = 1, yearId?: string): Promise<{
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

        const params: Record<string, string> = { page: pageNo.toString() };
        if (searchTerm) params.search = searchTerm;
        if (yearId) params.academic_year_id = yearId;

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

export async function fetchLessonsFullListAction(academic_year_id: string | undefined): Promise<{
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
        const params: { academic_year_id?: string } = {};
        if (academic_year_id && academic_year_id.trim().toLowerCase() !== 'undefined') {
            params.academic_year_id = academic_year_id;
        }

        const response = await api<Lesson[]>({
            endpoint: GET_LESSONS_FULL_LIST_API,
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

export async function fetchLessonsForTeacherAction(teacherId: string, searchTerm?: string, pageNo: number = 1, yearId?: string): Promise<{
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

        const params: Record<string, string> = { page: pageNo.toString() };
        if (searchTerm) params.search = searchTerm;
        if (yearId) params.academic_year_id = yearId;

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

export async function fetchLessonsForClassAction(classId: string, searchTerm?: string, pageNo: number = 1, yearId?: string): Promise<{
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

        const params: Record<string, string> = { page: pageNo.toString() };
        if (searchTerm) params.search = searchTerm;
        if (yearId) params.academic_year_id = yearId;

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
        yearId?: string;
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
        if (filters?.yearId) params.academic_year_id = filters.yearId;

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
        yearId?: string;
    },

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
        if (filters?.yearId) params.academic_year_id = filters.yearId;

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


export async function fetchStudentsAction(searchTerm?: string, pageNo: number = 1, yearId?: string): Promise<{
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

        const params: Record<string, string> = { page: pageNo.toString() };
        if (searchTerm) params.search = searchTerm;
        if (yearId) params.year_id = yearId;

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

export async function fetchStudentsOfTeacherAction(teacherId: string, searchTerm?: string, pageNo: number = 1, yearId?: string): Promise<{
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

        const params: Record<string, string> = { page: pageNo.toString() };
        if (searchTerm) params.search = searchTerm;
        if (yearId) params.year_id = yearId;

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


export async function fetchParentsAction(searchTerm?: string, pageNo: number = 1, yearId?: string): Promise<{
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

        const params: Record<string, string> = { page: pageNo.toString() };
        if (searchTerm) params.search = searchTerm;
        if (yearId) params.year_id = yearId;

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
        const selectedYearId = cookieStore.get("selected_year_id")?.value;

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const params: Record<string, string> = {};
        if (selectedYearId) {
            params.academic_year_id = selectedYearId;
        }

        const response = await api<TeacherWithRelations>({
            endpoint: {
                ...GET_TEACHER_BY_ID_API,
                url: `${GET_TEACHER_BY_ID_API.url}/${id}`,
            },
            params: Object.keys(params).length ? params : undefined,
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
        const selectedYearId = cookieStore.get("selected_year_id")?.value;

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params: Record<string, string> = {
            page: pageNo.toString(),
        };

        if (searchTerm) {
            params.search = searchTerm;
        }

        if (selectedYearId) {
            params.academic_year_id = selectedYearId;
        }

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
        const selectedYearId = cookieStore.get("selected_year_id")?.value;

        if (!token) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: 'Unauthorized: No authentication token found'
            };
        }

        const params: Record<string, string> = {
            page: pageNo.toString(),
        };

        if (searchTerm) {
            params.search = searchTerm;
        }

        if (selectedYearId) {
            params.academic_year_id = selectedYearId;
        }

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
        const selectedYearId = cookieStore.get("selected_year_id")?.value;

        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Unauthorized: No authentication token found'
            };
        }

        // Make API request with server token
        const params: Record<string, string> = {};
        if (selectedYearId) {
            params.academic_year_id = selectedYearId;
        }

        const response = await api<TeacherWithRelations[]>({
            endpoint: GET_FULL_TEACHERS_API,
            params: Object.keys(params).length ? params : undefined,
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

        const selectedYearId = cookieStore.get("selected_year_id")?.value;

        const params: Record<string, string> = searchTerm ? {
            search: searchTerm,
            page: pageNo.toString()
        } : {
            page: pageNo.toString()
        };

        if (selectedYearId) params.academic_year_id = selectedYearId;

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

        const selectedYearId = cookieStore.get("selected_year_id")?.value;

        // Make API request with server token
        const response = await api<ClassReadonly[]>({
            endpoint: GET_ALL_CLASSES_API,
            params: selectedYearId ? { academic_year_id: selectedYearId } : undefined,
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
    teacherId?: string,
    yearId?: string
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

        if (yearId) {
            params.append('academic_year_id', yearId);
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

export async function fetchExamsOfTeacherListAction(teacherId: string, searchTerm?: string, pageNo: number = 1, yearId?: string): Promise<{
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

        const params: Record<string, string> = { page: pageNo.toString() };
        if (searchTerm) params.search = searchTerm;
        if (yearId) params.academic_year_id = yearId;

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

export async function fetchExamsOfClassListAction(classId: string, searchTerm?: string, pageNo: number = 1, yearId?: string): Promise<{
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

        const params: Record<string, string> = { page: pageNo.toString() };
        if (searchTerm) params.search = searchTerm;
        if (yearId) params.academic_year_id = yearId;

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

export async function fetchExamsOfStudentListAction(studentId: string, searchTerm?: string, pageNo: number = 1, yearId?: string): Promise<{
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

        const params: Record<string, string> = { page: pageNo.toString() };
        if (searchTerm) params.search = searchTerm;
        if (yearId) params.academic_year_id = yearId;

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
    data: TeacherClassesAttendanceResponse | null;
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

        const response = await api<TeacherClassesAttendanceResponse>({
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

export async function fetchClassesForTakingAttendanceAction(targetDate?: string, classId?: string): Promise<{
    success: boolean;
    data: ClassesForDateResponse | null;
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

        const response = await api<ClassesForDateResponse>({
            endpoint: ATTENDANCE_TAKE_LESSONS_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch classes for attendance'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchClassesForTakingAttendanceAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching classes'
        };
    }
}

export async function fetchClassRosterAction(classId: string, targetDate?: string): Promise<{
    success: boolean;
    data: ClassRosterResponse | null;
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

        const response = await api<ClassRosterResponse>({
            endpoint: {
                ...ATTENDANCE_TAKE_ROSTER_API,
                url: `${ATTENDANCE_TAKE_ROSTER_API.url}/${classId}`,
            },
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch class roster'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchClassRosterAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching roster'
        };
    }
}

export async function checkAttendanceExistsAction(classId: string, targetDate?: string): Promise<{
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
                url: `${ATTENDANCE_TAKE_CHECK_API.url}/${classId}`,
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

export async function changeUserPassword(payloadData: ChangeUserPasswordRequest): Promise<{
    success: boolean;
    data: string | null;
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
            endpoint: CHANGE_PASSWORD_API,
            payloadData: payloadData,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to change user password'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in changeUserPasswordAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while changing user password'
        };
    }
}

export async function updateProfileDetails(payloadData: UpdateProfileRequest): Promise<{
    success: boolean;
    data: string | null;
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
            endpoint: UPDATE_PROFILE_API,
            payloadData: payloadData,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to update profile details'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in updateProfileDetailsAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while updating profile details'
        };
    }
}


export async function updateProfilePictureDetails(payloadData: FormData): Promise<{
    success: boolean;
    data: string | null;
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
            endpoint: UPDATE_PROFILE_PICTURE_API,
            payloadData: payloadData,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to update profile picture details'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in updateProfilePictureDetailsAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while updating profile picture details'
        };
    }
}

export async function fetchBannersAction(searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: BannerListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
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
            page: pageNo
        } : {
            page: pageNo
        };

        const response = await api<BannerListResponse>({
            endpoint: BANNER_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch banners'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchBannersAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching banners'
        };
    }
}

export async function fetchPublicBannersAction(): Promise<{
    success: boolean;
    data: BannerListResponse | null;
    error?: string;
}> {
    try {
        const response = await api<BannerListResponse>({
            endpoint: BANNER_API,
            params: { page: 1 },
            isServer: true,
            withoutToken: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch banners'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchPublicBannersAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching banners'
        };
    }
}

export async function fetchPhotoGalleryAction(searchTerm?: string, pageNo: number = 1, isSport?: boolean): Promise<{
    success: boolean;
    data: PhotoGalleryListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
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

        const params: Record<string, string | number | boolean> = { page: pageNo };
        if (searchTerm) params.search = searchTerm;
        if (typeof isSport === 'boolean') params.is_sport = isSport;

        const response = await api<PhotoGalleryListResponse>({
            endpoint: PHOTO_GALLERY_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch photo gallery'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchPhotoGalleryAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching photo gallery'
        };
    }
}

export async function fetchPublicPhotoGalleryAction(page: number = 1, isSport?: boolean): Promise<{
    success: boolean;
    data: PhotoGalleryListResponse | null;
    error?: string;
}> {
    try {
        const params: Record<string, string | number | boolean> = { page };
        if (typeof isSport === 'boolean') params.is_sport = isSport;

        const response = await api<PhotoGalleryListResponse>({
            endpoint: PHOTO_GALLERY_API,
            params,
            isServer: true,
            withoutToken: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch photo gallery'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchPublicPhotoGalleryAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching photo gallery'
        };
    }
}

export async function fetchSportsProgramsAction(search?: string, page: number = 1): Promise<{
    success: boolean;
    data: SportsProgramListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        const params: Record<string, string | number> = { page };
        if (search) params.search = search;

        const response = await api<SportsProgramListResponse>({
            endpoint: SPORTS_PROGRAM_API,
            params,
            isServer: true,
            withoutToken: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch sports programs'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchSportsProgramsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching sports programs'
        };
    }
}

export async function fetchPublicSportsProgramsAction(page: number = 1, search?: string): Promise<{
    success: boolean;
    data: SportsProgramListResponse | null;
    error?: string;
}> {
    const result = await fetchSportsProgramsAction(search, page);

    if (!result.success || !result.data) {
        return {
            success: false,
            data: null,
            error: result.error || 'Failed to fetch sports programs'
        };
    }

    return {
        success: true,
        data: result.data,
    };
}

export async function fetchJobOpeningsAction(searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: JobOpeningListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
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
            page: pageNo,
        } : {
            page: pageNo,
        };

        const response = await api<JobOpeningListResponse>({
            endpoint: JOB_OPENINGS_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch job openings'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchJobOpeningsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching job openings'
        };
    }
}

export async function fetchJobApplicationsAction(
    searchTerm?: string,
    pageNo: number = 1,
    openingId?: string,
    status?: string,
    isReviewed?: boolean
): Promise<{
    success: boolean;
    data: JobApplicationListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
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

        const params: Record<string, string | number | boolean> = { page: pageNo };
        if (searchTerm) params.search = searchTerm;
        if (openingId) params.opening_id = openingId;
        if (status) params.status = status;
        if (typeof isReviewed === 'boolean') params.is_reviewed = isReviewed;

        const response = await api<JobApplicationListResponse>({
            endpoint: JOB_APPLICATIONS_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch job applications'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchJobApplicationsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching job applications'
        };
    }
}

export async function fetchPublicJobOpeningsAction(search?: string, page: number = 1): Promise<{
    success: boolean;
    data: JobOpeningListResponse | null;
    error?: string;
}> {
    try {
        const params: Record<string, string | number> = { page };
        if (search) params.search = search;

        const response = await api<JobOpeningListResponse>({
            endpoint: JOB_OPENINGS_PUBLIC_API,
            params,
            isServer: true,
            withoutToken: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch public job openings'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchPublicJobOpeningsAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching public job openings'
        };
    }
}

export async function fetchPublicJobOpeningDetailAction(openingId: string): Promise<{
    success: boolean;
    data: JobOpening | null;
    error?: string;
}> {
    try {
        const response = await api<JobOpening>({
            endpoint: {
                ...JOB_OPENINGS_PUBLIC_API,
                url: `${JOB_OPENINGS_PUBLIC_API.url}/${openingId}`,
            },
            isServer: true,
            withoutToken: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch job opening detail'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchPublicJobOpeningDetailAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching job opening detail'
        };
    }
}

export async function fetchTestimonialsAction(searchTerm?: string, pageNo: number = 1): Promise<{
    success: boolean;
    data: TestimonialListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
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
            page: pageNo
        } : {
            page: pageNo
        };

        const response = await api<TestimonialListResponse>({
            endpoint: TESTIMONIAL_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                totalCount: 0,
                error: response.message || 'Failed to fetch testimonials'
            };
        }

        return {
            success: true,
            data: response.data,
            totalCount: response.data.total_count || 0,
        };
    } catch (error) {
        console.error('Error in fetchTestimonialsAction:', error);
        return {
            success: false,
            data: null,
            totalCount: 0,
            error: 'An unexpected error occurred while fetching testimonials'
        };
    }
}

export async function fetchPublicTestimonialsAction(): Promise<{
    success: boolean;
    data: Testimonial[];
    error?: string;
}> {
    try {
        const response = await api<Testimonial[]>({
            endpoint: TESTIMONIAL_ACTIVE_API,
            isServer: true,
            withoutToken: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: [],
                error: response.message || 'Failed to fetch testimonials'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchPublicTestimonialsAction:', error);
        return {
            success: false,
            data: [],
            error: 'An unexpected error occurred while fetching testimonials'
        };
    }
}
// -- Academic Years ------------------------------------------------------------

export async function fetchAcademicYearsAllAction(): Promise<{
    success: boolean;
    data: AcademicYear[];
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<AcademicYear[]>({
            endpoint: GET_ACADEMIC_YEARS_ALL_API,
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: [], error: response.message || 'Failed to fetch academic years' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchAcademicYearsAllAction:', error);
        return { success: false, data: [], error: 'An unexpected error occurred' };
    }
}

// -- Holidays -----------------------------------------------------------------

export async function fetchHolidaysAction(skip: number = 0, limit: number = 200): Promise<{
    success: boolean;
    data: { id: string; date: string; name: string; description: string | null }[];
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return { success: false, data: [], error: 'Unauthorized: No authentication token found' };
        }

        const response = await api<{ id: string; date: string; name: string; description: string | null }[]>({
            endpoint: {
                url: 'api/v1/holiday/',
                method: 'GET',
                withToken: true,
                isMultipart: false,
                showToast: false,
                isForm: false,
            },
            params: { skip, limit },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return { success: false, data: [], error: response.message || 'Failed to fetch holidays' };
        }

        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchHolidaysAction:', error);
        return { success: false, data: [], error: 'An unexpected error occurred while fetching holidays' };
    }
}

export async function createHolidayAction(payload: {
    date: string;
    name: string;
    description?: string | null;
}): Promise<{ success: boolean; error?: string }> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return { success: false, error: 'Unauthorized: No authentication token found' };
        }

        const response = await api({
            endpoint: {
                url: 'api/v1/holiday/',
                method: 'POST',
                withToken: true,
                isMultipart: false,
                showToast: true,
                isForm: false,
            },
            payloadData: payload,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error) {
            return { success: false, error: response.message || 'Failed to create holiday' };
        }

        return { success: true };
    } catch (error) {
        console.error('Error in createHolidayAction:', error);
        return { success: false, error: 'An unexpected error occurred while creating holiday' };
    }
}

export async function updateHolidayAction(payload: {
    id: string;
    date?: string;
    name?: string;
    description?: string | null;
}): Promise<{ success: boolean; error?: string }> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return { success: false, error: 'Unauthorized: No authentication token found' };
        }

        const response = await api({
            endpoint: {
                url: `api/v1/holiday/${payload.id}`,
                method: 'PATCH',
                withToken: true,
                isMultipart: false,
                showToast: true,
                isForm: false,
            },
            payloadData: payload,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error) {
            return { success: false, error: response.message || 'Failed to update holiday' };
        }

        return { success: true };
    } catch (error) {
        console.error('Error in updateHolidayAction:', error);
        return { success: false, error: 'An unexpected error occurred while updating holiday' };
    }
}

export async function deleteHolidayAction(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);

        if (!token) {
            return { success: false, error: 'Unauthorized: No authentication token found' };
        }

        const response = await api({
            endpoint: {
                url: `api/v1/holiday/${id}`,
                method: 'DELETE',
                withToken: true,
                isMultipart: false,
                showToast: true,
                isForm: false,
            },
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error) {
            return { success: false, error: response.message || 'Failed to delete holiday' };
        }

        return { success: true };
    } catch (error) {
        console.error('Error in deleteHolidayAction:', error);
        return { success: false, error: 'An unexpected error occurred while deleting holiday' };
    }
}

export async function fetchVisibleAcademicYearsAction(): Promise<{
    success: boolean;
    data: AcademicYear[];
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<AcademicYear[]>({
            endpoint: GET_VISIBLE_ACADEMIC_YEARS_API,
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: [], error: response.message || 'Failed to fetch visible academic years' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchVisibleAcademicYearsAction:', error);
        return { success: false, data: [], error: 'An unexpected error occurred' };
    }
}

export async function fetchAcademicYearsAction(pageNo?: number): Promise<{
    success: boolean;
    data: AcademicYearListResponse | null;
    totalCount: number;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const params: Record<string, string | number> = {};
        if (pageNo) params.page = pageNo;
        const response = await api<AcademicYearListResponse>({
            endpoint: GET_ACADEMIC_YEARS_API,
            params,
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: null, totalCount: 0, error: response.message || 'Failed to fetch academic years' };
        }
        return { success: true, data: response.data, totalCount: response.data.total_count };
    } catch (error) {
        console.error('Error in fetchAcademicYearsAction:', error);
        return { success: false, data: null, totalCount: 0, error: 'An unexpected error occurred' };
    }
}

export async function fetchActiveAcademicYearAction(): Promise<{
    success: boolean;
    data: AcademicYear | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<AcademicYear>({
            endpoint: GET_ACADEMIC_YEAR_ACTIVE_API,
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: null, error: response.message || 'No active academic year found' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchActiveAcademicYearAction:', error);
        return { success: false, data: null, error: 'An unexpected error occurred' };
    }
}

export async function activateAcademicYearAction(yearId: string): Promise<{
    success: boolean;
    data: AcademicYear | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<AcademicYear>({
            endpoint: { ...ACTIVATE_ACADEMIC_YEAR_API, url: `api/v1/academic-years/${yearId}/activate` },
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: null, error: response.message || 'Failed to activate academic year' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in activateAcademicYearAction:', error);
        return { success: false, data: null, error: 'An unexpected error occurred' };
    }
}

export async function updateAcademicYearAction(yearId: string, data: { year_label?: string; start_date?: string; end_date?: string }): Promise<{
    success: boolean;
    data: AcademicYear | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<AcademicYear>({
            endpoint: { ...UPDATE_ACADEMIC_YEAR_API, url: `api/v1/academic-years/${yearId}` },
            isServer: true,
            serverToken: token?.accessToken,
            payloadData: data,
        });
        if (response.error || !response.data) {
            return { success: false, data: null, error: response.message || 'Failed to update academic year' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in updateAcademicYearAction:', error);
        return { success: false, data: null, error: 'An unexpected error occurred' };
    }
}

export async function seedStudentsToAcademicYearAction(yearId: string): Promise<{
    success: boolean;
    data: { created: number; skipped: number } | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<{ created: number; skipped: number }>({
            endpoint: { ...SEED_STUDENTS_TO_YEAR_API, url: `api/v1/academic-years/${yearId}/seed-students` },
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: null, error: response.message || 'Failed to seed students' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in seedStudentsToAcademicYearAction:', error);
        return { success: false, data: null, error: 'An unexpected error occurred' };
    }
}

// -- Parent Child Selection ----------------------------------------------------

export async function fetchChildrenOfParentAction(): Promise<{
    success: boolean;
    data: ChildItem[];
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<ChildItem[]>({
            endpoint: GET_CHILDREN_OF_PARENT_API,
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: [], error: response.message || 'Failed to fetch children' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchChildrenOfParentAction:', error);
        return { success: false, data: [], error: 'An unexpected error occurred' };
    }
}

// -- Student Year Data ---------------------------------------------------------

export async function fetchStudentYearDataAction(studentId: string, yearId: string): Promise<{
    success: boolean;
    data: StudentYearDataResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<StudentYearDataResponse>({
            endpoint: { url: `api/v1/student/${studentId}/year-data/${yearId}`, method: 'GET', withToken: true, showToast: false, isMultipart: false, isForm: false },
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: null, error: response.message || 'Failed to fetch year data' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchStudentYearDataAction:', error);
        return { success: false, data: null, error: 'An unexpected error occurred' };
    }
}

export async function fetchStudentHistoryAction(studentId: string): Promise<{
    success: boolean;
    data: StudentHistoryResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<StudentHistoryResponse>({
            endpoint: { url: `api/v1/student/${studentId}/history`, method: 'GET', withToken: true, showToast: false, isMultipart: false, isForm: false },
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: null, error: response.message || 'Failed to fetch student history' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchStudentHistoryAction:', error);
        return { success: false, data: null, error: 'An unexpected error occurred' };
    }
}

// -- Admin: Bulk Promotion -----------------------------------------------------

export async function fetchMyStudentYearDataAction(yearId: string): Promise<{
    success: boolean;
    data: StudentYearDataResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<StudentYearDataResponse>({
            endpoint: { ...GET_STUDENT_SELF_YEAR_DATA_API, url: `api/v1/student/self/year-data/${yearId}` },
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: null, error: response.message || 'Failed to fetch year data' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchMyStudentYearDataAction:', error);
        return { success: false, data: null, error: 'An unexpected error occurred' };
    }
}

export async function fetchTeacherLessonsByYearAction(yearId: string): Promise<{
    success: boolean;
    data: Lesson[] | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<Lesson[]>({
            endpoint: GET_LESSONS_BY_YEAR_API,
            params: { academic_year_id: yearId },
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: null, error: response.message || 'Failed to fetch lessons' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in fetchTeacherLessonsByYearAction:', error);
        return { success: false, data: null, error: 'An unexpected error occurred' };
    }
}

// -- Admin: Bulk Promotion (prev comment moved above) --------------------------

export async function bulkPromoteStudentsAction(payload: BulkPromoteRequest): Promise<{
    success: boolean;
    data: BulkPromoteResponse | null;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const response = await api<BulkPromoteResponse>({
            endpoint: BULK_PROMOTE_STUDENTS_API,
            payloadData: payload,
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error || !response.data) {
            return { success: false, data: null, error: response.message || 'Promotion failed' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error in bulkPromoteStudentsAction:', error);
        return { success: false, data: null, error: 'An unexpected error occurred' };
    }
}

export async function assignClassToStudentAction(studentId: string, classId: string, academicYearId?: string): Promise<{
    success: boolean;
    error?: string;
}> {
    try {
        const cookieStore = await cookies();
        const token = getServerAuthTokens(cookieStore);
        const payload: { class_id: string; academic_year_id?: string } = { class_id: classId };
        if (academicYearId) payload.academic_year_id = academicYearId;
        const response = await api({
            endpoint: { ...ASSIGN_CLASS_TO_STUDENT_API, url: `api/v1/student/${studentId}/assign-class` },
            payloadData: payload,
            isServer: true,
            serverToken: token?.accessToken,
        });
        if (response.error) {
            return { success: false, error: response.message || 'Failed to assign class' };
        }
        return { success: true };
    } catch (error) {
        console.error('Error in assignClassToStudentAction:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}
