import Head from "next/head";
import { Fragment } from "react";

import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

export async function getStaticProps(context: any) {
    const eventId = context.params.id;
    const event = await getEventById(eventId);

    if (!event) {
        return {
            props: {hasError: true }
        }
    }

    return {
        props: {
            selectedEvent: event
        },
        // add for regenerating new incoming requests - 30s
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({ params: { id: event.id } }));

    return {
        paths: paths,
        fallback: "blocking"
    }
}

export default function EventDetail(props: any) {
    const event = props.selectedEvent;
    if (!event || props.hasError) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No event found!</p>
                </ErrorAlert>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description}></meta>
            </Head>
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
