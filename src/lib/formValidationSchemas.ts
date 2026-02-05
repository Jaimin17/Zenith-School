import { z } from "zod";

export const studentSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  name: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  bloodType: z.string().min(1, "Blood type is required"),
  birthday: z.string().or(z.date()),
  sex: z.enum(["MALE", "FEMALE"]),
  gradeId: z.number(),
  classId: z.number(),
  parentId: z.number().optional(),
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
  id: z.number().optional(),
  name: z.string().min(1, "Subject name is required"),
  teachers: z.array(z.number()).optional(),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Class name is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  supervisorId: z.number(),
  gradeId: z.number(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const examSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Exam title is required"),
  startTime: z.string().or(z.date()),
  endTime: z.string().or(z.date()),
  lessonId: z.number(),
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
  title: z.string().min(1, "Assignment title is required").max(200, "Title must be less than 200 characters"),
  start_date: z.string().min(1, "Start date is required"),
  due_date: z.string().min(1, "Due date is required"),
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
