"use client";

import React, { useEffect, useRef, useState, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Banner from "@/components/Banner";
import { BANNER_DATA } from "@/lib/data";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import { Container } from "@mui/material";
import { fetchPublicJobOpeningsAction } from "@/actions/admin";
import { submitJobApplication } from "@/lib/actions";
import { jobApplicationSchema, JobApplicationSchema } from "@/lib/formValidationSchemas";
import type { JobOpening } from "@/types/schemas";
import {
  Briefcase,
  MapPin,
  Calendar,
  Users,
  X,
  Upload,
  FileText,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

const JOB_TYPE_LABELS: Record<string, string> = {
  full_time: "Full Time",
  part_time: "Part Time",
  contract: "Contract",
  internship: "Internship",
};

const JOB_TYPE_COLORS: Record<string, string> = {
  full_time: "bg-blue-100 text-blue-700",
  part_time: "bg-purple-100 text-purple-700",
  contract: "bg-orange-100 text-orange-700",
  internship: "bg-teal-100 text-teal-700",
};

// ─── Application Modal ────────────────────────────────────────────────────────

function ApplicationModal({
  opening,
  onClose,
}: {
  opening: JobOpening;
  onClose: () => void;
}) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobApplicationSchema>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: { jobOpening_id: opening.id },
  });

  const [state, formAction] = useActionState(
    async (_prevState: any, formData: FormData) => {
      setIsSubmitting(true);
      const result = await submitJobApplication(formData);
      setIsSubmitting(false);
      return result;
    },
    { success: false, error: false, message: "" }
  );

  useEffect(() => {
    if (state.success) {
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } else if (state.error && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const onSubmit = handleSubmit((values) => {
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }
    const formData = new FormData();
    formData.append("jobOpening_id", values.jobOpening_id);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("location", values.location);
    if (values.portfolio_link) formData.append("portfolio_link", values.portfolio_link);
    formData.append("about_applicant", values.about_applicant);
    formData.append("resume", resumeFile);
    formAction(formData);
  });

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be less than 10 MB");
      return;
    }
    setResumeFile(file);
  };

  const inputCls = (err: boolean) =>
    `w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
      err ? "border-red-400" : "border-gray-200 hover:border-gray-300"
    }`;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
          <p className="text-gray-500 mb-2">
            Thank you for applying for{" "}
            <span className="font-semibold text-gray-700">{opening.title}</span>.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            We&apos;ll review your application and reach out to you shortly.
          </p>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-2xl px-6 py-5">
          <div className="absolute inset-0 overflow-hidden rounded-t-2xl opacity-10">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-white rounded-full" />
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white rounded-full" />
          </div>
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Apply for Position</h2>
              <p className="text-amber-100 text-sm mt-0.5">{opening.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Scrollable form */}
        <div className="overflow-y-auto flex-1">
          <form className="p-6 flex flex-col gap-4" onSubmit={onSubmit}>
            <input type="hidden" value={opening.id} {...register("jobOpening_id")} />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input type="text" {...register("name")} placeholder="John Doe" className={inputCls(!!errors.name)} />
              {errors.name?.message && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Email <span className="text-red-400">*</span>
                </label>
                <input type="email" {...register("email")} placeholder="you@example.com" className={inputCls(!!errors.email)} />
                {errors.email?.message && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Phone <span className="text-red-400">*</span>
                </label>
                <input type="tel" {...register("phone")} placeholder="+1 555 000 0000" className={inputCls(!!errors.phone)} />
                {errors.phone?.message && <p className="text-xs text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Location <span className="text-red-400">*</span>
                </label>
                <input type="text" {...register("location")} placeholder="City, Country" className={inputCls(!!errors.location)} />
                {errors.location?.message && <p className="text-xs text-red-500">{errors.location.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Portfolio / LinkedIn</label>
                <input type="url" {...register("portfolio_link")} placeholder="https://linkedin.com/in/..." className={inputCls(!!errors.portfolio_link)} />
                {errors.portfolio_link?.message && <p className="text-xs text-red-500">{errors.portfolio_link.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                About You <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register("about_applicant")}
                rows={4}
                placeholder="Tell us about yourself, your experience, and why you're a great fit..."
                className={`${inputCls(!!errors.about_applicant)} resize-none`}
              />
              {errors.about_applicant?.message && <p className="text-xs text-red-500">{errors.about_applicant.message}</p>}
            </div>

            {/* Resume Upload */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Resume / CV <span className="text-red-400">*</span>
              </label>
              {resumeFile ? (
                <div className="flex items-center gap-3 p-3.5 bg-green-50 border border-green-200 rounded-xl">
                  <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="flex-1 text-sm text-green-700 font-medium truncate">{resumeFile.name}</span>
                  <button type="button" onClick={() => setResumeFile(null)} className="p-1 hover:bg-green-100 rounded-lg transition-colors">
                    <X className="w-4 h-4 text-green-600" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isDragging ? "border-amber-400 bg-amber-50" : "border-gray-200 hover:border-amber-300 hover:bg-gray-50"}`}
                >
                  <Upload className="w-6 h-6 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-amber-600">Click to upload</span> or drag &amp; drop
                  </p>
                  <p className="text-xs text-gray-400">PDF, DOC, DOCX — max 10 MB</p>
                  <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({ opening, onApply }: { opening: JobOpening; onApply: (o: JobOpening) => void }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-gray-900 leading-snug">{opening.title}</h3>
        <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${JOB_TYPE_COLORS[opening.job_type] || "bg-gray-100 text-gray-600"}`}>
          <Briefcase className="w-3 h-3" />
          {JOB_TYPE_LABELS[opening.job_type] || opening.job_type}
        </span>
      </div>
      <p className="text-sm text-gray-500 line-clamp-3">{opening.description}</p>
      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{opening.positions} position{opening.positions !== 1 ? "s" : ""}</span>
        {opening.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{opening.location}</span>}
        {opening.deadline && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Deadline: {new Date(opening.deadline).toLocaleDateString()}</span>}
        {opening.experience > 0 && <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{opening.experience}+ yr exp</span>}
      </div>
      {opening.salary_range && <div className="text-sm font-semibold text-green-600">{opening.salary_range}</div>}
      <div className="mt-auto pt-2">
        <button
          onClick={() => onApply(opening)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/25"
        >
          Apply Now <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const bannerData = BANNER_DATA["careers"];
  const [openings, setOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOpening, setSelectedOpening] = useState<JobOpening | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchPublicJobOpeningsAction();
        if (result.success && result.data?.data) {
          setOpenings(result.data.data.filter((o) => o.is_active));
        } else {
          setError(result.error || "Failed to load job openings.");
        }
      } catch {
        setError("Failed to load job openings.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      <Container sx={{ py: { xs: 4, sm: 6 } }}>
        <div style={{ paddingBottom: 40 }}>
          <AnimatedHeader
            miniHeader="💼 Careers"
            title="Join Our"
            highlight="Team"
            subtitle="Explore exciting opportunities to grow with us and make a difference."
            align="center"
            color="#f59e0b"
            titleVariant="h3"
            subtitleVariant="body1"
          />
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-5/6 mb-4" />
                <div className="flex gap-2 mb-4">
                  <div className="h-3 bg-gray-200 rounded w-16" />
                  <div className="h-3 bg-gray-200 rounded w-20" />
                </div>
                <div className="h-10 bg-gray-200 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && openings.length === 0 && (
          <div className="text-center py-20">
            <Briefcase className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Openings Right Now</h3>
            <p className="text-gray-400">We don&apos;t have any open positions at the moment. Check back soon!</p>
          </div>
        )}

        {!loading && !error && openings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openings.map((opening) => (
              <JobCard key={opening.id} opening={opening} onApply={setSelectedOpening} />
            ))}
          </div>
        )}
      </Container>

      {selectedOpening && (
        <ApplicationModal opening={selectedOpening} onClose={() => setSelectedOpening(null)} />
      )}
    </>
  );
}