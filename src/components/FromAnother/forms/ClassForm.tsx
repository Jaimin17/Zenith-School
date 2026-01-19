"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  classSchema,
  ClassSchema,
  subjectSchema,
  SubjectSchema,
} from "@/lib/formValidationSchemas";
import {
  createClass,
  createSubject,
  updateClass,
  updateSubject,
} from "@/lib/actions";
import { useActionState } from "react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const data = Object.fromEntries(formData);
      return type === "create" ? await createClass(data) : await updateClass(data);
    },
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formAction(formData);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers, grades } = relatedData;

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      {/* Form Fields Section */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Class name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name}
          />
          <InputField
            label="Capacity"
            name="capacity"
            defaultValue={data?.capacity}
            register={register}
            error={errors?.capacity}
          />
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
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Supervisor</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("supervisorId")}
              defaultValue={data?.teachers}
            >
              {teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option
                    value={teacher.id}
                    key={teacher.id}
                    selected={data && teacher.id === data.supervisorId}
                  >
                    {teacher.name + " " + teacher.surname}
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
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Grade</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("gradeId")}
              defaultValue={data?.gradeId}
            >
              {grades.map((grade: { id: number; level: number }) => (
                <option
                  value={grade.id}
                  key={grade.id}
                  selected={data && grade.id === data.gradeId}
                >
                  {grade.level}
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

      {/* Error Message */}
      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <span className="text-red-600 text-xs font-bold">!</span>
          </div>
          <span className="text-sm text-red-600">Something went wrong! Please try again.</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button 
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
        >
          {type === "create" ? (
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
