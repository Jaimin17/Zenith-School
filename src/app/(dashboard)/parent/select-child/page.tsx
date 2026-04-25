import { fetchChildrenOfParentAction } from "@/actions/admin";
import { requireAuth } from "@/lib/auth/serverAuth";
import { getStudentImageUrl } from "@/utils/imageHelpers";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UserRound } from "lucide-react";

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
  const hasLoadError = !childrenResult.success;

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
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-lamaSkyLight flex items-center justify-center border border-lamaSky/60">
            <UserRound className="h-8 w-8 text-sky-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mt-4">No Child Found</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            {hasLoadError
              ? (childrenResult.error || "We could not load linked children right now. Please try again in a moment.")
              : "We could not find any student linked to your parent account. Please contact school support."}
          </p>
          <Link
            href="/parent"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-lamaPurple text-gray-800 font-medium hover:bg-lamaPurpleLight transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (children.length === 1) {
    redirect("/parent");
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Choose Child Profile</h1>
              <p className="text-sm text-gray-600 mt-1">
                Select which child you want to view right now. You can switch anytime from the top bar.
              </p>
            </div>
            <div className="inline-flex items-center self-start md:self-auto gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2">
              <span className="text-xs font-medium text-sky-700">Linked Children</span>
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-2 text-sm font-semibold text-sky-700 border border-sky-100">
                {children.length}
              </span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {children.map((child) => (
              <form key={child.id} action={selectChildAction}>
                <input type="hidden" name="childId" value={child.id} />
                <button
                  type="submit"
                  className="group w-full text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-sky-300 hover:shadow-md transition-all duration-200 rounded"
                >
                  <div className="flex items-start gap-3">
                    <Image
                      src={getStudentImageUrl(child.img)}
                      alt={`${child.first_name} ${child.last_name}`}
                      width={56}
                      height={56}
                      className="rounded-full object-cover border border-gray-200"
                    />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-semibold text-gray-900 truncate group-hover:text-sky-700 transition-colors">
                        {child.first_name} {child.last_name}
                      </h2>
                      <p className="text-xs text-gray-500 truncate mt-0.5">@{child.username}</p>
                      <span
                        className={`inline-flex mt-2 px-2.5 py-1 rounded-full text-xs font-medium ${
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

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Open dashboard as this child</span>
                    <span className="inline-flex items-center rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium text-white group-hover:bg-sky-700 transition-colors">
                      Select
                    </span>
                  </div>
                </button>
              </form>
            ))}
        </section>
      </div>
    </div>
  );
}
