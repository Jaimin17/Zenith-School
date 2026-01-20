interface PaginationListReponse {
    total_count: number,
    page: number,
    total_pages: number,
    has_next: boolean,
    has_prev: boolean,
}

export interface StudentCount {
    boys: number;
    girls: number;
}

export interface UsersCount {
    admins: number;
    teachers: number;
    students: StudentCount;
    parents: number;
}

export interface ClassBase {
    id: string,
    name: string,
    capacity: number,
}

export interface Grade {
    id: string,
    level: number
}

export interface ClassReadonly extends ClassBase {
    supervisor: Teacher,
    grade: Grade,
}

export interface ClassListResponse extends PaginationListReponse {
    data: ClassReadonly[]
}

export interface Announcement {
    id: string,
    title: string,
    description: string,
    announcement_date: string,
    attachment: string | null,
    related_class: ClassBase | null,
}

export interface AnnouncementListResponse extends PaginationListReponse {
    data: Announcement[]
}

export interface Events {
    id: string,
    title: string,
    description: string,
    start_time: string,
    end_time: string,
}

export interface EventsWithRelations extends Events {
    related_class: ClassBase,
}

export interface EventListResponse extends PaginationListReponse {
    data: EventsWithRelations[],
}

export interface Teacher {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    img: string | null,
    blood_type: string | null,
    sex: string,
    dob: string | null,
}

export interface TeacherWithRelations extends Teacher {
    subjects: Subject[],
    classes: ClassBase[],
}

export interface TeacherListResponse extends PaginationListReponse {
    data: TeacherWithRelations[]
}

export interface Subject {
    id: string,
    name: string,
}

export interface Lesson {
    id: string,
    name: string,
    day: string,
    start_time: string,
    end_time: string,
    subject: Subject,
    related_class: ClassBase,
    teacher: Teacher,
}

export interface Parent {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
}

export interface Student {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    img: string | null,
    blood_type: string | null,
    sex: string,
    dob: string | null,
    parent: Parent | null,
    related_class: ClassBase,
    grade: Grade,
}