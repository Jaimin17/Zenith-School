"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { resultSchema, ResultSchema } from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import { createResult, updateResult } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Award, User, FileText, ClipboardList } from "lucide-react";

const ResultForm = ({
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
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultSchema),
  });

  const [resultType, setResultType] = useState<"exam" | "assignment">(
    data?.exam ? "exam" : data?.assignment ? "assignment" : "exam"
  );

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      return type === "create"
        ? await createResult(formData)
        : await updateResult(formData);
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
    // Add result type
    data.append("result_type", resultType);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Result has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const students = relatedData?.students || [];
  const exams = relatedData?.exams || [];
  const assignments = relatedData?.assignments || [];

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      {/* Hidden ID field for updates */}
      {data?.id && <input type="hidden" {...register("id")} defaultValue={data.id} />}

      {/* Header Section */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Award className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            {type === "create" ? "Add Result" : "Update Result"}
          </h1>
          <p className="text-sm text-gray-500">
            {type === "create"
              ? "Record a new student result"
              : "Modify result details"}
          </p>
        </div>
      </div>

      {/* Student Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          Student
        </label>
        <select
          {...register("student_id")}
          defaultValue={data?.student?.id || ""}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm bg-white"
        >
          <option value="">Select a student</option>
          {students.map((student: any) => (
            <option key={student.id} value={student.id}>
              {student.first_name} {student.last_name}
            </option>
          ))}
        </select>
        {errors.student_id && (
          <span className="text-xs text-red-500">{errors.student_id.message}</span>
        )}
      </div>

      {/* Result Type Toggle */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Result Type</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setResultType("exam")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              resultType === "exam"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Exam
          </button>
          <button
            type="button"
            onClick={() => setResultType("assignment")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              resultType === "assignment"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            Assignment
          </button>
        </div>
      </div>

      {/* Exam/Assignment Field */}
      {resultType === "exam" ? (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-gray-400" />
            Exam
          </label>
          <select
            {...register("exam_id")}
            defaultValue={data?.exam?.id || ""}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm bg-white"
          >
            <option value="">Select an exam</option>
            {exams.map((exam: any) => (
              <option key={exam.id} value={exam.id}>
                {exam.title}
              </option>
            ))}
          </select>
          {errors.exam_id && (
            <span className="text-xs text-red-500">{errors.exam_id.message}</span>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            Assignment
          </label>
          <select
            {...register("assignment_id")}
            defaultValue={data?.assignment?.id || ""}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm bg-white"
          >
            <option value="">Select an assignment</option>
            {assignments.map((assignment: any) => (
              <option key={assignment.id} value={assignment.id}>
                {assignment.title}
              </option>
            ))}
          </select>
          {errors.assignment_id && (
            <span className="text-xs text-red-500">{errors.assignment_id.message}</span>
          )}
        </div>
      )}

      {/* Score Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Award className="w-4 h-4 text-gray-400" />
          Score (0-100)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          {...register("score", { valueAsNumber: true })}
          defaultValue={data?.score || ""}
          placeholder="Enter score"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
        />
        {errors.score && (
          <span className="text-xs text-red-500">{errors.score.message}</span>
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
        <Award className="w-4 h-4" />
        {type === "create" ? "Add Result" : "Update Result"}
      </button>
    </form>
  );
};

export default ResultForm;
