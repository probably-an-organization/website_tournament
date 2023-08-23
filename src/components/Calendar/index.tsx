import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import format from "date-fns/format";
import sub from "date-fns/sub";
import add from "date-fns/add";
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

type CalendarProps = {
  className?: string;
};

export default function Calendar({ className }: CalendarProps) {
  const [date, setDate] = useState<Date>(new Date());

  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    let start = startOfMonth(date);
    if (!isMonday(start)) {
      start = previousMonday(start);
    }
    let end = endOfMonth(date);
    if (!isSunday(end)) {
      end = nextSunday(end);
    }
    setDays(
      eachDayOfInterval({
        start,
        end,
      }),
    );
  }, [date.getMonth()]);

  // useEffect(() => {
  //   console.log("days", days);
  //   console.log("chunk", chunk(days, 7));
  // }, [days]);

  return (
    <>
      {/* <div className="bg-green-500 flex flex-col">
        <code>{date.toISOString()}</code>
        <button onClick={() => setDate((prev) => add(prev, { days: 1 }))}>
          asdf
        </button>
        <code>{previousMonday(new Date(2023, 7, 31)).toISOString()}</code>
      </div> */}
      <div className="w-full h-full flex lg:flex-row flex-col items-center">
        <div className="md:p-16 md:pb-12 p-3 lg:w-1/2 w-full">
          <div className="px-4 flex items-center justify-between">
            <h1 className="text-xl font-bold dark:text-neutral-100 text-neutral-800">
              {format(date, "LLLL uuuu")}
            </h1>
            <div className="flex items-center gap-3 text-neutral-800 dark:text-neutral-100">
              <button
                className="rounded-full p-2 flex items-center justify-center hover:bg-neutral-800 active:scale-90 transition-colorsTransform"
                onClick={() => setDate((prev) => sub(prev, { months: 1 }))}
              >
                <FiChevronLeft size={25} />
              </button>
              <button
                className="rounded-full p-2 flex items-center justify-center hover:bg-neutral-800 active:scale-90 transition-colorsTransform"
                onClick={() => setDate((prev) => add(prev, { months: 1 }))}
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
                {chunk(days, 7).map((week, i) => (
                  <tr key={`week-${i}`}>
                    {week.map((day, ii) => (
                      <td key={`week-${i}-day-${ii}`} className="pt-6">
                        <button
                          className="p-4 hover:bg-neutral-800 rounded-full flex justify-center"
                          onClick={() => setDate(day)}
                        >
                          <p
                            className={twMerge(
                              "text-2xl transition-colors w-8 h-8 dark:text-neutral-100",
                              isSameMonth(day, date)
                                ? "font-medium"
                                : "font-thin dark:text-neutral-500",
                              isSameDay(day, date)
                                ? "dark:text-orange-500"
                                : "",
                            )}
                          >
                            {day.getDate()}
                          </p>
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:py-8 md:px-16 p-3 dark:bg-neutral-800 bg-neutral-50 lg:w-1/2 self-stretch">
          <div className="border-b pb-4 border-neutral-400">
            <p className="text-xs font-light leading-3 text-neutral-500 dark:text-neutral-300">
              9:00 AM
            </p>
            <p className="text-lg font-medium leading-5 text-neutral-800 dark:text-neutral-100 pt-2">
              Zoom call with design team
            </p>
            <p className="text-sm pt-2 leading-none text-neutral-600 dark:text-neutral-300">
              Discussion on UX sprint and Wireframe review
            </p>
          </div>
          <div className="border-b pb-4 border-neutral-400 pt-5">
            <p className="text-xs font-light leading-3 text-neutral-500 dark:text-neutral-300">
              10:00 AM
            </p>
            <p className="text-lg font-medium leading-5 text-neutral-800 dark:text-neutral-100 pt-2">
              Orientation session with new hires
            </p>
          </div>
          <div className="border-neutral-400 pt-5">
            <p className="text-xs font-light leading-3 text-neutral-500 dark:text-neutral-300">
              9:00 AM
            </p>
            <p className="text-lg font-medium leading-5 text-neutral-800 dark:text-neutral-100 pt-2">
              Zoom call with design team
            </p>
            <p className="text-sm pt-2 leading-none text-neutral-600 dark:text-neutral-300">
              Discussion on UX sprint and Wireframe review
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
