"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect, useMemo, useTransition } from "react";
import { lessonSchema, LessonSchema } from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import { createLesson, updateLesson } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const VALID_DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

const LessonForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LessonSchema>({
    resolver: zodResolver(lessonSchema),
  });

  const selectedSubjectId = watch("subject_id");
  const selectedTeacherId = watch("teacher_id");

  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(
    async (prevState: any, formDataObj: Record<string, any>) => {
      return type === "create"
        ? await createLesson(formDataObj)
        : await updateLesson(formDataObj);
    },
    {
      success: false,
      error: false,
      message: "",
    }
  );

  const onSubmit = handleSubmit((formData) => {
    console.log("Lesson form data:", formData);
    startTransition(() => {
      formAction(formData);
    });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Lesson has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { subjects = [], classes = [], teachers = [] } = relatedData || {};

  // Filter teachers based on selected subject
  const filteredTeachers = useMemo(() => {
    if (!selectedSubjectId) return teachers;
    // Find the selected subject and get its teachers
    const selectedSubject = subjects.find((s: any) => s.id === selectedSubjectId);
    if (!selectedSubject?.teachers?.length) return teachers;
    const teacherIds = new Set(selectedSubject.teachers.map((t: any) => t.id));
    return teachers.filter((t: any) => teacherIds.has(t.id));
  }, [selectedSubjectId, subjects, teachers]);

  // Filter subjects based on selected teacher
  const filteredSubjects = useMemo(() => {
    if (!selectedTeacherId) return subjects;
    // Find the selected teacher and get their subjects
    const selectedTeacher = teachers.find((t: any) => t.id === selectedTeacherId);
    if (!selectedTeacher?.subjects?.length) return subjects;
    const subjectIds = new Set(selectedTeacher.subjects.map((s: any) => s.id));
    return subjects.filter((s: any) => subjectIds.has(s.id));
  }, [selectedTeacherId, teachers, subjects]);

  // Count total validation errors
  const errorCount = Object.keys(errors).length;
  const hasValidationErrors = errorCount > 0;

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      {/* Validation Errors Summary */}
      {hasValidationErrors && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-shake">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-800 mb-1">
                Please fix {errorCount}{" "}
                {errorCount === 1 ? "error" : "errors"} before submitting
              </h4>
              <ul className="text-xs text-red-600 space-y-1">
                {errors.name && <li>• Name: {errors.name.message}</li>}
                {errors.day && <li>• Day: {errors.day.message}</li>}
                {errors.start_time && (
                  <li>• Start Time: {errors.start_time.message}</li>
                )}
                {errors.end_time && (
                  <li>• End Time: {errors.end_time.message}</li>
                )}
                {errors.subject_id && (
                  <li>• Subject: {errors.subject_id.message}</li>
                )}
                {errors.class_id && (
                  <li>• Class: {errors.class_id.message}</li>
                )}
                {errors.teacher_id && (
                  <li>• Teacher: {errors.teacher_id.message}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Server Error Message */}
      {state.error && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-800">
                Server Error
              </h4>
              <p className="text-sm text-red-600">
                {state.message || "Something went wrong! Please try again."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Details Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Lesson Details
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Lesson Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name}
          />
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Day</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("day")}
              defaultValue={data?.day?.toUpperCase() || ""}
            >
              <option value="">Select Day</option>
              {VALID_DAYS.map((day) => (
                <option key={day} value={day}>
                  {day.charAt(0) + day.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            {errors.day?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.day.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700">Schedule</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Start Time"
            name="start_time"
            type="time"
            defaultValue={data?.start_time || ""}
            register={register}
            error={errors?.start_time}
          />
          <InputField
            label="End Time"
            name="end_time"
            type="time"
            defaultValue={data?.end_time || ""}
            register={register}
            error={errors?.end_time}
          />
        </div>
      </div>

      {/* Assignment Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Subject, Class & Teacher
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Subject Select */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">
              Subject
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("subject_id")}
              defaultValue={data?.subject?.id || ""}
            >
              <option value="">Select Subject</option>
              {filteredSubjects.map(
                (subject: { id: string; name: string }) => (
                  <option value={subject.id} key={subject.id}>
                    {subject.name}
                  </option>
                )
              )}
            </select>
            {errors.subject_id?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.subject_id.message.toString()}
              </p>
            )}
          </div>

          {/* Class Select */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Class</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("class_id")}
              defaultValue={data?.related_class?.id || ""}
            >
              <option value="">Select Class</option>
              {classes.map(
                (cls: { id: string; name: string }) => (
                  <option value={cls.id} key={cls.id}>
                    {cls.name}
                  </option>
                )
              )}
            </select>
            {errors.class_id?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.class_id.message.toString()}
              </p>
            )}
          </div>

          {/* Teacher Select */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">
              Teacher
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("teacher_id")}
              defaultValue={data?.teacher?.id || ""}
            >
              <option value="">Select Teacher</option>
              {filteredTeachers.map(
                (teacher: {
                  id: string;
                  first_name: string;
                  last_name: string;
                }) => (
                  <option value={teacher.id} key={teacher.id}>
                    {teacher.first_name} {teacher.last_name}
                  </option>
                )
              )}
            </select>
            {errors.teacher_id?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.teacher_id.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Hidden ID field for update */}
      {data && (
        <InputField
          label="Id"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors?.id}
          hidden
        />
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {type === "create" ? "Creating..." : "Updating..."}
            </>
          ) : type === "create" ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Lesson
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Update Lesson
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default LessonForm;
