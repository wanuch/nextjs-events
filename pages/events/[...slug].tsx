import { useRouter } from "next/router"
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";

export async function getServerSideProps(context: any) {
    const { params } = context;

    const filterData = params.slug;
    
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return {
            props: { hasError: true }
            // redirect: {destination: "/error"}
            // notFound: true 
        };
    }

    const filteredEvent = await getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    return {
        props: {
            events: filteredEvent,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    };

}

export default function FilteredEvents(props: any) {

    const router = useRouter();

    if (props.hasError) {
        return (<Fragment>
            <ErrorAlert>
                <p>Invalid filter, Please adjust your value</p>
            </ErrorAlert>
            <div className="center">
                <Button link="/events">Show All Events</Button>
            </div>
        </Fragment>);
    }

    const filteredEvent = props.events;

    if (!filteredEvent || filteredEvent.length === 0) {
        return (<Fragment>
            <ErrorAlert>
                <p>No events found for chosen filter!</p>
            </ErrorAlert>
            <div className="center">
                <Button link="/events">Show All Events</Button>
            </div>
        </Fragment>);
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvent} />
        </Fragment>
    );
}
