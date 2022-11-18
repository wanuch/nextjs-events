import { getFeaturedEvents } from "../dummy-data"
import EventList from "../components/events/event-list";

export default function Home() {

  const featureedEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featureedEvents} />
    </div>
  )
}
