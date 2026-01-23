interface PaginationListResponse {
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

export interface ClassListResponse extends PaginationListResponse {
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

export interface AnnouncementListResponse extends PaginationListResponse {
    data: Announcement[]
}

export interface AssignmentBase {
    id: string,
    title: string,
    start_date: string,
    due_date: string,
    pdf_name: string | null,
}

export interface AssignmentWithRelations extends AssignmentBase {
    lesson: Lesson,
}

export interface AssignmentListResponse extends PaginationListResponse {
    data: AssignmentWithRelations[],
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

export interface EventListResponse extends PaginationListResponse {
    data: EventsWithRelations[],
}

export interface ExamBase {
    id: string,
    title: string,
    start_time: string,
    end_time: string,
}

export interface ExamsWithRelations extends ExamBase {
    lesson: Lesson,
}

export interface ExamListResponse extends PaginationListResponse {
    data: ExamsWithRelations[],
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

export interface TeacherListResponse extends PaginationListResponse {
    data: TeacherWithRelations[]
}

export interface Subject {
    id: string,
    name: string,
}

export interface SubjectWithRelations extends Subject {
    teachers: Teacher[],
}

export interface SubjectListResponse extends PaginationListResponse {
    data: SubjectWithRelations[],
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

export interface StudentBase {
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

export interface Student extends StudentBase {
    parent: Parent | null,
    related_class: ClassBase,
    grade: Grade,
}

export interface StudentListResponse extends PaginationListResponse {
    data: Student[]
}

export interface ResultBase {
    id: string,
    score: number
}

export interface ResultWithRelations extends ResultBase {
    exam: ExamsWithRelations | null,
    assignment: AssignmentWithRelations | null,
    student: StudentBase,
}

export interface ResultListResponse extends PaginationListResponse {
    data: ResultWithRelations[]
}