import { fetchUserProfileAction } from "@/actions/admin";
import { requireAuth } from "@/lib/auth/serverAuth";
import { getTeacherImageUrl, getStudentImageUrl } from "@/utils/imageHelpers";
import Image from "next/image";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Droplets, 
  UserCircle,
  Shield,
  GraduationCap,
  Users,
  BookOpen
} from "lucide-react";
import type { UserProfile, TeacherProfile, StudentProfile, ParentProfile, AdminProfile } from "@/types/schemas";
import { getServerUserRole } from "@/utils/authHelpers";
import { cookies } from "next/headers";

const ProfilePage = async () => {
  await requireAuth();
  
  const result = await fetchUserProfileAction();

  if (!result.success || !result.data) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm m-4">
        <div className="text-center py-10">
          <UserCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Unable to load profile</h2>
          <p className="text-gray-500 mt-2">{result.error || "Please try again later."}</p>
        </div>
      </div>
    );
  }

  const cookieStore = await cookies();
  const profile = result.data;
  const role = getServerUserRole(cookieStore);

  // Helper to get profile image based on role
  const getProfileImage = () => {
    if (role === 'teacher' && 'img' in profile) {
      return getTeacherImageUrl((profile as TeacherProfile).img);
    }
    if (role === 'student' && 'img' in profile) {
      return getStudentImageUrl((profile as StudentProfile).img);
    }
    return '/noAvatar.png';
  };

  // Helper to get role badge color
  const getRoleBadgeStyle = () => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'teacher':
        return 'bg-blue-100 text-blue-700';
      case 'student':
        return 'bg-green-100 text-green-700';
      case 'parent':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Helper to get role icon
  const getRoleIcon = () => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'teacher':
        return <BookOpen className="w-4 h-4" />;
      case 'student':
        return <GraduationCap className="w-4 h-4" />;
      case 'parent':
        return <Users className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(new Date(dateStr));
  };

  const isAdmin = role === 'admin';
  const hasExtendedInfo = role === 'teacher' || role === 'student';
  const extendedProfile = profile as TeacherProfile | StudentProfile;
  const baseProfile = profile as ParentProfile | TeacherProfile | StudentProfile;

  return (
    <div className="p-4 space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-40 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pt-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar - Positioned to overlap banner */}
            <div className="relative flex-shrink-0 -mt-28">
              <div className="w-40 h-40 rounded-2xl border-6 border-white shadow-xl overflow-hidden bg-white ring-2 ring-blue-100">
                <Image
                  src={getProfileImage()}
                  alt="Profile"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Name, Username and Role */}
            <div className="flex-1">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900">
                  {isAdmin 
                    ? (profile as AdminProfile).username 
                    : `${baseProfile.first_name} ${baseProfile.last_name}`}
                </h1>
                {!isAdmin && (
                  <p className="text-gray-500 text-base">@{baseProfile.username}</p>
                )}
              </div>
              <div className="mt-3">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${getRoleBadgeStyle()}`}>
                  {getRoleIcon()}
                  {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Admin'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        {!isAdmin && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                  <p className="text-gray-900 font-medium">{baseProfile.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
                  <p className="text-gray-900 font-medium">{baseProfile.phone || "Not provided"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Address</p>
                  <p className="text-gray-900 font-medium">{baseProfile.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Member Since</p>
                  <p className="text-gray-900 font-medium">{formatDate(baseProfile.created_at)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personal Details (for Teacher/Student) */}
        {hasExtendedInfo && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-gray-400" />
              Personal Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Date of Birth</p>
                  <p className="text-gray-900 font-medium">{formatDate(extendedProfile.dob)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Gender</p>
                  <p className="text-gray-900 font-medium capitalize">{extendedProfile.sex}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Blood Type</p>
                  <p className="text-gray-900 font-medium">{extendedProfile.blood_type}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Card */}
        {isAdmin && (
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-400" />
              Administrator Account
            </h2>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Username: {(profile as AdminProfile).username}</p>
                <p className="text-sm text-gray-500">You have full administrative access to the system.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;