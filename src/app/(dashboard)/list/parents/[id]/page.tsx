import FormContainer from "@/components/FromAnother/FormContainer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/serverAuth";
import { fetchParentByIdAction } from "@/actions/admin";
import { ParentWithRelations } from "@/types/schemas";
import { Mail, Phone, MapPin, Users, GraduationCap, User, CheckCircle, BookOpen, ClipboardList, FileText } from "lucide-react";
import { getStudentImageUrl } from "@/utils/imageHelpers";

const SingleParentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const auth = await requireAuth();
  const role = auth.role;

  const allowedRoles = ['admin', 'teacher'];
  if (role && !allowedRoles.includes(role)) {
    return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Access Denied
          </h2>
          <p className="text-red-600 text-sm">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  const parentResult = await fetchParentByIdAction(id);

  if (!parentResult.success || !parentResult.data) {
    console.error('Failed to fetch parent:', parentResult.error);
    return notFound();
  }

  const parent: ParentWithRelations = parentResult.data;

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 py-6 px-6 rounded-xl flex-1 flex gap-6 shadow-lg">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-white/30 flex items-center justify-center border-4 border-white/30 shadow-xl">
                  <User className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">
                    {parent.first_name + " " + parent.last_name}
                  </h1>
                  {role === "admin" && (
                    <FormContainer table="parent" type="update" data={parent} />
                  )}
                </div>
                <p className="text-sm text-emerald-100">
                  Parent / Guardian
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span>{parent.username || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="truncate">{parent.email || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span>{parent.phone || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="truncate">{parent.address || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* STAT CARDS */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            {/* CARD - Children */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {parent.students?.length || 0}
                  </h2>
                  <span className="text-xs text-gray-500">Children</span>
                </div>
              </div>
            </div>
            {/* CARD - Status */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Active</h2>
                  <span className="text-xs text-gray-500">Status</span>
                </div>
              </div>
            </div>
            {/* CARD - Contact */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 truncate max-w-[100px]">
                    {parent.phone ? "Available" : "-"}
                  </h2>
                  <span className="text-xs text-gray-500">Contact</span>
                </div>
              </div>
            </div>
            {/* CARD - Email */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 truncate max-w-[100px]">
                    {parent.email ? "Available" : "-"}
                  </h2>
                  <span className="text-xs text-gray-500">Email</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM - Children List */}
        <div className="mt-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            Children
          </h2>
          {parent.students && parent.students.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parent.students.map((student) => (
                <Link
                  key={student.id}
                  href={`/list/students/${student.id}`}
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100/50 to-transparent rounded-bl-full" />
                  <div className="p-4 flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={getStudentImageUrl(student.img)}
                        alt={`${student.first_name} ${student.last_name}'s photo`}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                        {student.first_name} {student.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">@{student.username}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {student.sex && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            student.sex === 'MALE' 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-pink-100 text-pink-600'
                          }`}>
                            {student.sex === 'MALE' ? 'Male' : 'Female'}
                          </span>
                        )}
                        {student.blood_type && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600">
                            {student.blood_type}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-emerald-500 group-hover:translate-x-1 transition-transform duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-300" />
              </div>
              <p className="font-medium">No children registered</p>
              <p className="text-sm text-gray-400 mt-1">Children will appear here once added</p>
            </div>
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-5 rounded-xl border border-gray-200 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-800">Shortcuts</h1>
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs font-medium">
            {parent.students && parent.students.length > 0 ? (
              <>
                {parent.students.map((student) => (
                  <Link
                    key={student.id}
                    className="px-4 py-2.5 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors text-center"
                    href={`/list/students/${student.id}`}
                  >
                    {student.first_name}&apos;s Profile
                  </Link>
                ))}
                {parent.students.map((student) => (
                  <Link
                    key={`results-${student.id}`}
                    className="px-4 py-2.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors text-center"
                    href={`/list/results?studentId=${student.id}`}
                  >
                    {student.first_name}&apos;s Results
                  </Link>
                ))}
                {parent.students.map((student) => (
                  <Link
                    key={`exams-${student.id}`}
                    className="px-4 py-2.5 rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors text-center"
                    href={`/list/exams?studentId=${student.id}`}
                  >
                    {student.first_name}&apos;s Exams
                  </Link>
                ))}
                {parent.students.map((student) => (
                  <Link
                    key={`assignments-${student.id}`}
                    className="px-4 py-2.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors text-center"
                    href={`/list/assignments?studentId=${student.id}`}
                  >
                    {student.first_name}&apos;s Tasks
                  </Link>
                ))}
              </>
            ) : (
              <p className="col-span-3 text-gray-500 text-center py-4">No children to show shortcuts for</p>
            )}
          </div>
        </div>
        {/* Contact Information Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Mail className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-gray-700">{parent.email || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="text-gray-700">{parent.phone || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Address</p>
                <p className="text-gray-700">{parent.address || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleParentPage;
