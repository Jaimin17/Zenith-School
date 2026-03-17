import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CalendarDays, Pencil, PlusCircle, Trash2 } from "lucide-react";

import { requireAuth } from "@/lib/auth/serverAuth";
import {
  createHolidayAction,
  deleteHolidayAction,
  fetchHolidaysAction,
  updateHolidayAction,
} from "@/actions/admin";

export const dynamic = "force-dynamic";

async function createHolidayFormAction(formData: FormData) {
  "use server";
  const date = String(formData.get("date") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!date || !name) {
    revalidatePath("/list/holidays");
    return;
  }

  await createHolidayAction({
    date,
    name,
    description: description || null,
  });

  revalidatePath("/list/holidays");
  redirect("/list/holidays");
}

async function updateHolidayFormAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "").trim();
  const date = String(formData.get("date") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!id || !date || !name) {
    revalidatePath("/list/holidays");
    return;
  }

  await updateHolidayAction({
    id,
    date,
    name,
    description: description || null,
  });

  revalidatePath("/list/holidays");
  redirect("/list/holidays");
}

async function deleteHolidayFormAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "").trim();
  if (!id) {
    revalidatePath("/list/holidays");
    return;
  }

  await deleteHolidayAction(id);
  revalidatePath("/list/holidays");
  redirect("/list/holidays");
}

export default async function HolidaysPage() {
  const auth = await requireAuth();
  const isAdmin = auth.role === "admin";

  const result = await fetchHolidaysAction(0, 500);
  const holidays = result.data ?? [];

  return (
    <div className="p-4 md:p-6 flex flex-col gap-6">
      <div className="bg-white rounded-md border border-gray-100 p-4 md:p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Public Holidays</h1>
              <p className="text-sm text-gray-500 mt-1">
                Shared holiday calendar for attendance logic. All users can view; only admins can manage entries.
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-500 whitespace-nowrap mt-1">{holidays.length} total</div>
        </div>
      </div>

      {isAdmin && (
        <div className="bg-white rounded-md border border-gray-100 p-4 md:p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-semibold text-gray-800">Create Holiday</h2>
          </div>
          <form action={createHolidayFormAction} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-600">Date</label>
              <input
                type="date"
                name="date"
                required
                className="mt-1 h-10 w-full rounded-md border border-gray-200 px-3 text-sm"
              />
            </div>
            <div className="md:col-span-3">
              <label className="text-xs font-medium text-gray-600">Holiday Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Republic Day"
                className="mt-1 h-10 w-full rounded-md border border-gray-200 px-3 text-sm"
              />
            </div>
            <div className="md:col-span-5">
              <label className="text-xs font-medium text-gray-600">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Optional details"
                className="mt-1 h-10 w-full rounded-md border border-gray-200 px-3 text-sm"
              />
            </div>
            <div className="md:col-span-2 md:text-right">
              <button
                type="submit"
                className="h-10 w-full md:w-auto px-4 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                Add Holiday
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-md border border-gray-100 p-4 md:p-5 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Holiday List</h2>

        {result.success ? (
          holidays.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {holidays.map((holiday) => (
                <article key={holiday.id} className="rounded-lg border border-gray-200 p-4 bg-gray-50/40">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">
                        {new Date(holiday.date).toLocaleDateString(undefined, {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <h3 className="text-base font-semibold text-gray-800 mt-1">{holiday.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{holiday.description || "No description provided."}</p>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                          <Pencil className="w-3.5 h-3.5" />
                          Edit Holiday
                        </span>
                      </div>

                      <form
                        id={`update-holiday-${holiday.id}`}
                        action={updateHolidayFormAction}
                        className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end"
                      >
                        <input type="hidden" name="id" value={holiday.id} />
                        <div className="md:col-span-3">
                          <label className="text-[11px] text-gray-500">Date</label>
                          <input
                            type="date"
                            name="date"
                            defaultValue={holiday.date?.slice(0, 10)}
                            required
                            className="mt-1 h-9 w-full rounded-md border border-gray-200 px-2 text-xs"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <label className="text-[11px] text-gray-500">Name</label>
                          <input
                            type="text"
                            name="name"
                            defaultValue={holiday.name}
                            required
                            className="mt-1 h-9 w-full rounded-md border border-gray-200 px-2 text-xs"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <label className="text-[11px] text-gray-500">Description</label>
                          <input
                            type="text"
                            name="description"
                            defaultValue={holiday.description || ""}
                            className="mt-1 h-9 w-full rounded-md border border-gray-200 px-2 text-xs"
                          />
                        </div>
                      </form>

                      <div className="mt-3 flex items-center justify-end gap-2">
                        <form action={deleteHolidayFormAction}>
                          <input type="hidden" name="id" value={holiday.id} />
                          <button
                            type="submit"
                            className="h-9 px-3 inline-flex items-center gap-1 rounded-md bg-red-500 text-white text-xs font-medium hover:bg-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </form>
                        <button
                          type="submit"
                          form={`update-holiday-${holiday.id}`}
                          className="h-9 px-4 rounded-md bg-amber-500 text-white text-xs font-medium hover:bg-amber-600"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-gray-300 p-6 text-sm text-gray-500 text-center">
              No holidays found.
            </div>
          )
        ) : (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {result.error || "Failed to load holidays."}
          </div>
        )}
      </div>
    </div>
  );
}
