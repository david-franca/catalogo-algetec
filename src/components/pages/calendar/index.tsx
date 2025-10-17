import { Card, Tooltip } from "antd";
import {
  CheckIcon,
  ClockAlertIcon,
  Globe2Icon,
  HammerIcon,
  HourglassIcon,
  LoaderCircleIcon,
  MapPinCheckIcon,
  SparklesIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useCalendarList } from "@/services/calendar.service";
import { getHolidays } from "@/utils/isBusinessDay";
import { EventContentArg, EventInput } from "@fullcalendar/core";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useNavigate } from "@tanstack/react-router";

export function Calendar() {
  const navigate = useNavigate({ from: "/dashboard/calendar" });
  const { data: calendars, isLoading } = useCalendarList();
  const [holidays, setHolidays] = useState<EventInput[]>([]);

  const handleHolidayTypeIcon = (type: string) => {
    switch (type) {
      case "READY":
        return CheckIcon;
      case "LATE":
        return ClockAlertIcon;
      case "ON_TIME":
        return HourglassIcon;
      case "OPTIONAL":
        return LoaderCircleIcon;
      case "LOCAL":
        return MapPinCheckIcon;
      case "STATE":
        return HammerIcon;
      case "NATIONAL":
        return Globe2Icon;
      default:
        return SparklesIcon;
    }
  };

  const calendarData = useMemo(() => {
    if (!calendars) {
      return holidays;
    } else {
      return [...calendars, ...holidays];
    }
  }, [calendars, holidays]);

  function handleCalendarType(type: string) {
    switch (type) {
      case "dayGridMonth":
        return "month";
      case "timeGridWeek":
        return "week";
      case "timeGridDay":
        return "day";
      default:
        return "month";
    }
  }

  function renderEventContent(eventInfo: EventContentArg) {
    const Icon = handleHolidayTypeIcon(eventInfo.event.extendedProps.type);
    return (
      <Tooltip
        title={eventInfo.event.extendedProps.authors}
        className="flex items-center space-x-1"
      >
        <Icon className="h-4 w-4" />
        <span className={`text-[${eventInfo.event.textColor}]`}>
          {eventInfo.event.title}
        </span>
      </Tooltip>
    );
  }

  return (
    <Card loading={isLoading}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        locale={ptLocale}
        // editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={calendarData}
        showNonCurrentDates={false}
        eventContent={(e) => renderEventContent(e)}
        datesSet={(e) => {
          const model = handleCalendarType(e.view.type);
          const holidays = getHolidays(e.start, model);

          setHolidays(holidays);
          navigate({
            search: (prev) => ({
              ...prev,
              dateStart: e.start.toISOString(),
              dateEnd: e.end.toISOString(),
            }),
          });
        }}
        eventClick={(e) => {
          const demandId = e.event.extendedProps.demandId;

          if (demandId) {
            navigate({
              to: "/dashboard/demands/show/$id",
              params: { id: e.event.extendedProps.demandId },
            });
          }
        }}
        //   select={(e) => {
        //     confirm("Deseja criar um evento?");
        //   }}
      />
    </Card>
  );
}
