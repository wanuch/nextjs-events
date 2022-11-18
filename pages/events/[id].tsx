import { Fragment } from "react";
import { useRouter } from "next/router"

import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import { getEventById } from "../../dummy-data";
import ErrorAlert from "../../components/ui/error-alert";

export default function EventDetail() {

    const router = useRouter();

    // id attribute must match with the file name
    const eventId = router.query.id;
    console.log("eventId: " + eventId);

    const event = getEventById(eventId);
    console.log(event);
    if (!event) {
        return <Fragment>
            <ErrorAlert>
                <p>No event found!</p>
            </ErrorAlert>
        </Fragment>
    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
}
