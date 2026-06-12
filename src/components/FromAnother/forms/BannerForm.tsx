"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import { bannerSchema, BannerSchema } from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import { createBanner, updateBanner } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageIcon, X, Upload, Loader2, ExternalLink } from "lucide-react";
import { getBannerImageUrl } from "@/utils/imageHelpers";
import UploadProgress from "@/components/ui/UploadProgress";

const BannerForm = ({
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
  const [isActive, setIsActive] = useState<boolean>(data?.is_active ?? true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BannerSchema>({
    resolver: zodResolver(bannerSchema),
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    data?.image ? getBannerImageUrl(data.image) : null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      setIsSubmitting(true);
      const result =
        type === "create"
          ? await createBanner(formData)
          : await updateBanner(formData);
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
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        formData.append(key, value as string);
      }
    });
    formData.append("is_active", String(isActive));
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formAction(formData);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Banner has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    } else if (state.error && state.message) {
      toast.error(state.message);
    }
  }, [state, router, type, setOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const processFile = (file: File | undefined) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setUploadingFile(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImagePreview(reader.result as string);
        setUploadingFile(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          {...register("title")}
          defaultValue={data?.title}
          placeholder="Enter banner title"
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
          placeholder="Write banner description..."
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

      {/* Hidden ID field for updates */}
      {data && (
        <input type="hidden" {...register("id")} defaultValue={data?.id} />
      )}

      {/* Active Status Toggle */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div>
          <label className="text-sm font-medium text-gray-700">Active Status</label>
          <p className="text-xs text-gray-400 mt-0.5">
            {isActive ? "Banner is visible on the homepage" : "Banner is hidden from the homepage"}
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

      {/* Banner Image Section */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Banner Image {type === "create" && <span className="text-red-400">*</span>}
        </label>

        {!imagePreview ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border border-dashed rounded-lg p-6 cursor-pointer transition-all duration-150 ${
              isDragging
                ? "border-gray-900 bg-gray-50"
                : "border-gray-300 hover:border-gray-400 bg-white"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden border border-gray-200">
            <img
              src={imagePreview}
              alt="Banner preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              {!imageFile && data?.image && (
                <a
                  href={getBannerImageUrl(data.image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-white/90 text-blue-500 hover:text-blue-700 rounded-md transition-colors shadow-sm"
                  title="View full image"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                type="button"
                onClick={removeImage}
                className="p-1.5 bg-white/90 text-gray-400 hover:text-gray-600 rounded-md transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 bg-gray-50 text-xs text-gray-500 flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5" />
              {imageFile ? imageFile.name : "Current banner image"}
            </div>
          </div>
        )}
      </div>

      <UploadProgress isUploading={!!uploadingFile} fileName={uploadingFile ?? undefined} />

      {/* Error Message */}
      {state.error && (
        <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 flex items-center gap-2">
          <span className="text-sm text-red-600">
            {state.message || "Something went wrong. Please try again."}
          </span>
        </div>
      )}

      {/* Actions */}
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
            "Create Banner"
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default BannerForm;
