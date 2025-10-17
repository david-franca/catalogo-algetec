import dayjs from "dayjs";

import { Calendar } from "@/types/calendar";
import { apiClient } from "@/utils";
import { EventInput } from "@fullcalendar/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { DemandStatus } from "@/types/demand";

const handleColor = (value?: string): string => {
  switch (value) {
    case "READY":
      return "#006549";
    case "LATE":
      return "#B10F23";
    case "ON_TIME":
      return "#0050AB";
    default:
      return "#2C3B48";
  }
};

const handleHolidayType = (value?: string, date?: string): string => {
  let type = "ON_TIME";
  if (value && value === DemandStatus.READY) {
    type = "READY";
  } else if (date && dayjs(date).isBefore(dayjs())) {
    type = "LATE";
  }

  return type;
};

export function useCalendarList() {
  const { department, tags, users, dateEnd, dateStart } = useSearch({
    from: "/dashboard/calendar/",
  });
  return useQuery<EventInput[]>({
    queryKey: ["calendars", users, department, tags, dateStart, dateEnd],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await apiClient.get<Calendar[]>("/calendars/all", {
        params: {
          userId: users,
          departments: department,
          tags,
          dateStart,
          dateEnd,
        },
      });

      return data.map((calendar) => {
        const type = handleHolidayType(
          calendar?.demand?.status,
          calendar?.date
        );
        const color = handleColor(type);

        return {
          id: calendar.id.toString(),
          title: calendar.name,
          start: dayjs(calendar.date).format("YYYY-MM-DD"),
          color,
          extendedProps: {
            type,
            authors: calendar.members
              ?.map((member) => member.split(" ")[0])
              .join(", "),
            demandId: calendar.demand.id,
          },
        };
      });
    },
  });
}
