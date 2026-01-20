"use server";

import { cookies } from "next/headers";
import { api } from '@/api/api';
import { USER_COUNT_API, ANNOUNCEMENT_API, EVENTS_API, LESSONS_WEEK_API, GET_STUDENT_CLASS_API, GET_STUDENT_PARENT_API, LESSONS_FOR_PARENT_STUDENT_WEEK_URL, GET_TEACHER_API, GET_CLASSES_API, ALL_EVENTS_API } from '@/api/apiParams/admin';
import type { UsersCount, Announcement, Events, Lesson, ClassReadonly, Student, Teacher, TeacherWithRelations, TeacherListResponse, AnnouncementListResponse, ClassListResponse, ClassBase, EventListResponse } from '@/types/schemas';
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
                ...LESSONS_FOR_PARENT_STUDENT_WEEK_URL,
                url: `${LESSONS_FOR_PARENT_STUDENT_WEEK_URL.url}/${studentId}`,
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


export async function fetchParentStudentsAction(searchTerm?: string): Promise<{
    success: boolean;
    data: Student[] | null;
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

        const params = searchTerm ? { search: searchTerm } : {};

        // Make API request with server token
        const response = await api<Student[]>({
            endpoint: GET_STUDENT_PARENT_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

        if (response.error || !response.data) {
            return {
                success: false,
                data: null,
                error: response.message || 'Failed to fetch student information'
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error in fetchParentStudentsAction:', error);
        return {
            success: false,
            data: null,
            error: 'An unexpected error occurred while fetching student information'
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


export async function fetchClassesListAction(searchTerm?: string, pageNo: number = 1): Promise<{
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

        // Make API request with server token
        const response = await api<ClassListResponse>({
            endpoint: GET_CLASSES_API,
            params,
            serverToken: token.accessToken,
            isServer: true,
        });

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
