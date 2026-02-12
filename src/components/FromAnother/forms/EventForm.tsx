"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { eventSchema, EventSchema } from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import { createEvent, updateEvent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Calendar, Clock, FileText, Users, Loader2 } from "lucide-react";

const EventForm = ({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      setIsSubmitting(true);
      const result = type === "create"
        ? await createEvent(formData)
        : await updateEvent(formData);
      setIsSubmitting(false);
      return result;
    },
    {
      success: false,
      error: false,
      message: "",
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
        `Event has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    } else if (state.error && state.message) {
      toast.error(state.message);
    }
  }, [state, router, type, setOpen]);

  const classes = relatedData?.classes || [];

  // Get today's date and time for default values
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().slice(0, 5);
  
  // Default end time (1 hour later)
  const endTime = new Date(now.getTime() + 60 * 60 * 1000)
    .toTimeString()
    .slice(0, 5);

  // Parse existing data times
  const getDateFromDateTime = (dateTimeStr: string | undefined) => {
    if (!dateTimeStr) return today;
    return dateTimeStr.split("T")[0];
  };

  const getTimeFromDateTime = (dateTimeStr: string | undefined, fallback: string) => {
    if (!dateTimeStr) return fallback;
    const timePart = dateTimeStr.split("T")[1];
    return timePart ? timePart.slice(0, 5) : fallback;
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      {/* Hidden ID field for updates */}
      {data?.id && <input type="hidden" {...register("id")} defaultValue={data.id} />}

      {/* Header Section */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Calendar className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">
            {type === "create" ? "Create New Event" : "Update Event"}
          </h3>
          <p className="text-xs text-gray-500">
            Fill in the details for the event
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Event Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          {...register("title")}
          defaultValue={data?.title}
          placeholder="Enter event title"
          className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none ${
            errors.title
              ? "border-red-400 focus:ring-red-400 focus:border-red-400"
              : "border-gray-200 hover:border-gray-300"
          }`}
        />
        {errors.title?.message && (
          <p className="text-xs text-red-500 mt-1">
            {errors.title.message.toString()}
          </p>
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
          placeholder="Describe the event..."
          rows={3}
          className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none resize-none ${
            errors.description
              ? "border-red-400 focus:ring-red-400 focus:border-red-400"
              : "border-gray-200 hover:border-gray-300"
          }`}
        />
        {errors.description?.message && (
          <p className="text-xs text-red-500 mt-1">
            {errors.description.message.toString()}
          </p>
        )}
      </div>

      {/* Date and Time Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">
            Date & Time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">
              Start Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              {...register("start_date")}
              defaultValue={getDateFromDateTime(data?.start_time)}
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none ${
                errors.start_date
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors.start_date?.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.start_date.message.toString()}
              </p>
            )}
          </div>

          {/* Start Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">
              Start Time <span className="text-red-400">*</span>
            </label>
            <input
              type="time"
              {...register("start_time")}
              defaultValue={getTimeFromDateTime(data?.start_time, currentTime)}
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none ${
                errors.start_time
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors.start_time?.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.start_time.message.toString()}
              </p>
            )}
          </div>

          {/* End Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">
              End Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              {...register("end_date")}
              defaultValue={getDateFromDateTime(data?.end_time)}
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none ${
                errors.end_date
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors.end_date?.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.end_date.message.toString()}
              </p>
            )}
          </div>

          {/* End Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">
              End Time <span className="text-red-400">*</span>
            </label>
            <input
              type="time"
              {...register("end_time")}
              defaultValue={getTimeFromDateTime(data?.end_time, endTime)}
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none ${
                errors.end_time
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors.end_time?.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.end_time.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Class Selection */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <label className="text-sm font-medium text-gray-700">
            Target Class
          </label>
        </div>
        <select
          {...register("class_id")}
          defaultValue={data?.related_class?.id || ""}
          className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none appearance-none cursor-pointer ${
            errors.class_id
              ? "border-red-400 focus:ring-red-400 focus:border-red-400"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <option value="">All Classes (School-wide)</option>
          {classes.map((cls: any) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500">
          Leave empty to make this a school-wide event
        </p>
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">
            {state.message || "Something went wrong. Please try again."}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={isSubmitting}
          className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-150 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-150 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {type === "create" ? "Creating..." : "Updating..."}
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              {type === "create" ? "Create Event" : "Update Event"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
