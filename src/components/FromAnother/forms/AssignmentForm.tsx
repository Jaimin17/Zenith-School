"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useRef, useTransition, useState } from "react";
import { assignmentSchema, AssignmentSchema } from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import { createAssignment, updateAssignment } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileText, Calendar, BookOpen, Upload, AlignLeft, X, ExternalLink } from "lucide-react";
import { getAssignmentPdfUrl } from "@/utils/imageHelpers";

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

  const [isPending, startTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction] = useActionState(
    async (prevState: any, formDataObj: Record<string, any>) => {
      return type === "create"
        ? await createAssignment(formDataObj)
        : await updateAssignment(formDataObj);
    },
    {
      success: false,
      error: false,
      message: "",
    }
  );

  const onSubmit = handleSubmit((formData) => {
    const submissionData: Record<string, any> = {
      ...formData,
    };

    // For disabled date fields (past dates during update), use original values
    if (isStartDateInPast && originalStartDate) {
      submissionData.start_date = originalStartDate;
    }
    if (isEndDateInPast && originalEndDate) {
      submissionData.end_date = originalEndDate;
    }

    // Include PDF file if selected
    if (selectedFile) {
      submissionData.pdf = selectedFile;
    }

    console.log("Assignment form data:", submissionData);
    startTransition(() => {
      formAction(submissionData);
    });
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const lessons = relatedData?.lessons || [];

  // Get today's date for default values
  const today = new Date().toISOString().split("T")[0];

  // Default end date (7 days later)
  const defaultEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  // Check if original dates are in the past (for update mode)
  const originalStartDate = data?.start_date?.split("T")[0];
  const originalEndDate = data?.due_date?.split("T")[0] || data?.end_date?.split("T")[0];
  const isStartDateInPast = type === "update" && originalStartDate && originalStartDate < today;
  const isEndDateInPast = type === "update" && originalEndDate && originalEndDate < today;

  // Count total validation errors
  const errorCount = Object.keys(errors).length;
  const hasValidationErrors = errorCount > 0;

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      {/* Hidden ID field for updates */}
      {data?.id && <input type="hidden" {...register("id")} defaultValue={data.id} />}

      {/* Validation Errors Summary */}
      {hasValidationErrors && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
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
                Please fix {errorCount} {errorCount === 1 ? "error" : "errors"} before submitting
              </h4>
              <ul className="text-xs text-red-600 space-y-1">
                {errors.title && <li>• Title: {errors.title.message}</li>}
                {errors.description && <li>• Description: {errors.description.message}</li>}
                {errors.lesson_id && <li>• Lesson: {errors.lesson_id.message}</li>}
                {errors.start_date && <li>• Start Date: {errors.start_date.message}</li>}
                {errors.end_date && <li>• End Date: {errors.end_date.message}</li>}
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
              <h4 className="text-sm font-semibold text-red-800">Server Error</h4>
              <p className="text-sm text-red-600">
                {state.message || "Something went wrong! Please try again."}
              </p>
            </div>
          </div>
        </div>
      )}

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
          Assignment Title <span className="text-red-500">*</span>
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

      {/* Description Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <AlignLeft className="w-4 h-4 text-gray-400" />
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description")}
          defaultValue={data?.description}
          placeholder="Enter assignment description"
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm resize-none"
        />
        {errors.description && (
          <span className="text-xs text-red-500">{errors.description.message}</span>
        )}
      </div>

      {/* Lesson Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gray-400" />
          Lesson <span className="text-red-500">*</span>
        </label>
        <select
          {...register("lesson_id")}
          defaultValue={data?.lesson?.id || data?.lesson_id || ""}
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
            Start Date <span className="text-red-500">*</span>
            {isStartDateInPast && (
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">(Past date - locked)</span>
            )}
          </label>
          <input
            type="date"
            {...register("start_date")}
            defaultValue={originalStartDate || today}
            min={isStartDateInPast ? undefined : today}
            disabled={isStartDateInPast}
            className={`w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm ${
              isStartDateInPast ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""
            }`}
          />
          {errors.start_date && (
            <span className="text-xs text-red-500">{errors.start_date.message}</span>
          )}
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            End Date <span className="text-red-500">*</span>
            {isEndDateInPast && (
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">(Past date - locked)</span>
            )}
          </label>
          <input
            type="date"
            {...register("end_date")}
            defaultValue={originalEndDate || defaultEndDate}
            disabled={isEndDateInPast}
            className={`w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm ${
              isEndDateInPast ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""
            }`}
          />
          {errors.end_date && (
            <span className="text-xs text-red-500">{errors.end_date.message}</span>
          )}
        </div>
      </div>

      {/* PDF Upload Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Upload className="w-4 h-4 text-gray-400" />
          PDF Attachment {type === "create" && <span className="text-red-500">*</span>}
          {type === "update" && <span className="text-gray-400">(Optional)</span>}
        </label>
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>
        {selectedFile && (
          <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg">
            <FileText className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700 flex-1 truncate">{selectedFile.name}</span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="p-1 hover:bg-green-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-green-600" />
            </button>
          </div>
        )}
        {data?.pdf_name && !selectedFile && (
          <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700 flex-1 truncate">
              Current: {data.pdf_name}
            </span>
            <a
              href={getAssignmentPdfUrl(data.pdf_name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
            >
              View PDF
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
        {type === "create" && !selectedFile && (
          <p className="text-xs text-gray-400">
            PDF file is required for creating an assignment
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {type === "create" ? "Creating..." : "Updating..."}
          </>
        ) : (
          <>
            <FileText className="w-4 h-4" />
            {type === "create" ? "Create Assignment" : "Update Assignment"}
          </>
        )}
      </button>
    </form>
  );
};

export default AssignmentForm;
