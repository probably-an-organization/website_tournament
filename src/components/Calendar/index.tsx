import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiClock } from "react-icons/fi";
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
import addHours from "date-fns/addHours";
import { isBefore } from "date-fns";
import subHours from "date-fns/subHours";

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

const DUMMY_EVENT: Event[] = [
  {
    title: "Tournament 1",
    description: "Match Bob vs. Alice",
    date: new Date(),
  },
  {
    title: "Tournament 1",
    description: "Match Alinza vs. Olaf",
    date: addHours(new Date(), 1),
  },
];

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

  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  const [events, setEvents] = useState<Event[]>(DUMMY_EVENT2);
  const [dateEvents, setDateEvents] = useState<Event[]>([]);

  const [calendarHeight, setCalendarHeight] = useState<number>(0);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calendarRef.current?.clientHeight) {
      return;
    }
    setCalendarHeight(calendarRef.current.clientHeight);
  }, [calendarRef.current]);

  useEffect(() => {
    let start = startOfMonth(date);
    if (!isMonday(start)) {
      start = previousMonday(start);
    }
    let end = endOfMonth(date);
    if (!isSunday(end)) {
      end = nextSunday(end);
    }
    setCalendarDays(
      eachDayOfInterval({
        start,
        end,
      }).map((d) => ({
        date: d,
        hasEvents: events.some((e) => isSameDay(e.date, d)),
      })),
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
      <div className="w-full h-full flex lg:flex-row flex-col">
        <div className="md:p-16 md:pb-12 p-3 lg:w-1/2 w-full" ref={calendarRef}>
          <div className="px-4 flex items-center justify-between">
            <h1 className="text-xl font-bold dark:text-neutral-100 text-neutral-800">
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
          <div className="flex items-center justify-between pt-12 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="text-2xl font-medium text-center text-neutral-800 dark:text-neutral-100">
                        Mo
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="text-2xl font-medium text-center text-neutral-800 dark:text-neutral-100">
                        Tu
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="text-2xl font-medium text-center text-neutral-800 dark:text-neutral-100">
                        We
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="text-2xl font-medium text-center text-neutral-800 dark:text-neutral-100">
                        Th
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="text-2xl font-medium text-center text-neutral-800 dark:text-neutral-100">
                        Fr
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="text-2xl font-medium text-center text-neutral-800 dark:text-neutral-100">
                        Sa
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="text-2xl font-medium text-center text-neutral-800 dark:text-neutral-100">
                        Su
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {chunk(calendarDays, 7).map((calendarWeek, i) => (
                  <tr key={`week-${i}`}>
                    {calendarWeek.map((calendarDay, ii) => (
                      <td key={`week-${i}-day-${ii}`} className="pt-6">
                        <button
                          className="relative p-4 hover:bg-neutral-800 rounded-full flex justify-center"
                          onClick={() => setDate(calendarDay.date)}
                        >
                          <p
                            className={twMerge(
                              "text-2xl transition-colors w-8 h-8 dark:text-neutral-100",
                              isSameMonth(calendarDay.date, date)
                                ? "font-medium"
                                : "font-thin dark:text-neutral-500",
                              isSameDay(calendarDay.date, date)
                                ? "dark:text-orange-500"
                                : "",
                            )}
                          >
                            {calendarDay.date.getDate()}
                          </p>
                          {calendarDay.hasEvents && (
                            <div
                              className={twMerge(
                                "absolute bottom-3 w-1 h-1 rounded-full bg-neutral-100",
                                isSameDay(calendarDay.date, date)
                                  ? "dark:bg-orange-500"
                                  : "",
                              )}
                            />
                          )}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="md:py-8 md:px-16 p-3 max-w-full overflow-auto dark:bg-neutral-800 bg-neutral-50 lg:w-1/2"
          style={{ height: calendarHeight }}
        >
          {dateEvents.length > 0 ? (
            dateEvents.map((de, i) => (
              <div
                className="border-b pt-4 first:pt-0 last:border-b-0 pb-4 border-neutral-400"
                key={`event-${i}`}
              >
                <p className="text-xs flex gap-1 items-center font-light leading-3 text-neutral-500 dark:text-neutral-300">
                  <FiClock /> {format(de.date, "HH:mm")}
                </p>
                <p className="text-lg font-medium leading-5 text-neutral-800 dark:text-neutral-100 pt-2">
                  {de.title}
                </p>
                <p className="text-sm pt-2 leading-none text-neutral-600 dark:text-neutral-300">
                  {de.description}
                </p>
              </div>
            ))
          ) : (
            <p className="italic dark:text-neutral-300 text-center">
              No events found
            </p>
          )}
        </div>
      </div>
    </>
  );
}
