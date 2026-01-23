"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { assignmentSchema, AssignmentSchema } from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import { createAssignment, updateAssignment } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileText, Calendar, BookOpen, Upload } from "lucide-react";

const AssignmentForm = ({
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
    formState: { errors },
  } = useForm<AssignmentSchema>({
    resolver: zodResolver(assignmentSchema),
  });

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      return type === "create"
        ? await createAssignment(formData)
        : await updateAssignment(formData);
    },
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((formData) => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        data.append(key, value as string);
      }
    });
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Assignment has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const lessons = relatedData?.lessons || [];

  // Get today's date for default values
  const today = new Date().toISOString().split("T")[0];
  
  // Default due date (7 days later)
  const defaultDueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      {/* Hidden ID field for updates */}
      {data?.id && <input type="hidden" {...register("id")} defaultValue={data.id} />}

      {/* Header Section */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
        <div className="p-2 bg-gray-100 rounded-lg">
          <FileText className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            {type === "create" ? "Create Assignment" : "Update Assignment"}
          </h1>
          <p className="text-sm text-gray-500">
            {type === "create"
              ? "Add a new assignment for students"
              : "Modify assignment details"}
          </p>
        </div>
      </div>

      {/* Title Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-400" />
          Assignment Title
        </label>
        <input
          type="text"
          {...register("title")}
          defaultValue={data?.title}
          placeholder="Enter assignment title"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
        />
        {errors.title && (
          <span className="text-xs text-red-500">{errors.title.message}</span>
        )}
      </div>

      {/* Lesson Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gray-400" />
          Lesson
        </label>
        <select
          {...register("lesson_id")}
          defaultValue={data?.lesson?.id || ""}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm bg-white"
        >
          <option value="">Select a lesson</option>
          {lessons.map((lesson: any) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name}
            </option>
          ))}
        </select>
        {errors.lesson_id && (
          <span className="text-xs text-red-500">{errors.lesson_id.message}</span>
        )}
      </div>

      {/* Date Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            Start Date
          </label>
          <input
            type="date"
            {...register("start_date")}
            defaultValue={data?.start_date?.split("T")[0] || today}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
          />
          {errors.start_date && (
            <span className="text-xs text-red-500">{errors.start_date.message}</span>
          )}
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            Due Date
          </label>
          <input
            type="date"
            {...register("due_date")}
            defaultValue={data?.due_date?.split("T")[0] || defaultDueDate}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
          />
          {errors.due_date && (
            <span className="text-xs text-red-500">{errors.due_date.message}</span>
          )}
        </div>
      </div>

      {/* PDF Upload Field (Optional) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Upload className="w-4 h-4 text-gray-400" />
          Attachment (Optional)
        </label>
        <div className="relative">
          <input
            type="file"
            accept=".pdf"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>
        {data?.pdf_name && (
          <p className="text-xs text-gray-500">
            Current file: {data.pdf_name}
          </p>
        )}
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-sm text-red-600">
            Something went wrong! Please try again.
          </span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm flex items-center justify-center gap-2"
      >
        <FileText className="w-4 h-4" />
        {type === "create" ? "Create Assignment" : "Update Assignment"}
      </button>
    </form>
  );
};

export default AssignmentForm;
