import dayjs, { Dayjs } from "dayjs";

import { isHoliday } from "./getHolidays";

export const getHolidays = (
  date: Date,
  model: "month" | "year" | "day" | "week" = "month"
) => isHoliday(dayjs(date), model);

/**
 * Determines if a given date falls on a weekend.
 *
 * @param {Dayjs} date - The date to check.
 * @return {boolean} Returns true if the date is on a weekend, false otherwise.
 */
export const isWeekend = (date: Dayjs): boolean => {
  const day = date.day();
  return day === 0 || day === 6;
};

/**
 * Checks if a given date is a business day.
 *
 * @param {Dayjs} date - The date to check.
 * @return {boolean} Returns true if the date is a business day, false otherwise.
 */
export const isBusinessDay = (date: Dayjs): boolean => {
  return (
    !isHoliday(date, "day").length && !isWeekend(date) && dayjs(date).isValid()
  );
};

/**
 * Adds a specified number of business days to a given date.
 *
 * @param {Dayjs} date - The original date.
 * @param {number} number - The number of business days to add. A negative number can be used to subtract business days.
 * @return {Dayjs} - The date after adding the specified number of business days.
 */
export const businessDaysAdd = (date: Dayjs, number: number): Dayjs => {
  const numericDirection = number < 0 ? -1 : 1;
  let currentDay = date.clone();
  let daysRemaining = Math.abs(number);

  while (daysRemaining > 0) {
    currentDay = currentDay.add(numericDirection, "d");

    if (isBusinessDay(currentDay)) daysRemaining -= 1;
  }
  return currentDay;
};

/**
 * Subtracts a specified number of business days from a given date.
 *
 * @param {Dayjs} date - The original date.
 * @param {number} number - The number of business days to subtract.
 * @return {Dayjs} - The resulting date after subtracting the specified number of business days.
 */
export const businessDaysSubtract = (date: Dayjs, number: number): Dayjs => {
  let currentDay = date.clone();

  currentDay = businessDaysAdd(currentDay, number * -1);

  return currentDay;
};

/**
 * Calculates the difference in business hours between two given dates.
 *
 * @param {Dayjs | string} started - The starting date.
 * @param {Dayjs | string} finished - The ending date.
 * @return {number} The number of business hours between the two dates.
 */
export const businessDiffHours = (
  started: Dayjs | string,
  finished: Dayjs | string
): number => {
  const day1 = dayjs(started).clone();
  const day2 = dayjs(finished).clone();

  const isPositiveDiff = day1 >= day2;
  let start = isPositiveDiff ? day2 : day1;
  const end = isPositiveDiff ? day1 : day2;

  let hoursBetween = 0;

  const isSame = start.isSame(end);

  if (isSame) return hoursBetween;

  while (start < end) {
    if (isBusinessDay(start)) {
      hoursBetween += 1;
    }

    start = start.add(1, "h");
  }

  return isPositiveDiff ? hoursBetween : -hoursBetween;
};

interface BusinessHours {
  hours: number;
  message: string;
}

/**
 * Calculates the number of business days between a start date and an end date.
 *
 * @param {Date | undefined} startDate - The start date of the period.
 * @param {Date | undefined} endDate - The end date of the period.
 * @return {BusinessHours | undefined} An object containing the number of hours and a message describing the number of days and hours.
 */
export const numberOfBusinessDays = (
  startDate: Date | undefined,
  endDate: Date | undefined
): BusinessHours | undefined => {
  if (startDate && endDate) {
    const fullHours = businessDiffHours(dayjs(endDate), dayjs(startDate));
    const hours = fullHours % 24;
    const days = Math.floor(fullHours / 24);

    if (days === 0) {
      return {
        hours: fullHours,
        message: `${hours} horas`,
      };
    }

    return {
      hours: fullHours,
      message: hours === 0 ? `${days} dias` : `${days} dias e ${hours} horas`,
    };
  }
  return undefined;
};
