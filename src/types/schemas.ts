interface PaginationListResponse {
    total_count: number,
    page: number,
    total_pages: number,
    has_next: boolean,
    has_prev: boolean,
}

export interface ChangeUserPasswordRequest {
    old_password: string,
    new_password: string,
    confirm_password: string
}

export interface UpdateProfileRequest {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
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
    description: string,
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

export interface Attendance {
    id: string,
    date: string,
    present: boolean,
}

// Attendance Dashboard Types
export interface AttendanceDashboardSummary {
    date: string;
    total_classes: number;
    classes_with_attendance: number;
    pending_classes: number;
    total_students: number;
    present_count: number;
    absent_count: number;
    attendance_rate: number;
}

export interface ClassAttendanceSummary {
    class_id: string;
    class_name: string;
    grade_level: number | null;
    total_students: number;
    present_count: number;
    absent_count: number;
    not_marked_count: number;
    attendance_rate: number;
    has_attendance: boolean;
}

export interface ClasswiseAttendanceResponse {
    date: string;
    classes: ClassAttendanceSummary[];
    total_classes: number;
}

export interface StudentAttendanceRecord {
    id: string;
    date: string;
    present: boolean;
    lesson_id: string;
    lesson_name: string;
    subject_name: string | null;
}

export interface StudentMonthlyAttendance {
    student_id: string;
    student_name: string;
    month: number;
    year: number;
    total_days: number;
    present_days: number;
    absent_days: number;
    attendance_rate: number;
    records: StudentAttendanceRecord[];
}

export interface CalendarDayData {
    date: string;
    present_count: number;
    absent_count: number;
    total_records: number;
    attendance_rate: number;
}

export interface CalendarHeatmapResponse {
    student_id: string | null;
    student_name: string | null;
    month: number;
    year: number;
    days: CalendarDayData[];
    monthly_summary: {
        total_days: number;
        present_days: number;
        absent_days: number;
        attendance_rate: number;
    };
}

export interface ClassStudentAttendance {
    student_id: string;
    student_name: string;
    username: string;
    attendance_id: string | null;
    present: boolean | null;
    marked_at: string | null;
}

export interface ClassAttendanceDetailResponse {
    class_id: string;
    class_name: string;
    date: string;
    lesson_id: string | null;
    lesson_name: string | null;
    total_students: number;
    present_count: number;
    absent_count: number;
    not_marked_count: number;
    students: ClassStudentAttendance[];
}

export interface TeacherClassSummary {
    class_id: string;
    class_name: string;
    lesson_id: string;
    lesson_name: string;
    subject_name: string | null;
    day: string;
    total_students: number;
    attendance_marked: boolean;
    present_count: number;
    absent_count: number;
}

export interface TeacherClassesAttendanceResponse {
    date: string;
    teacher_id: string;
    classes: TeacherClassSummary[];
}

export interface ChildAttendanceSummary {
    student_id: string;
    student_name: string;
    month: number;
    year: number;
    total_days: number;
    present_days: number;
    absent_days: number;
    attendance_rate: number;
}

export interface ParentChildrenAttendanceResponse {
    parent_id: string;
    month: number;
    year: number;
    children: ChildAttendanceSummary[];
}

// Attendance Taking Types
export interface LessonForDateItem {
    lesson_id: string;
    lesson_name: string;
    class_id: string;
    class_name: string;
    subject_id: string | null;
    subject_name: string | null;
    teacher_id: string | null;
    teacher_name: string | null;
    start_time: string;
    end_time: string;
    day: string;
    attendance_status: 'not_taken' | 'partial' | 'complete';
    students_count: number;
    present_count: number;
    absent_count: number;
}

export interface LessonsForDateResponse {
    date: string;
    day_of_week: string;
    total_lessons: number;
    lessons: LessonForDateItem[];
}

export interface StudentRosterItem {
    student_id: string;
    student_name: string;
    username: string;
    img: string | null;
    attendance_id: string | null;
    present: boolean | null;
}

export interface LessonRosterResponse {
    lesson_id: string;
    lesson_name: string;
    class_id: string;
    class_name: string;
    subject_name: string | null;
    target_date: string;
    total_students: number;
    attendance_exists: boolean;
    marked_count: number;
    students: StudentRosterItem[];
}

export interface AttendanceRecord {
    student_id: string;
    present: boolean;
}

export interface AttendanceTakeRequest {
    lesson_id: string;
    attendance_date: string;
    records: AttendanceRecord[];
    overwrite_existing: boolean;
}

export interface AttendanceTakeResponse {
    message: string;
    lesson_id: string;
    attendance_date: string;
    total_students: number;
    created_count: number;
    updated_count: number;
    present_count: number;
    absent_count: number;
}

export interface AttendanceCheckResponse {
    lesson_id: string;
    attendance_date: string;
    exists: boolean;
    record_count: number;
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
    lessons: LessonBase[],
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

export interface LessonBase {
    id: string,
    name: string,
    day: string,
    start_time: string,
    end_time: string,
}

export interface Lesson extends LessonBase {
    subject: Subject,
    related_class: ClassBase,
    teacher: Teacher,
}

export interface LessonListResponse extends PaginationListResponse {
    data: Lesson[],
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

export interface ParentWithRelations extends Parent {
    students: StudentBase[],
}

export interface ParentListResponse extends PaginationListResponse {
    data: ParentWithRelations[]
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

export interface StudentWithRelations extends StudentBase {
    parent: Parent | null,
    related_class: ClassBase,
    grade: Grade,
}

export interface StudentListResponse extends PaginationListResponse {
    data: StudentWithRelations[]
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

// User Profile Types
export interface AdminProfile {
    id: string;
    username: string;
    role: 'admin';
}

export interface UserProfileBase {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    address: string;
    created_at: string;
}

export interface ParentProfile extends UserProfileBase {
    role: 'parent';
}

export interface TeacherProfile extends UserProfileBase {
    img: string | null;
    blood_type: string;
    sex: string;
    dob: string;
    role: 'teacher';
}

export interface StudentProfile extends UserProfileBase {
    img: string | null;
    blood_type: string;
    sex: string;
    dob: string;
    parent_id: string | null;
    class_id: string | null;
    grade_id: string | null;
    role: 'student';
}

export type UserProfile = AdminProfile | ParentProfile | TeacherProfile | StudentProfile;

export interface Banner {
    id: string;
    title: string;
    description: string;
    img: string | null;
    is_active: boolean;
    created_at: string;
}

export interface BannerListResponse extends PaginationListResponse {
    data: Banner[];
}

export interface PhotoGallery {
    id: string;
    title: string;
    description: string;
    img: string | null;
    is_active: boolean;
    created_at: string;
}

export interface PhotoGalleryListResponse extends PaginationListResponse {
    data: PhotoGallery[];
}

export interface Testimonial {
    id: string;
    description: string;
    rating: number;
    is_active: boolean;
    is_delete: boolean;
    created_at: string;
    student: StudentBase;
}

export interface TestimonialListResponse extends PaginationListResponse {
    data: Testimonial[];
}