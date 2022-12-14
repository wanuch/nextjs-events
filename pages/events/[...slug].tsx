import Head from "next/head";
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilteredEvents() {
    const [loadedEvents, setLoadedEvents] = useState<any>();
    const router = useRouter();

    const filterData = router.query.slug;

    const fetcher = (url: any) => fetch(url).then((r) => r.json());
    const { data, error } = useSWR("https://react-getting-start-5074d-default-rtdb.asia-southeast1.firebasedatabase.app/events.json", fetcher);

    useEffect(() => {
        if (data) {
            const events = [];

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                });
            }

            setLoadedEvents(events);
        }
    }, [data]);

    let pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content={`A list of filtered events`}></meta>
        </Head>
    );

    if (!loadedEvents || !filterData) {
        return <Fragment>
            {pageHeadData}
            <p className="center">Loading...</p>
        </Fragment>;
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content={`All events for ${numMonth}/${numYear}.`}></meta>
        </Head>
    );

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return (<Fragment>
            {pageHeadData}
            <ErrorAlert>
                <p>Invalid filter, Please adjust your value</p>
            </ErrorAlert>
            <div className="center">
                <Button link="/events">Show All Events</Button>
            </div>
        </Fragment>);
    }

    const filteredEvents = loadedEvents.filter((event: any) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (<Fragment>
            {pageHeadData}
            <ErrorAlert>
                <p>No events found for chosen filter!</p>
            </ErrorAlert>
            <div className="center">
                <Button link="/events">Show All Events</Button>
            </div>
        </Fragment>);
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            {pageHeadData}
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}
