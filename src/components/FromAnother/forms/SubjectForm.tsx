"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
import { useActionState } from "react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SubjectForm = ({
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
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const data = Object.fromEntries(formData);
      return type === "create" ? await createSubject(data) : await updateSubject(data);
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

  const { teachers } = relatedData;

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      {/* Form Fields Section */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <InputField
              label="Subject name"
              name="name"
              defaultValue={data?.name}
              register={register}
              error={errors?.name}
            />
          </div>
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
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Teachers
            </label>
            <select
              multiple
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white min-h-[120px]"
              {...register("teachers")}
              defaultValue={data?.teachers}
            >
              {teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option value={teacher.id} key={teacher.id} className="py-2">
                    {teacher.name + " " + teacher.surname}
                  </option>
                )
              )}
            </select>
            <p className="mt-1.5 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple teachers</p>
            {errors.teachers?.message && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.teachers.message.toString()}
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
              Create Subject
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Update Subject
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SubjectForm;
