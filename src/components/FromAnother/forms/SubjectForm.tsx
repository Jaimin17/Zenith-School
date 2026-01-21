"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
import { useActionState } from "react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BookOpen, Users } from "lucide-react";

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
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formAction(formData);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers } = relatedData;

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      {/* Header Section */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
        <div className="p-2 bg-gray-100 rounded-lg">
          <BookOpen className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">
            {type === "create" ? "Create New Subject" : "Update Subject"}
          </h3>
          <p className="text-xs text-gray-500">
            Fill in the subject details below
          </p>
        </div>
      </div>

      {/* Hidden ID for updates */}
      {data && (
        <input type="hidden" {...register("id")} defaultValue={data?.id} />
      )}

      {/* Subject Name */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Subject Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          {...register("name")}
          defaultValue={data?.name}
          placeholder="Enter subject name"
          className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none ${
            errors.name 
              ? "border-red-400 focus:ring-red-400 focus:border-red-400" 
              : "border-gray-200 hover:border-gray-300"
          }`}
        />
        {errors.name?.message && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message.toString()}</p>
        )}
      </div>

      {/* Assign Teachers */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <label className="text-sm font-medium text-gray-700">
            Assign Teachers
          </label>
        </div>
        <select
          multiple
          className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none min-h-[100px] ${
            errors.teachers 
              ? "border-red-400 focus:ring-red-400 focus:border-red-400" 
              : "border-gray-200 hover:border-gray-300"
          }`}
          {...register("teachers")}
          defaultValue={data?.teachers?.map((t: any) => t.id) || []}
        >
          {teachers?.map(
            (teacher: { id: string; name: string; surname: string }) => (
              <option value={teacher.id} key={teacher.id} className="py-1.5">
                {teacher.name} {teacher.surname}
              </option>
            )
          )}
        </select>
        <p className="text-xs text-gray-500">
          Hold Ctrl/Cmd to select multiple teachers
        </p>
        {errors.teachers?.message && (
          <p className="text-xs text-red-500 mt-1">{errors.teachers.message.toString()}</p>
        )}
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">
            Something went wrong. Please try again.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-150"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-150 flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          {type === "create" ? "Create Subject" : "Update Subject"}
        </button>
      </div>
    </form>
  );
};

export default SubjectForm;
