import { Fragment } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util"
import Head from "next/head";

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events: events
        },
        // add for regenerating new incoming requests - 10s
        revalidate: 10
    }
}

export default function AllEvents(props: any) {

    const { events } = props;

    const router = useRouter();

    function findEventsHandler(year: string, month: string) {
        const fullPath = `/events/${year}/${month}`;

        // navigate to fullpath
        router.push(fullPath);
    }

    return (

        <Fragment>
            <Head>
                <title>NextJS Events</title>
                <meta name="description" content="Find a lot of great event that allow you to evoleve..."></meta>
            </Head>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    );
}
