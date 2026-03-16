import { fetchChildrenOfParentAction } from "@/actions/admin";
import { requireAuth } from "@/lib/auth/serverAuth";
import { getStudentImageUrl } from "@/utils/imageHelpers";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

function getHomePath(role: string | null): string {
  if (role === "admin") return "/admin";
  if (role === "teacher") return "/teacher";
  if (role === "student") return "/student";
  return "/";
}

export default async function SelectChildPage() {
  const auth = await requireAuth("/parent/select-child");

  if (auth.role !== "parent") {
    redirect(getHomePath(auth.role));
  }

  const childrenResult = await fetchChildrenOfParentAction();
  const children = childrenResult.data ?? [];

  async function selectChildAction(formData: FormData) {
    "use server";

    const childId = formData.get("childId")?.toString();
    if (!childId) return;

    const cookieStore = await cookies();
    cookieStore.set("selected_child_id", childId, {
      path: "/",
      maxAge: 31536000,
    });

    redirect("/parent");
  }

  if (children.length === 0) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-lg p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">No Child Found</h1>
          <p className="text-sm text-gray-500 mt-2">
            We could not find any student linked to your parent account. Please contact school support.
          </p>
          <a
            href="/parent"
            className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-lamaPurple text-gray-800 font-medium hover:bg-lamaPurpleLight transition-colors"
          >
            Back To Dashboard
          </a>
        </div>
      </div>
    );
  }

  if (children.length === 1) {
    redirect("/parent");
  }

  return (
    <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="bg-gradient-to-r from-lamaPurpleLight to-lamaSkyLight border border-lamaPurple/40 rounded-2xl p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Choose Child Profile</h1>
          <p className="text-sm text-gray-600 mt-2">
            Select which child you want to view right now. You can switch anytime from the top bar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {children.map((child) => (
              <form key={child.id} action={selectChildAction}>
                <input type="hidden" name="childId" value={child.id} />
                <button
                  type="submit"
                  className="w-full text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-lamaSky hover:bg-lamaSkyLight/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={getStudentImageUrl(child.img)}
                      alt={`${child.first_name} ${child.last_name}`}
                      width={52}
                      height={52}
                      className="rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold text-gray-900 truncate">
                        {child.first_name} {child.last_name}
                      </h2>
                      <p className="text-xs text-gray-500 truncate">@{child.username}</p>
                      <span
                        className={`inline-flex mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                          child.status === "graduated"
                            ? "bg-green-100 text-green-700"
                            : child.status === "inactive"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {child.status}
                      </span>
                    </div>
                  </div>
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
