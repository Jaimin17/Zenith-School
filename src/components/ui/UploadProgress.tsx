"use client";
import { Loader2 } from "lucide-react";

interface UploadProgressProps {
  isUploading: boolean;
  fileName?: string;
  fileCount?: number;
}

export default function UploadProgress({ isUploading, fileName, fileCount }: UploadProgressProps) {
  if (!isUploading) return null;

  const label =
    fileCount && fileCount > 1
      ? `Uploading ${fileCount} files…`
      : fileName
      ? `Uploading "${fileName}"…`
      : "Uploading…";

  return (
    <>
      <style>{`
        @keyframes slideProgress {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        .upload-progress-bar {
          animation: slideProgress 1.4s ease-in-out infinite;
        }
      `}</style>
      <div className="flex flex-col gap-1.5 px-3 py-2.5 bg-blue-50 border border-blue-100 rounded-lg">
        <div className="flex items-center gap-2">
          <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin flex-shrink-0" />
          <span className="text-xs font-medium text-blue-700 truncate">{label}</span>
        </div>
        <div className="w-full h-1 bg-blue-100 rounded-full overflow-hidden">
          <div className="upload-progress-bar h-full w-2/5 bg-blue-500 rounded-full" />
        </div>
      </div>
    </>
  );
}
