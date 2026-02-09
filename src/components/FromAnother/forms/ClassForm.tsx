"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  classSchema,
  ClassSchema,
} from "@/lib/formValidationSchemas";
import {
  createClass,
  updateClass,
} from "@/lib/actions";
import { useActionState, useTransition } from "react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Users, GraduationCap, UserCheck } from "lucide-react";
import { Grade } from "@/types/schemas";

const ClassForm = ({
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
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  });

  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(
    async (prevState: any, formDataObj: Record<string, any>) => {
      return type === "create" ? await createClass(formDataObj) : await updateClass(formDataObj);
    },
    {
      success: false,
      error: false,
      message: "",
    }
  );

  const onSubmit = handleSubmit((formData) => {
    console.log("Form data:", formData);
    startTransition(() => {
      formAction(formData);
    });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(`Class has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers, grades } = relatedData;

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
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-800 mb-1">
                Please fix {errorCount} {errorCount === 1 ? 'error' : 'errors'} before submitting
              </h4>
              <ul className="text-xs text-red-600 space-y-1">
                {errors.name && <li>• Class Name: {errors.name.message}</li>}
                {errors.capacity && <li>• Capacity: {errors.capacity.message}</li>}
                {errors.supervisorId && <li>• Supervisor: {errors.supervisorId.message}</li>}
                {errors.gradeId && <li>• Grade: {errors.gradeId.message}</li>}
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
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

      {/* Hidden ID for updates */}
      {data && (
        <input type="hidden" {...register("id")} defaultValue={data?.id} />
      )}

      {/* Class Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Class Information
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Class Name */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">
              Class Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register("name")}
              defaultValue={data?.name}
              placeholder="Enter class name (e.g., 10-A, Grade 5B)"
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white ${
                errors.name 
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400" 
                  : "border-gray-300"
              }`}
            />
            {errors.name?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.name.message.toString()}
              </p>
            )}
          </div>

          {/* Capacity */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">
              Capacity <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              {...register("capacity")}
              defaultValue={data?.capacity}
              placeholder="Maximum number of students"
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white ${
                errors.capacity 
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400" 
                  : "border-gray-300"
              }`}
            />
            {errors.capacity?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.capacity.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Assignment Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Assignment Details
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Supervisor */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">
              Supervisor <span className="text-red-400">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 hover:bg-white ${
                errors.supervisorId 
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400" 
                  : "border-gray-300"
              }`}
              {...register("supervisorId")}
              defaultValue={data?.supervisor?.id || ""}
            >
              <option value="">Select a supervisor</option>
              {teachers?.map(
                (teacher: { id: string; first_name: string; last_name: string }) => (
                  <option
                    value={teacher.id}
                    key={teacher.id}
                  >
                    {teacher.first_name} {teacher.last_name}
                  </option>
                )
              )}
            </select>
            {errors.supervisorId?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.supervisorId.message.toString()}
              </p>
            )}
          </div>

          {/* Grade */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">
              Grade <span className="text-red-400">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 hover:bg-white ${
                errors.gradeId 
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400" 
                  : "border-gray-300"
              }`}
              {...register("gradeId")}
              defaultValue={data?.grade?.id || ""}
            >
              <option value="">Select a grade</option>
              {grades?.map((grade: Grade) => (
                <option
                  value={grade.id}
                  key={grade.id}
                >
                  Grade {grade.level}
                </option>
              ))}
            </select>
            {errors.gradeId?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.gradeId.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button 
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {type === "create" ? "Creating..." : "Updating..."}
            </>
          ) : type === "create" ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Class
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Update Class
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ClassForm;