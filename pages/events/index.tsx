import { Fragment } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data"

export default function AllEvents() {

    const events = getAllEvents();

    const router = useRouter();

    function findEventsHandler(year: string, month: string) {
        const fullPath = `/events/${year}/${month}`;

        // navigate to fullpath
        router.push(fullPath);
    }

    return (
        <Fragment>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    );
}
