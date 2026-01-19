"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  studentSchema,
  StudentSchema,
  teacherSchema,
  TeacherSchema,
} from "@/lib/formValidationSchemas";
import { useActionState } from "react";
import {
  createStudent,
  createTeacher,
  updateStudent,
  updateTeacher,
} from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";

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
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  });

  const [img, setImg] = useState<any>();

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const data = Object.fromEntries(formData);
      return type === "create" ? await createStudent({ ...data, img: img?.secure_url }) : await updateStudent({ ...data, img: img?.secure_url });
    },
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log("hello");
    console.log(data);
    const formData = new FormData();
    Object.entries({ ...data, img: img?.secure_url }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formAction(formData);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Student has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { grades, classes } = relatedData;

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
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
          <InputField
            label="Password"
            name="password"
            type="password"
            defaultValue={data?.password}
            register={register}
            error={errors?.password}
          />
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

        {/* Photo Upload */}
        <CldUploadWidget
          uploadPreset="school"
          onSuccess={(result, { widget }) => {
            setImg(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200"
                onClick={() => open()}
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Image src="/upload.png" alt="" width={24} height={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Upload Photo</p>
                  <p className="text-xs text-gray-500">Click to upload student photo</p>
                </div>
              </div>
            );
          }}
        </CldUploadWidget>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="First Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors.name}
          />
          <InputField
            label="Last Name"
            name="surname"
            defaultValue={data?.surname}
            register={register}
            error={errors.surname}
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
          <InputField
            label="Blood Type"
            name="bloodType"
            defaultValue={data?.bloodType}
            register={register}
            error={errors.bloodType}
          />
          <InputField
            label="Birthday"
            name="birthday"
            defaultValue={data?.birthday.toISOString().split("T")[0]}
            register={register}
            error={errors.birthday}
            type="date"
          />
          <InputField
            label="Parent Id"
            name="parentId"
            defaultValue={data?.parentId}
            register={register}
            error={errors.parentId}
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
              defaultValue={data?.sex}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.sex?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.sex.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Grade</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("gradeId")}
              defaultValue={data?.gradeId}
            >
              {grades.map((grade: { id: number; level: number }) => (
                <option value={grade.id} key={grade.id}>
                  {grade.level}
                </option>
              ))}
            </select>
            {errors.gradeId?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.gradeId.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">Class</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              {...register("classId")}
              defaultValue={data?.classId}
            >
              {classes.map(
                (classItem: {
                  id: number;
                  name: string;
                  capacity: number;
                  _count: { students: number };
                }) => (
                  <option value={classItem.id} key={classItem.id}>
                    {classItem.name} - {classItem._count.students}/{classItem.capacity} Capacity
                  </option>
                )
              )}
            </select>
            {errors.classId?.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.classId.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <span className="text-red-600 text-xs font-bold">!</span>
          </div>
          <span className="text-sm text-red-600">Something went wrong! Please try again.</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button 
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
        >
          {type === "create" ? (
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
