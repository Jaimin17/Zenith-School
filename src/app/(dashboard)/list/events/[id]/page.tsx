import { requireAuth } from "@/lib/auth/serverAuth";
import { fetchEventByIdAction } from "@/actions/admin";
import { getEventImageUrl } from "@/utils/imageHelpers";
import FormContainer from "@/components/FromAnother/FormContainer";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  ImageIcon,
  CalendarCheck2,
  CalendarX2,
  Bookmark,
} from "lucide-react";
import { notFound } from "next/navigation";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (dt: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dt));

const formatTime = (dt: string) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dt));

const getDuration = (start: string, end: string) => {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  const totalMins = Math.round(ms / 60000);
  if (totalMins < 60) return `${totalMins} min`;
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return m ? `${h}h ${m}m` : `${h} hour${h > 1 ? "s" : ""}`;
};

const isUpcoming = (startTime: string) => new Date(startTime) >= new Date();

// ─── Page ─────────────────────────────────────────────────────────────────────

const EventDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const auth = await requireAuth();
  const role = auth.role;

  const result = await fetchEventByIdAction(id);
  if (!result.success || !result.data) notFound();

  const event = result.data;
  const upcoming = isUpcoming(event.start_time);
  const images: string[] = event.img ?? [];
  const heroImage = images[0] ? getEventImageUrl(images[0]) : null;
  const galleryImages = images.slice(1);

  return (
    <div className="flex-1 p-4 md:p-6 flex flex-col gap-5">

      {/* ── Topbar: back + actions ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link
          href="/list/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
          title="Back to events list"
        >
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm group-hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </span>
        </Link>

        {role === "admin" && (
          <div className="flex items-center gap-2">
            {!upcoming && (
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                Past event — read only
              </span>
            )}
            <FormContainer
              table="event"
              type="update"
              data={event}
              disabled={!upcoming}
            />
            <FormContainer
              table="event"
              type="delete"
              id={event.id}
              disabled={!upcoming}
            />
          </div>
        )}
      </div>

      {/* ── Hero banner ── */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-gray-900 shadow-md"
        style={{ minHeight: "220px", maxHeight: "340px", height: "28vw" }}
      >
        {heroImage ? (
          <Image
            src={heroImage}
            alt={event.title}
            fill
            className="object-cover opacity-80"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-lamaSky via-lamaPurple to-lamaYellow opacity-60" />
        )}

        {/* dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

        {/* content */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-12 flex flex-col gap-2">
          <span
            className={`inline-flex items-center gap-1.5 self-start text-xs font-semibold px-3 py-1 rounded-full ${
              upcoming
                ? "bg-green-400/20 text-green-300 ring-1 ring-green-400/30"
                : "bg-gray-500/30 text-gray-300 ring-1 ring-gray-400/30"
            }`}
          >
            {upcoming ? (
              <CalendarCheck2 className="w-3.5 h-3.5" />
            ) : (
              <CalendarX2 className="w-3.5 h-3.5" />
            )}
            {upcoming ? "Upcoming Event" : "Past Event"}
          </span>

          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-sm">
            {event.title}
          </h1>

          <p className="text-sm text-gray-300 flex items-center gap-2 flex-wrap">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{formatDate(event.start_time)}</span>
            <span className="text-gray-500">·</span>
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              {formatTime(event.start_time)} – {formatTime(event.end_time)}
            </span>
            <span className="text-gray-500">·</span>
            <span className="text-lamaYellow font-medium">
              {getDuration(event.start_time, event.end_time)}
            </span>
          </p>
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div className="flex flex-col lg:flex-row gap-5">

        {/* ── LEFT: description + gallery ── */}
        <div className="flex-1 flex flex-col gap-5">

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-sky-400" />
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                About this Event
              </h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-gray-700 leading-relaxed text-[15px] whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>

          {/* Gallery: extra images beyond hero */}
          {galleryImages.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Event Gallery
                </h2>
                <span className="ml-auto text-xs text-gray-400">
                  {images.length} {images.length === 1 ? "photo" : "photos"}
                </span>
              </div>
              <div className="p-4">
                <div
                  className={`grid gap-3 ${
                    galleryImages.length === 1
                      ? "grid-cols-1"
                      : galleryImages.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-2 md:grid-cols-3"
                  }`}
                >
                  {galleryImages.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 group"
                    >
                      <Image
                        src={getEventImageUrl(img)}
                        alt={`${event.title} — photo ${i + 2}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 300px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* No images at all */}
          {images.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm text-gray-400">No photos uploaded for this event</p>
            </div>
          )}
        </div>

        {/* ── RIGHT: sidebar ── */}
        <div className="lg:w-72 xl:w-80 flex flex-col gap-4">

          {/* Meta info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Event Details
              </h3>
            </div>

            <div className="divide-y divide-gray-50">
              {/* Start */}
              <div className="flex items-start gap-3 px-5 py-4">
                <div className="w-9 h-9 rounded-xl bg-lamaSkyLight flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                    Starts
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(event.start_time)}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatTime(event.start_time)}
                  </p>
                </div>
              </div>

              {/* End */}
              <div className="flex items-start gap-3 px-5 py-4">
                <div className="w-9 h-9 rounded-xl bg-lamaYellowLight flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                    Ends
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(event.end_time)}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatTime(event.end_time)}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-start gap-3 px-5 py-4">
                <div className="w-9 h-9 rounded-xl bg-lamaPurpleLight flex items-center justify-center flex-shrink-0">
                  <CalendarCheck2 className="w-4 h-4 text-violet-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                    Duration
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {getDuration(event.start_time, event.end_time)}
                  </p>
                </div>
              </div>

              {/* Audience */}
              <div className="flex items-start gap-3 px-5 py-4">
                <div className="w-9 h-9 rounded-xl bg-lamaSkyLight flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                    For
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {event.related_class?.name ?? "All Classes"}
                  </p>
                  {!event.related_class && (
                    <p className="text-xs text-gray-500 mt-0.5">School-wide event</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status card */}
          <div
            className={`rounded-2xl px-5 py-4 flex items-center gap-3 ${
              upcoming
                ? "bg-green-50 border border-green-100"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                upcoming ? "bg-green-100" : "bg-gray-200"
              }`}
            >
              {upcoming ? (
                <CalendarCheck2 className="w-4 h-4 text-green-600" />
              ) : (
                <CalendarX2 className="w-4 h-4 text-gray-500" />
              )}
            </div>
            <div>
              <p
                className={`text-sm font-semibold ${
                  upcoming ? "text-green-700" : "text-gray-600"
                }`}
              >
                {upcoming ? "Upcoming" : "Past Event"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {upcoming
                  ? "This event has not yet taken place"
                  : "This event has already occurred"}
              </p>
            </div>
          </div>

          {/* Photo count */}
          {images.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-lamaYellowLight flex items-center justify-center flex-shrink-0">
                <ImageIcon className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                  Photos
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {images.length} {images.length === 1 ? "image" : "images"}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
