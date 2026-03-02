"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { testimonialSchema, TestimonialSchema } from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import { createTestimonial, updateTestimonial } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const TestimonialEntryForm = ({
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
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestimonialSchema>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      id: data?.id,
      description: data?.description ?? "",
      rating: typeof data?.rating === "number" ? data.rating : 0,
    },
  });

  const currentRating = watch("rating");
  const [hoverRating, setHoverRating] = useState(0);

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      setIsSubmitting(true);
      const result =
        type === "create"
          ? await createTestimonial(formData)
          : await updateTestimonial(formData);
      setIsSubmitting(false);
      return result;
    },
    {
      success: false,
      error: false,
      message: "",
    }
  );

  const onSubmit = handleSubmit((formValues) => {
    const formData = new FormData();

    if (type === "update" && data?.id) {
      formData.append("id", data.id);
    }

    formData.append("description", String(formValues.description || "").trim());
    formData.append("rating", String(formValues.rating));
    formData.append("is_active", String(isActive));

    formAction(formData);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(`Testimonial has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    } else if (state.error && state.message) {
      toast.error(state.message);
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      {type === "update" && data?.id && <input type="hidden" {...register("id")} value={data.id} />}

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Rating <span className="text-red-400">*</span>
        </label>
        {/* hidden input keeps react-hook-form in sync */}
        <input type="hidden" {...register("rating")} />
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = star <= (hoverRating || Number(currentRating));
            return (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() =>
                  setValue("rating", star as any, { shouldValidate: true })
                }
                className="p-0.5 focus:outline-none transition-transform hover:scale-110"
              >
                <i
                  className={`${filled ? "fas" : "far"} fa-star text-xl ${
                    filled ? "text-amber-400" : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            );
          })}
          <span className="ml-2 text-sm text-gray-500">
            {Number(currentRating) > 0
              ? `${Number(currentRating)} / 5`
              : "Select a rating"}
          </span>
        </div>
        {errors.rating?.message && (
          <p className="text-xs text-red-500 mt-1">{errors.rating.message.toString()}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Description <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Write your testimonial..."
          className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none resize-none ${
            errors.description
              ? "border-red-400 focus:ring-red-400 focus:border-red-400"
              : "border-gray-200 hover:border-gray-300"
          }`}
        />
        {errors.description?.message && (
          <p className="text-xs text-red-500 mt-1">{errors.description.message.toString()}</p>
        )}
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div>
          <label className="text-sm font-medium text-gray-700">Active Status</label>
          <p className="text-xs text-gray-400 mt-0.5">
            {isActive ? "Testimonial is visible publicly" : "Testimonial is hidden publicly"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${
            isActive ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
              isActive ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {state.error && (
        <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 flex items-center gap-2">
          <span className="text-sm text-red-600">{state.message || "Something went wrong. Please try again."}</span>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {type === "create" ? "Creating..." : "Saving..."}
            </>
          ) : type === "create" ? (
            "Create Testimonial"
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default TestimonialEntryForm;
