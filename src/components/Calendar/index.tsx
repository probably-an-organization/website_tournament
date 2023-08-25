import { useEffect, useRef, useState } from "react";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
} from "react-icons/fi";
import format from "date-fns/format";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import previousMonday from "date-fns/previousMonday";
import isMonday from "date-fns/isMonday";
import isSunday from "date-fns/isSunday";
import nextSunday from "date-fns/nextSunday";
import { twMerge } from "tailwind-merge";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";

import { chunk } from "~src/utils/arrayUtils";
import subMonths from "date-fns/subMonths";
import addMonths from "date-fns/addMonths";
import { isBefore } from "date-fns";
import subHours from "date-fns/subHours";
import useWindowSize from "~src/hooks/useDimensions";

type CalendarProps = {
  className?: string;
  limits?: {
    // TODO navigation limit date's
    start?: Date;
    end?: Date;
  };
};

type Event = {
  title: string;
  description: string;
  date: Date;
};

type CalendarDay = {
  date: Date;
  hasEvents: boolean;
};

const WEEKDAYS: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const DUMMY_EVENT2: Event[] = [
  {
    title: "Tournament 1",
    description: "Match Bob vs. Alice",
    date: new Date(),
  },
  {
    title: "Tournament 1",
    description: "Match Bob vs. Alice",
    date: new Date(),
  },
  {
    title: "Tournament 1",
    description: "Match Bob vs. Alice",
    date: new Date(),
  },
  {
    title: "Tournament 1",
    description: "Match Bob vs. Alice",
    date: new Date(),
  },
  {
    title: "Tournament 1",
    description: "Match Bob vs. Alice",
    date: new Date(),
  },
  {
    title: "Tournament 1",
    description: "Match Bob vs. Alice",
    date: new Date(),
  },
  {
    title: "Tournament 1",
    description: "Match Bob vs. Alice",
    date: new Date(),
  },
  {
    title: "Tournament 1",
    description: "Match Bob vs. Alice",
    date: new Date(),
  },
  {
    title: "Tournament 1",
    description: "Match Bob vs. Alice",
    date: new Date(),
  },
  {
    title: "Tournament 1",
    description: "Match Alinza vs. Olaf",
    date: subHours(new Date(), 1),
  },
];

export default function Calendar({ className, limits }: CalendarProps) {
  const [date, setDate] = useState<Date>(new Date());

  const [calendarWeeks, setCalendarWeeks] = useState<CalendarDay[][]>([]);

  const [events, setEvents] = useState<Event[]>(DUMMY_EVENT2);
  const [dateEvents, setDateEvents] = useState<Event[]>([]);

  const [calendarHeight, setCalendarHeight] = useState<number>(0);
  const calendarRef = useRef<HTMLDivElement>(null);

  const size = useWindowSize();

  useEffect(() => {
    if (!calendarRef.current?.clientHeight) {
      return;
    }
    setCalendarHeight(calendarRef.current.offsetHeight);
  }, [size, calendarWeeks.length]);

  useEffect(() => {
    let start = startOfMonth(date);
    if (!isMonday(start)) {
      start = previousMonday(start);
    }
    let end = endOfMonth(date);
    if (!isSunday(end)) {
      end = nextSunday(end);
    }
    setCalendarWeeks(
      chunk(
        eachDayOfInterval({
          start,
          end,
        }).map((d) => ({
          date: d,
          hasEvents: events.some((e) => isSameDay(e.date, d)),
        })),
        7,
      ),
    );
  }, [date.getMonth()]);

  useEffect(() => {
    setDateEvents(
      events
        .filter((e) => isSameDay(e.date, date))
        .sort((a, b) => (isBefore(a.date, b.date) ? -1 : 1)),
    );
  }, [date.getDate()]);

  return (
    <>
      <div className="w-full h-full flex md:flex-row flex-col">
        <div className="p-6 h-fit md:min-w-fit" ref={calendarRef}>
          <div className="flex items-center justify-between">
            <h1 className="text-lg flex items-center gap-2 font-bold dark:text-neutral-100 text-neutral-800">
              <FiCalendar />
              {format(date, "LLLL uuuu")}
            </h1>
            <div className="flex items-center gap-3 text-neutral-800 dark:text-neutral-100">
              <button
                className="rounded-full p-2 flex items-center justify-center hover:bg-neutral-800 active:scale-90 transition-colorsTransform"
                onClick={() => setDate((prev) => subMonths(prev, 1))}
              >
                <FiChevronLeft size={25} />
              </button>
              <button
                className="rounded-full p-2 flex items-center justify-center hover:bg-neutral-800 active:scale-90 transition-colorsTransform"
                onClick={() => setDate((prev) => addMonths(prev, 1))}
              >
                <FiChevronRight size={25} />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <table className="w-full">
              <thead>
                <tr>
                  {WEEKDAYS.map((wd, i) => (
                    <th className="pb-4" key={`weekday-${i}`}>
                      <div className="w-full flex justify-center">
                        <p className="text-lg font-medium text-center text-neutral-800 dark:text-neutral-100">
                          {wd}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calendarWeeks.map((calendarWeek, i) => (
                  <tr key={`week-${i}`}>
                    {calendarWeek.map((calendarDay, ii) => (
                      <td key={`week-${i}-day-${ii}`} className="pt-1">
                        <div className="w-full h-full flex justify-center items-center">
                          <button
                            className="relative w-12 h-12 dark:hover:bg-neutral-800 transition-colors rounded-full"
                            onClick={() => setDate(calendarDay.date)}
                          >
                            <p
                              className={twMerge(
                                "text-lg transition-colors dark:text-neutral-100",
                                isSameMonth(calendarDay.date, date)
                                  ? "font-normal"
                                  : "font-thin dark:text-neutral-500",
                                isSameDay(calendarDay.date, date)
                                  ? "dark:text-orange-500"
                                  : "",
                              )}
                            >
                              {calendarDay.date.getDate()}
                            </p>
                            {calendarDay.hasEvents && (
                              <div className="absolute bottom-3 left-3.5 right-3.5 flex justify-center">
                                <span
                                  className={twMerge(
                                    "w-full h-px rounded dark:bg-neutral-100",
                                    isSameDay(calendarDay.date, date)
                                      ? "dark:bg-orange-500"
                                      : "",
                                  )}
                                />
                              </div>
                            )}
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="md:p-6 p-3 flex flex-col max-w-full overflow-auto dark:bg-neutral-800 bg-neutral-50 md:w-full"
          style={{ height: calendarHeight }}
        >
          {dateEvents.length > 0 ? (
            dateEvents.map((de, i) => (
              <button
                className="hover:dark:bg-neutral-700 transition-colors w-full first:border-t border-b p-3 dark:border-neutral-600"
                key={`event-${i}`}
                onClick={() => alert("TODO")}
              >
                <div className="flex flex-col items-start w-full">
                  <div className="w-full flex gap-3 justify-between items-center text-neutral-500 dark:text-neutral-300">
                    <p className="font-medium text-neutral-800 dark:text-neutral-100">
                      {de.title}
                    </p>
                    <div className="flex gap-1 items-center">
                      <FiClock size={12} />
                      <p className="text-sm pb-px font-light">
                        {format(de.date, "HH:mm")}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {de.description}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="text-sm font-thin h-full flex items-center justify-center dark:text-neutral-400">
              No events found
            </p>
          )}
        </div>
      </div>
    </>
  );
}
