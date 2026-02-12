'use client'

import { api } from '@/api/api';
import { GET_STUDENTS_OF_CLASS_API, GET_EXAMS_OF_CLASS_FULL_LIST_API, ASSIGNMENTS_OF_CLASS_FULL_LIST_API } from '@/api/apiParams/admin';
import { createContext, useCallback, useContext, useState } from 'react';

interface AdminContextType {
    loading: boolean;
    studentsOfClass: any[];
    examsOfClass: any[];
    assignmentsOfClass: any[];
    fetchStudentsOfClass: (classId: string) => Promise<any[]>;
    fetchExamsOfClass: (classId: string) => Promise<any[]>;
    fetchAssignmentsOfClass: (classId: string) => Promise<any[]>;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [studentsOfClass, setStudentsOfClass] = useState<any[]>([]);
    const [examsOfClass, setExamsOfClass] = useState<any[]>([]);
    const [assignmentsOfClass, setAssignmentsOfClass] = useState<any[]>([]);

    const fetchStudentsOfClass = useCallback(async (classId: string): Promise<any[]> => {
        try {
            setLoading(true);

            const res = await api({
                endpoint: {
                    ...GET_STUDENTS_OF_CLASS_API,
                    url: `${GET_STUDENTS_OF_CLASS_API.url}/${classId}`
                },
            });

            if (!res?.error) {
                const students = res?.data ? res.data : [];
                setStudentsOfClass(students);
                return students;
            } else {
                console.error('Error fetching students of class:', res?.message);
                setStudentsOfClass([]);
                return [];
            }
        } catch (error) {
            console.error('Error fetching students of class:', error);
            setStudentsOfClass([]);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchExamsOfClass = useCallback(async (classId: string): Promise<any[]> => {
        try {
            setLoading(true);

            const res = await api({
                endpoint: {
                    ...GET_EXAMS_OF_CLASS_FULL_LIST_API,
                    url: `${GET_EXAMS_OF_CLASS_FULL_LIST_API.url}/${classId}`
                },
            });

            if (!res?.error) {
                const exams = res?.data ? res.data : [];
                setExamsOfClass(exams);
                return exams;
            } else {
                console.error('Error fetching exams of class:', res?.message);
                setExamsOfClass([]);
                return [];
            }
        } catch (error) {
            console.error('Error fetching exams of class:', error);
            setExamsOfClass([]);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAssignmentsOfClass = useCallback(async (classId: string): Promise<any[]> => {
        try {
            setLoading(true);

            const res = await api({
                endpoint: {
                    ...ASSIGNMENTS_OF_CLASS_FULL_LIST_API,
                    url: `${ASSIGNMENTS_OF_CLASS_FULL_LIST_API.url}/${classId}`
                },
            });

            if (!res?.error) {
                const assignments = res?.data ? res.data : [];
                setAssignmentsOfClass(assignments);
                return assignments;
            } else {
                console.error('Error fetching assignments of class:', res?.message);
                setAssignmentsOfClass([]);
                return [];
            }
        } catch (error) {
            console.error('Error fetching assignments of class:', error);
            setAssignmentsOfClass([]);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <AdminContext.Provider 
            value={{
                loading,
                studentsOfClass,
                examsOfClass,
                assignmentsOfClass,
                fetchStudentsOfClass,
                fetchExamsOfClass,
                fetchAssignmentsOfClass,
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = (): AdminContextType => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}