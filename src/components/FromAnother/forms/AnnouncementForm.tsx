"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import { announcementSchema, AnnouncementSchema } from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import { createAnnouncement, updateAnnouncement } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileText, X, Paperclip } from "lucide-react";

const AnnouncementForm = ({
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
  } = useForm<AnnouncementSchema>({
    resolver: zodResolver(announcementSchema),
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(data?.attachment || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const formDataObj = Object.fromEntries(formData);
      // Add PDF file if exists
      if (pdfFile) {
        formData.append('attachment', pdfFile);
      }
      return type === "create" 
        ? await createAnnouncement(formData) 
        : await updateAnnouncement(formData);
    },
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        formData.append(key, value as string);
      }
    });
    if (pdfFile) {
      formData.append('attachment', pdfFile);
    }
    formAction(formData);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(`Announcement has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const processFile = (file: File | undefined) => {
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file only');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size should be less than 10MB');
        return;
      }
      setPdfFile(file);
      setPdfPreview(file.name);
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

  const removePdf = () => {
    setPdfFile(null);
    setPdfPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const classes = relatedData?.classes || [];

  // Get today's date in YYYY-MM-DD format for default value
  const today = new Date().toISOString().split('T')[0];

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
          placeholder="Enter announcement title"
          className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none ${
            errors.title 
              ? "border-red-400 focus:ring-red-400 focus:border-red-400" 
              : "border-gray-200 hover:border-gray-300"
          }`}
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
          placeholder="Write your announcement here..."
          rows={3}
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

      {/* Date and Class Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Announcement Date */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Date <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            {...register("announcement_date")}
            defaultValue={data?.announcement_date?.split('T')[0] || today}
            className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-colors duration-150 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none ${
              errors.announcement_date 
                ? "border-red-400 focus:ring-red-400 focus:border-red-400" 
                : "border-gray-200 hover:border-gray-300"
            }`}
          />
          {errors.announcement_date?.message && (
            <p className="text-xs text-red-500 mt-1">{errors.announcement_date.message.toString()}</p>
          )}
        </div>

        {/* Class Selection */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Target Class</label>
          <select
            {...register("class_id")}
            defaultValue={data?.related_class?.id || ""}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-150 bg-white hover:border-gray-300 cursor-pointer"
          >
            <option value="">All Classes</option>
            {classes.map((cls: { id: string; name: string }) => (
              <option value={cls.id} key={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400">Leave empty for general announcement</p>
        </div>
      </div>

      {/* Hidden ID field for updates */}
      {data && (
        <input
          type="hidden"
          {...register("id")}
          defaultValue={data?.id}
        />
      )}

      {/* PDF Attachment Section */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">Attachment</label>
        
        {!pdfPreview ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border border-dashed rounded-lg p-4 cursor-pointer transition-all duration-150 ${
              isDragging 
                ? "border-gray-900 bg-gray-50" 
                : "border-gray-300 hover:border-gray-400 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Paperclip className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-0.5">PDF only, max 10MB</p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {pdfPreview}
              </p>
              <p className="text-xs text-gray-400">
                {pdfFile ? formatFileSize(pdfFile.size) : 'PDF Document'}
              </p>
            </div>
            <button
              type="button"
              onClick={removePdf}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 flex items-center gap-2">
          <span className="text-sm text-red-600">Something went wrong. Please try again.</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button 
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {type === "create" ? "Create Announcement" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default AnnouncementForm;
