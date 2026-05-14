import { getEvent } from "@/lib/api";
import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/PublicFooter";
import EventHero from "@/components/public/EventsHero";
import EventDetails from "@/components/public/EventsDetails";
import EventCTA from "@/components/public/EventsCTA";

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  if (!event) {
    return (
      <div className="text-center py-20">
        Event not found or failed to load.
      </div>
    );
  }

  return (
    <>
      <PublicNavbar />

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <EventHero event={event} />
        <EventDetails event={event} />
        <EventCTA event={event} />
      </main>

      <PublicFooter />
    </>
  );
}