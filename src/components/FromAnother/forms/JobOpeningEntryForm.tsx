"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { jobOpeningSchema, JobOpeningSchema } from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import { createJobOpening, updateJobOpening } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const JOB_TYPE_OPTIONS = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const JobOpeningEntryForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(data?.is_active ?? true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobOpeningSchema>({
    resolver: zodResolver(jobOpeningSchema),
    mode: "onChange",
    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
      job_type: data?.job_type ?? "full_time",
      experience: data?.experience ?? 0,
      positions: data?.positions ?? 1,
    },
  });

  const [state, formAction] = useActionState(
    async (_prevState: any, formData: FormData) => {
      setIsSubmitting(true);
      const result =
        type === "create"
          ? await createJobOpening(formData)
          : await updateJobOpening(formData);
      setIsSubmitting(false);
      return result;
    },
    { success: false, error: false, message: "" }
  );

  const onSubmit = handleSubmit((formValues) => {
    const formData = new FormData();
    if (type === "update" && data?.id) formData.append("id", data.id);
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("experience", String(formValues.experience ?? 0));
    formData.append("positions", String(formValues.positions ?? 1));
    if (formValues.location) formData.append("location", formValues.location);
    if (formValues.salary_range) formData.append("salary_range", formValues.salary_range);
    if (formValues.deadline) formData.append("deadline", formValues.deadline);
    formData.append("job_type", formValues.job_type ?? "full_time");
    if (formValues.subject_id) formData.append("subject_id", formValues.subject_id);
    formData.append("is_active", String(isActive));
    formAction(formData);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(`Job opening has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    } else if (state.error && state.message) {
      toast.error(state.message);
    }
  }, [state, router, type, setOpen]);

  const inputClass = (hasError: boolean) =>
    `w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none ${
      hasError
        ? "border-red-400 focus:ring-red-400 focus:border-red-400"
        : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Job Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          {...register("title")}
          defaultValue={data?.title}
          placeholder="e.g. Maths teacher, Football Coach, etc."
          className={inputClass(!!errors.title)}
        />
        {errors.title?.message && (
          <p className="text-xs text-red-500 mt-1">{errors.title.message.toString()}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Description <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register("description")}
          defaultValue={data?.description}
          placeholder="Describe the role, responsibilities, and requirements..."
          rows={4}
          className={`${inputClass(!!errors.description)} resize-none`}
        />
        {errors.description?.message && (
          <p className="text-xs text-red-500 mt-1">{errors.description.message.toString()}</p>
        )}
      </div>

      {/* Job Type & Experience row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Job Type <span className="text-red-400">*</span>
          </label>
          <select
            {...register("job_type")}
            defaultValue={data?.job_type ?? "full_time"}
            className={inputClass(!!errors.job_type)}
          >
            {JOB_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Experience (years) <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            min={0}
            {...register("experience")}
            defaultValue={data?.experience ?? 0}
            placeholder="0"
            className={inputClass(!!errors.experience)}
          />
          {errors.experience?.message && (
            <p className="text-xs text-red-500 mt-1">{errors.experience.message.toString()}</p>
          )}
        </div>
      </div>

      {/* Positions & Deadline row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Open Positions <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            min={1}
            {...register("positions")}
            defaultValue={data?.positions ?? 1}
            placeholder="1"
            className={inputClass(!!errors.positions)}
          />
          {errors.positions?.message && (
            <p className="text-xs text-red-500 mt-1">{errors.positions.message.toString()}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Application Deadline</label>
          <input
            type="date"
            {...register("deadline")}
            defaultValue={data?.deadline ?? ""}
            className={inputClass(false)}
          />
        </div>
      </div>

      {/* Location & Salary row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            {...register("location")}
            defaultValue={data?.location ?? ""}
            placeholder="e.g. Remote, New York"
            className={inputClass(false)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Salary Range</label>
          <input
            type="text"
            {...register("salary_range")}
            defaultValue={data?.salary_range ?? ""}
            placeholder="e.g. $60k – $80k"
            className={inputClass(false)}
          />
        </div>
      </div>

      {/* Active Status Toggle */}
      <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
        <div>
          <p className="text-sm font-medium text-gray-700">Active Status</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {isActive ? "Visible to applicants on public careers page" : "Hidden from public careers page"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsActive((v) => !v)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
            isActive ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
              isActive ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? "Saving..." : type === "create" ? "Create Opening" : "Update Opening"}
        </button>
      </div>
    </form>
  );
};

export default JobOpeningEntryForm;
