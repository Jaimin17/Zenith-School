"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from "react";
import { resultSchema, ResultSchema } from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import { createResult, updateResult } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Award, User, FileText, ClipboardList, GraduationCap, Loader2 } from "lucide-react";

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
    setValue,
    formState: { errors },
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultSchema),
  });

  const [isPending, startTransition] = useTransition();
  const [resultType, setResultType] = useState<"exam" | "assignment">(
    data?.exam ? "exam" : data?.assignment ? "assignment" : "exam"
  );
  
  // State for class-based filtering
  const [selectedClassId, setSelectedClassId] = useState<string>(
    data?.student?.class?.id || data?.student?.class_id || ""
  );
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [filteredExams, setFilteredExams] = useState<any[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<any[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isLoadingExams, setIsLoadingExams] = useState(false);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);

  const [state, formAction] = useActionState(
    async (prevState: any, formDataObj: Record<string, any>) => {
      return type === "create"
        ? await createResult(formDataObj)
        : await updateResult(formDataObj);
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
      // Clear the unused field based on result type
      exam_id: resultType === "exam" ? formData.exam_id : undefined,
      assignment_id: resultType === "assignment" ? formData.assignment_id : undefined,
    };

    console.log("Result form data:", submissionData);
    startTransition(() => {
      formAction(submissionData);
    });
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

  // Clear the other field when switching result type
  useEffect(() => {
    if (resultType === "exam") {
      setValue("assignment_id", "");
    } else {
      setValue("exam_id", "");
    }
  }, [resultType, setValue]);

  // Fetch students, exams, and assignments when class is selected
  useEffect(() => {
    const fetchClassData = async () => {
      if (!selectedClassId) {
        setFilteredStudents([]);
        setFilteredExams([]);
        setFilteredAssignments([]);
        setValue("student_id", "");
        setValue("exam_id", "");
        setValue("assignment_id", "");
        return;
      }

      // Fetch students
      setIsLoadingStudents(true);
      try {
        const response = await fetch(`/api/student/getStudentsOfClass/${selectedClassId}`);
        if (response.ok) {
          const data = await response.json();
          setFilteredStudents(data.students || []);
        } else {
          setFilteredStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setFilteredStudents([]);
      } finally {
        setIsLoadingStudents(false);
      }

      // Fetch exams
      setIsLoadingExams(true);
      try {
        const response = await fetch(`/api/exam/allOfClass/${selectedClassId}`);
        if (response.ok) {
          const data = await response.json();
          setFilteredExams(data.exams || []);
        } else {
          setFilteredExams([]);
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
        setFilteredExams([]);
      } finally {
        setIsLoadingExams(false);
      }

      // Fetch assignments
      setIsLoadingAssignments(true);
      try {
        const response = await fetch(`/api/assignment/allOfClass/${selectedClassId}`);
        if (response.ok) {
          const data = await response.json();
          setFilteredAssignments(data.assignments || []);
        } else {
          setFilteredAssignments([]);
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setFilteredAssignments([]);
      } finally {
        setIsLoadingAssignments(false);
      }
    };

    fetchClassData();
  }, [selectedClassId, setValue]);

  // Set initial data for update mode
  useEffect(() => {
    if (type === "update") {
      if (data?.student) {
        setFilteredStudents([data.student]);
      }
      if (data?.exam) {
        setFilteredExams([data.exam]);
      }
      if (data?.assignment) {
        setFilteredAssignments([data.assignment]);
      }
    }
  }, [type, data]);

  const classes = relatedData?.classes || [];

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
                {errors.student_id && <li>• Student: {errors.student_id.message}</li>}
                {errors.exam_id && <li>• Exam: {errors.exam_id.message}</li>}
                {errors.assignment_id && <li>• Assignment: {errors.assignment_id.message}</li>}
                {errors.score && <li>• Score: {errors.score.message}</li>}
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

      {/* Class Selection Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-gray-400" />
          Class <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedClassId}
          onChange={(e) => {
            setSelectedClassId(e.target.value);
            setValue("student_id", ""); // Reset student when class changes
          }}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm bg-white"
        >
          <option value="">Select a class first</option>
          {classes.map((cls: any) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500">Select a class to load its students</p>
      </div>

      {/* Student Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          Student <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            {...register("student_id")}
            defaultValue={data?.student?.id || data?.student_id || ""}
            disabled={!selectedClassId || isLoadingStudents}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm bg-white disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <option value="">
              {!selectedClassId 
                ? "Select a class first" 
                : isLoadingStudents 
                  ? "Loading students..." 
                  : filteredStudents.length === 0 
                    ? "No students in this class" 
                    : "Select a student"}
            </option>
            {filteredStudents.map((student: any) => (
              <option key={student.id} value={student.id}>
                {student.first_name} {student.last_name}
              </option>
            ))}
          </select>
          {isLoadingStudents && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
            </div>
          )}
        </div>
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
            Exam <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("exam_id")}
              defaultValue={data?.exam?.id || data?.exam_id || ""}
              disabled={!selectedClassId || isLoadingExams}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm bg-white disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <option value="">
                {!selectedClassId 
                  ? "Select a class first" 
                  : isLoadingExams 
                    ? "Loading exams..." 
                    : filteredExams.length === 0 
                      ? "No exams for this class" 
                      : "Select an exam"}
              </option>
              {filteredExams.map((exam: any) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title}
                </option>
              ))}
            </select>
            {isLoadingExams && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
              </div>
            )}
          </div>
          {errors.exam_id && (
            <span className="text-xs text-red-500">{errors.exam_id.message}</span>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            Assignment <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("assignment_id")}
              defaultValue={data?.assignment?.id || data?.assignment_id || ""}
              disabled={!selectedClassId || isLoadingAssignments}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm bg-white disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <option value="">
                {!selectedClassId 
                  ? "Select a class first" 
                  : isLoadingAssignments 
                    ? "Loading assignments..." 
                    : filteredAssignments.length === 0 
                      ? "No assignments for this class" 
                      : "Select an assignment"}
              </option>
              {filteredAssignments.map((assignment: any) => (
                <option key={assignment.id} value={assignment.id}>
                  {assignment.title}
                </option>
              ))}
            </select>
            {isLoadingAssignments && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
              </div>
            )}
          </div>
          {errors.assignment_id && (
            <span className="text-xs text-red-500">{errors.assignment_id.message}</span>
          )}
        </div>
      )}

      {/* Score Field */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Award className="w-4 h-4 text-gray-400" />
          Score (0-100) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.01"
          {...register("score", { valueAsNumber: true })}
          defaultValue={data?.score ?? ""}
          placeholder="Enter score"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
        />
        {errors.score && (
          <span className="text-xs text-red-500">{errors.score.message}</span>
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
            {type === "create" ? "Adding..." : "Updating..."}
          </>
        ) : (
          <>
            <Award className="w-4 h-4" />
            {type === "create" ? "Add Result" : "Update Result"}
          </>
        )}
      </button>
    </form>
  );
};

export default ResultForm;
