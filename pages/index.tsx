import { getFeaturedEvents } from "../helpers/api-util"
import EventList from "../components/events/event-list";

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    // add for regenerating new incoming requests - 10s
    revalidate: 10
  }
}

export default function Home(props: any) {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  )
}


