import { z } from "zod";

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number. Must be 10 digits starting with 6-9."),
  address: z.string().min(1, "Address is required"),
  blood_type: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    errorMap: () => ({ message: "Please select a valid blood group" }),
  }),
  dob: z.string().or(z.date()),
  sex: z.enum(["male", "female"]),
  grade_id: z.string().min(1, "Grade is required"),
  class_id: z.string().min(1, "Class is required"),
  parent_id: z.string().min(1, "Parent is required"),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number. Must be 10 digits starting with 6-9."),
  address: z.string().min(1, "Address is required"),
  blood_type: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    errorMap: () => ({ message: "Please select a valid blood group" }),
  }),
  dob: z.string().or(z.date()),
  sex: z.enum(["male", "female"]),
  subjects: z.array(z.string()).min(1, "At least one subject must be selected"),
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const subjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Subject name is required"),
  teachers: z.array(z.string()).min(1, "At least one teacher must be selected"),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Class name is required"),
  capacity: z.string().min(1, "Capacity must be at least 1"),
  supervisorId: z.string(),
  gradeId: z.string(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const examSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Exam title must be at least 2 characters"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  lesson_id: z.string().min(1, "Lesson is required"),
});

export type ExamSchema = z.infer<typeof examSchema>;

export const announcementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().min(1, "Description is required"),
  announcement_date: z.string().min(1, "Announcement date is required"),
  class_id: z.string().optional(),
});

export type AnnouncementSchema = z.infer<typeof announcementSchema>;

export const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Event title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().min(1, "Start date is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_date: z.string().min(1, "End date is required"),
  end_time: z.string().min(1, "End time is required"),
  class_id: z.string().optional(),
});

export type EventSchema = z.infer<typeof eventSchema>;

export const assignmentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Assignment title must be at least 2 characters").max(200, "Title must be less than 200 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  lesson_id: z.string().min(1, "Lesson is required"),
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;

export const resultSchema = z.object({
  id: z.string().optional(),
  student_id: z.string().min(1, "Student is required"),
  exam_id: z.string().optional(),
  assignment_id: z.string().optional(),
  score: z.number().min(0, "Score must be at least 0").max(100, "Score cannot exceed 100"),
});

export type ResultSchema = z.infer<typeof resultSchema>;

export const parentSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number. Must be 10 digits starting with 6-9."),
  address: z.string().min(10, "Address must be at least 10 characters"),
});

export type ParentSchema = z.infer<typeof parentSchema>;

export const lessonSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Lesson name must be at least 3 characters"),
  day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"], {
    errorMap: () => ({ message: "Please select a valid day" }),
  }),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  subject_id: z.string().min(1, "Subject is required"),
  class_id: z.string().min(1, "Class is required"),
  teacher_id: z.string().min(1, "Teacher is required"),
});

export type LessonSchema = z.infer<typeof lessonSchema>;
