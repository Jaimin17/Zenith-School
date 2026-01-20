"use client";

import {
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
  deleteAnnouncement,
} from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { FormContainerProps } from "./FormContainer";
import { X, Trash2, AlertTriangle, Plus, Pencil } from "lucide-react";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
  parent: deleteSubject,
  lesson: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteAnnouncement,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  ),
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  ),
});

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  ),
});

const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  ),
});

const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  ),
});

const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  ),
});

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => React.ReactElement;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  exam: (setOpen, type, data, relatedData) => (
    <ExamForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  announcement: (setOpen, type, data, relatedData) => (
    <AnnouncementForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Button styles based on type
  const getButtonStyles = () => {
    switch (type) {
      case "create":
        return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md shadow-blue-500/20";
      case "update":
        return "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-500/20";
      case "delete":
        return "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-md shadow-red-500/20";
      default:
        return "bg-gray-100 hover:bg-gray-200";
    }
  };

  const getButtonIcon = () => {
    switch (type) {
      case "create":
        return <Plus className="w-4 h-4" strokeWidth={2.5} />;
      case "update":
        return <Pencil className="w-3.5 h-3.5" />;
      case "delete":
        return <Trash2 className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const DeleteConfirmation = () => {
    const [state, formAction] = useActionState(
      async (prevState: any, formData: FormData) => {
        setIsDeleting(true);
        const result = await deleteActionMap[table](formData);
        setIsDeleting(false);
        return result;
      },
      {
        success: false,
        error: false,
      }
    );

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast.success(`${table.charAt(0).toUpperCase() + table.slice(1)} deleted successfully`);
        setOpen(false);
        router.refresh();
      }
      if (state.error) {
        toast.error("Failed to delete. Please try again.");
      }
    }, [state, router]);

    return (
      <div className="p-8">
        {/* Delete Warning Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center animate-pulse">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>

        {/* Delete Warning Text */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Delete {table.charAt(0).toUpperCase() + table.slice(1)}?
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
            This action cannot be undone. All data associated with this{" "}
            <span className="font-medium text-gray-700">{table}</span> will be permanently removed from the system.
          </p>
        </div>

        {/* Warning Box */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
              <span className="text-red-600 text-xs font-bold">!</span>
            </div>
            <div className="text-sm text-red-700">
              <p className="font-medium mb-1">Warning</p>
              <p className="text-red-600">This will permanently delete all related records and cannot be recovered.</p>
            </div>
          </div>
        </div>

        {/* Hidden input for ID */}
        <div>
          <input type="hidden" name="id" value={id} />
          
          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 hover:shadow-md min-w-[120px]"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                const formData = new FormData();
                formData.append("id", String(id));
                formAction(formData);
              }}
              disabled={isDeleting}
              className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Get modal title
  const getModalTitle = () => {
    const capitalizedTable = table.charAt(0).toUpperCase() + table.slice(1);
    if (type === "create") return `Create New ${capitalizedTable}`;
    if (type === "update") return `Update ${capitalizedTable}`;
    return "";
  };

  // Get modal subtitle
  const getModalSubtitle = () => {
    const capitalizedTable = table.charAt(0).toUpperCase() + table.slice(1);
    if (type === "create") return `Fill in the details to add a new ${table} to the system`;
    if (type === "update") return `Modify the ${table} information below`;
    return "";
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className={`${type === "create" ? "w-9 h-9" : "w-8 h-8"} flex items-center justify-center rounded-full ${getButtonStyles()} transition-all duration-200 hover:scale-105 active:scale-95`}
        onClick={() => setOpen(true)}
        title={`${type.charAt(0).toUpperCase() + type.slice(1)} ${table}`}
      >
        {getButtonIcon()}
      </button>

      {open && (
        <>
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300"
            onClick={() => setOpen(false)}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none overflow-y-auto">
            <div 
              className={`bg-white rounded-2xl shadow-2xl pointer-events-auto transform transition-all duration-300 scale-100 opacity-100 ${
                type === "delete" 
                  ? "w-full max-w-md" 
                  : "w-full max-w-3xl"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header for create/update */}
              {type !== "delete" && (
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl px-6 py-5 sm:px-8 sm:py-6">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                  </div>
                  
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {getModalTitle()}
                      </h2>
                      <p className="text-blue-100 text-sm">
                        {getModalSubtitle()}
                      </p>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="flex-shrink-0 p-2 hover:bg-white/20 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              )}

              {/* Delete modal close button */}
              {type === "delete" && (
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-colors z-10"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}

              {/* Content Area */}
              {type === "delete" && id ? (
                <DeleteConfirmation />
              ) : type === "create" || type === "update" ? (
                <div className="max-h-[calc(80vh-100px)] overflow-y-auto">
                  <div className="p-6 sm:p-8">
                    {forms[table](setOpen, type, data, relatedData)}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">Form not found!</p>
                  <p className="text-gray-400 text-sm mt-1">The requested form could not be loaded.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FormModal;