"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState, useRef, useTransition } from "react";
import { studentSchema, StudentSchema } from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import { createStudent, updateStudent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getStudentImageUrl } from "@/utils/imageHelpers";
import UploadProgress from "@/components/ui/UploadProgress";

const StudentForm = ({
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
    watch,
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  });

  const [img, setImg] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(data?.img ? getStudentImageUrl(data.img) || null : null);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  // Watch grade_id to filter classes
  const selectedGradeId = watch("grade_id");

  const [state, formAction] = useActionState(
    async (prevState: any, formDataObj: Record<string, any>) => {
      return type === "create"
        ? await createStudent({ ...formDataObj, img })
        : await updateStudent({ ...formDataObj, img });
    },
    {
      success: false,
      error: false,
      message: "",
    }
  );

  const onSubmit = handleSubmit((formData) => {
    console.log("Form data:", formData);
    startTransition(() => {
      formAction(formData);
    });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(`Student has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImg(file);
      setUploadingFile(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
        setUploadingFile(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const { grades = [], classes = [], parents = [] } = relatedData || {};

  // Filter classes based on selected grade
  const filteredClasses = selectedGradeId
    ? classes.filter((c: any) => c.grade_id === selectedGradeId || c.gradeId === selectedGradeId)
    : classes;

  // Count total validation errors
  const errorCount = Object.keys(errors).length;
  const hasValidationErrors = errorCount > 0;

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      {/* Validation Errors Summary */}
      {hasValidationErrors && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-shake">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-800 mb-1">
                Please fix {errorCount} {errorCount === 1 ? 'error' : 'errors'} before submitting
              </h4>
              <ul className="text-xs text-red-600 space-y-1">
                {errors.username && <li>• Username: {errors.username.message}</li>}
                {errors.email && <li>• Email: {errors.email.message}</li>}
                {errors.password && <li>• Password: {errors.password.message}</li>}
                {errors.first_name && <li>• First Name: {errors.first_name.message}</li>}
                {errors.last_name && <li>• Last Name: {errors.last_name.message}</li>}
                {errors.phone && <li>• Phone: {errors.phone.message}</li>}
                {errors.address && <li>• Address: {errors.address.message}</li>}
                {errors.blood_type && <li>• Blood Type: {errors.blood_type.message}</li>}
                {errors.dob && <li>• Date of Birth: {errors.dob.message}</li>}
                {errors.sex && <li>• Sex: {errors.sex.message}</li>}
                {errors.grade_id && <li>• Grade: {errors.grade_id.message}</li>}
                {errors.class_id && <li>• Class: {errors.class_id.message}</li>}
                {errors.parent_id && <li>• Parent: {errors.parent_id.message}</li>}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Server Error Message */}
      {state.error && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-800">Server Error</h4>
              <p className="text-sm text-red-600">
                {state.message || "Something went wrong! Please try again."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Authentication Information
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Username"
            name="username"
            defaultValue={data?.username}
            register={register}
            error={errors?.username}
          />
          <InputField
            label="Email"
            name="email"
            defaultValue={data?.email}
            register={register}
            error={errors?.email}
          />
          {type === "create" && (
            <InputField
              label="Password"
              name="password"
              type="password"
              defaultValue={data?.password}
              register={register}
              error={errors?.password}
            />
          )}
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Personal Information
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="First Name"
            name="first_name"
            defaultValue={data?.first_name}
            register={register}
            error={errors.first_name}
          />
          <InputField
            label="Last Name"
            name="last_name"
            defaultValue={data?.last_name}
            register={register}
            error={errors.last_name}
          />
          <InputField
            label="Phone"
            name="phone"
            defaultValue={data?.phone}
            register={register}
            error={errors.phone}
          />
          <InputField
            label="Address"
            name="address"
            defaultValue={data?.address}
            register={register}
            error={errors.address}
          />
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Blood Type</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("blood_type")}
              defaultValue={data?.blood_type || ""}
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.blood_type?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.blood_type.message.toString()}
              </p>
            )}
          </div>
          <InputField
            label="Date of Birth"
            name="dob"
            defaultValue={data?.dob ? new Date(data.dob).toISOString().split("T")[0] : ""}
            register={register}
            error={errors.dob}
            type="date"
          />
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
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Sex</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("sex")}
              defaultValue={data?.sex?.toLowerCase() || "male"}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.sex?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.sex.message.toString()}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Profile Photo</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <div
                className="flex items-center gap-2 cursor-pointer px-4 py-3 border border-gray-300 rounded-xl text-sm bg-gray-50 hover:bg-white transition-all duration-200"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">
                  {img ? img.name : "Upload a photo"}
                </span>
              </div>
              {imgPreview && (
                <div className="relative w-12 h-12">
                  <Image
                    src={imgPreview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <UploadProgress isUploading={!!uploadingFile} fileName={uploadingFile ?? undefined} />

      {/* Academic Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Academic Information
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Grade</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("grade_id")}
              defaultValue={data?.grade?.id || ""}
            >
              <option value="">Select Grade</option>
              {grades.map((grade: { id: string; level: string | number; name?: string }) => (
                <option value={grade.id} key={grade.id}>
                  {grade.name || `Grade ${grade.level}`}
                </option>
              ))}
            </select>
            {errors.grade_id?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.grade_id.message.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Class</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("class_id")}
              defaultValue={data?.related_class?.id || ""}
            >
              <option value="">Select Class</option>
              {filteredClasses.map((cls: { id: string; name: string }) => (
                <option value={cls.id} key={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
            {errors.class_id?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.class_id.message.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Parent/Guardian</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("parent_id")}
              defaultValue={data?.parent?.id || ""}
            >
              <option value="">Select Parent</option>
              {parents.map((parent: { id: string; first_name?: string; last_name?: string; name?: string; surname?: string }) => (
                <option value={parent.id} key={parent.id}>
                  {parent.first_name && parent.last_name 
                    ? `${parent.first_name} ${parent.last_name}`
                    : parent.name && parent.surname
                    ? `${parent.name} ${parent.surname}`
                    : parent.id}
                </option>
              ))}
            </select>
            {errors.parent_id?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.parent_id.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {type === "create" ? "Creating..." : "Updating..."}
            </>
          ) : type === "create" ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Student
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Update Student
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
