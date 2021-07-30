/* eslint-disable no-loop-func */
import type {
  MonthIndices,
  WeekdayIndices,
  MonthCell,
  YearCell,
  DayOfMonthCell,
  GetDaysOfMonthViewMetrixParams,
  CheckIfDateIsDisabledHOFParams,
} from './types';

import { NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP } from './constants';

/**
 * Add number of days to a month.
 */
export function addDays(
  date: Date,
  numberOfDaysToAdd: number,
  options: {
    isDisabled: (arg: Date) => boolean;
    skipDisabledDatesInRange?: boolean;
    upperLimit?: Date;
  },
): { endDate: Date; limitReached: boolean } {
  let daysLeftToAdd = numberOfDaysToAdd;
  let newDate = date;
  let limitReached = false;
  let loopControl = 0;

  while (daysLeftToAdd > 0) {
    if (loopControl === 1500) {
      limitReached = true;
      break;
    }

    const nextCouldBeDate = getNextDate(newDate);

    if (options.upperLimit && isEqual(options.upperLimit, nextCouldBeDate)) {
      limitReached = true;
      break;
    }

    newDate = nextCouldBeDate;

    if (options.skipDisabledDatesInRange) {
      if (options.skipDisabledDatesInRange && !options.isDisabled(nextCouldBeDate)) {
        // if skipping is enabled and date is not disabled then decrement
        daysLeftToAdd--;
      }
    } else {
      // if skipping is disabled then just decrement
      daysLeftToAdd--;
    }
    loopControl++;
  }

  return { endDate: newDate, limitReached };
}

/**
 * Converts a date to string
 */
export function toString(date: Date): string {
  return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
}

/**
 * Returns true if toCheck date is before the date
 */
export function isBefore(date: Date, toCheckDate: Date): boolean {
  if (toCheckDate.getFullYear() < date.getFullYear()) {
    return true;
  }

  if (toCheckDate.getFullYear() === date.getFullYear()) {
    if (toCheckDate.getMonth() < date.getMonth()) {
      return true;
    }

    if (toCheckDate.getMonth() === date.getMonth()) {
      if (toCheckDate.getDate() < date.getDate()) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Returns true if the given date is valid
 */
export function isValid(date: undefined | Date): date is Date {
  return typeof date !== 'undefined' && date !== null && date.getTime && !isNaN(date.getTime());
}

/**
 * Returns true if the given dates are equal
 */
export function isEqual(first: Date, second: Date): boolean {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

/**
 * Returns true if the given date falls inside the range
 */
export function isPartOfRange(rangeStart: Date, rangeEnd: Date, date: Date): boolean {
  // if date lies in between the year
  if (rangeStart.getFullYear() <= date.getFullYear() && date.getFullYear() <= rangeEnd.getFullYear()) {
    // if year is in-between range year start and year end
    if (rangeStart.getFullYear() < date.getFullYear() && date.getFullYear() < rangeEnd.getFullYear()) {
      return true;
    }

    // if start year and end year are same
    if (rangeStart.getFullYear() === rangeEnd.getFullYear()) {
      if (rangeStart.getMonth() <= date.getMonth() && date.getMonth() <= rangeEnd.getMonth()) {
        // if month is in-between month start and and moth end
        if (rangeStart.getMonth() < date.getMonth() && date.getMonth() < rangeEnd.getMonth()) {
          return true;
        }

        // if month start and month end are same
        if (rangeStart.getMonth() === rangeEnd.getMonth()) {
          if (
            rangeStart.getDate() <= date.getDate() &&
            date.getDate() <= rangeEnd.getDate() &&
            date.getMonth() === rangeEnd.getMonth()
          ) {
            return true;
          }
          return false;
        }

        // if date is in start month
        if (rangeStart.getMonth() === date.getMonth()) {
          if (rangeStart.getDate() <= date.getDate()) {
            return true;
          }
          return false;
        }

        // if date is in end month
        if (rangeEnd.getMonth() === date.getMonth()) {
          if (date.getDate() <= rangeEnd.getDate()) {
            return true;
          }
          return false;
        }

        return false;
      }
      return false;
    }

    // if year is same as start year
    if (rangeStart.getFullYear() === date.getFullYear()) {
      // if month is greater than start month
      if (date.getMonth() > rangeStart.getMonth()) {
        return true;
      }

      // if month is same as start month
      if (date.getMonth() === rangeStart.getMonth()) {
        // if date is greater than range start date
        if (date.getDate() >= rangeStart.getDate()) {
          return true;
        }
      }

      return false;
    }

    // if year is same as end year
    if (rangeEnd.getFullYear() === date.getFullYear()) {
      // if month is smaller than end month
      if (date.getMonth() < rangeEnd.getMonth()) {
        return true;
      }

      // if month is same as end month
      if (date.getMonth() === rangeEnd.getMonth()) {
        // if date is smaller than range end date
        if (date.getDate() <= rangeEnd.getDate()) {
          return true;
        }
      }
      return false;
    }

    return false;
  }
  return false;
}

/**
 * Returns true if the given year is a leap year.
 * @param {number} year
 */
export function isALeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Returns the number of days in the given month of the given year.
 * @param {number} year
 * @param {number} month
 */
export function getNumberOfDaysInAMonth(year: number, month: MonthIndices): number {
  const map: Record<MonthIndices, number> = {
    0: 31,
    1: isALeapYear(year) ? 29 : 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31,
  };

  return map[month];
}

function isLastDayOfMonth(date: Date): boolean {
  return getNumberOfDaysInAMonth(date.getFullYear(), date.getMonth() as MonthIndices) === date.getDate();
}

function isFirstDayOfMonth(date: Date): boolean {
  return date.getDate() === 1;
}

function isLastDayOfYear(date: Date): boolean {
  return (date.getMonth() as MonthIndices) === 11 && isLastDayOfMonth(date);
}

function isFirstDayOfYear(date: Date): boolean {
  return (date.getMonth() as MonthIndices) === 0 && date.getDate() === 1;
}

export function getPreviousMonth(month: MonthIndices): MonthIndices {
  return month === 0 ? 11 : ((month - 1) as MonthIndices);
}

export function getNextMonth(month: MonthIndices): MonthIndices {
  return month === 11 ? 0 : ((month + 1) as MonthIndices);
}

export function getPreviousYear(year: number): number {
  return year === 1 ? 1 : year - 1;
}

export function getNextYear(year: number): number {
  return year + 1;
}

export function getNextDate(date: Date): Date {
  if (isLastDayOfYear(date)) {
    return new Date(date.getFullYear() + 1, 0, 1);
  } else if (isLastDayOfMonth(date)) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  } else {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  }
}

export function getPrevDate(date: Date): Date {
  if (isFirstDayOfYear(date)) {
    return new Date(date.getFullYear() - 1, 11, getNumberOfDaysInAMonth(date.getFullYear() - 1, 11));
  } else if (isFirstDayOfMonth(date)) {
    return new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      getNumberOfDaysInAMonth(date.getFullYear(), (date.getMonth() - 1) as MonthIndices),
    );
  } else {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  }
}

export function giveRangeDays(range: [Date, Date]): Date[] {
  if (!Array.isArray(range)) {
    return [];
  }
  const [start, end] = range;
  if (!isValid(start) || !isValid(end)) {
    return [];
  }
  let date = start;
  const dates = [];
  while (isBefore(end, date)) {
    dates.push(date);
    date = getNextDate(date);
  }
  dates.push(end);
  return dates;
}

// WEEKDAY UTILS

/**
 * Creates and return a new weekday index-label map as per the **start**
 * parameter. By default this will return the same weekday index-label map
 * used by the Date object.
 * 0 means Sun - if we follow the native Date convention
 * Now if someone wants to start their week from Mon, then 0 would mean Monday which is different from
 * the convention used by the Date methods.
 * @param startOfTheWeek index of the day to be considered as start of the week
 */
export function getWeekDaysIndexToLabelMapForAStartOfTheWeek(startOfTheWeek = 0): {
  map: Record<WeekdayIndices, string>;
  order: WeekdayIndices[];
} {
  // we break [0,1,2,3,4,5,6] in two parts, startOfTheWeek = 3
  // [startOfTheWeek,4,5,6] and [0,1,2] and join them with their labels
  // this is just to re-order the label in the **correct order**
  // i.e 0 becomes Wed although in native order 0 is Sunday
  const order = Object.keys(NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP)
    .slice(startOfTheWeek, 7)
    .concat(Object.keys(NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP).slice(0, startOfTheWeek)) as unknown as WeekdayIndices[];

  const map = order.reduce((acc, weekdayIndex, index) => {
    // acc[0] = DEFAULT_WEEKDAY_INDEX[3]
    acc[Number(index) as WeekdayIndices] = NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP[Number(weekdayIndex) as WeekdayIndices];
    return acc;
  }, {} as Record<WeekdayIndices, string>);

  return { map, order };
}

/**
 * So if the Date object says that some date has 3 day-of-the-week. No this 3 means Wednesday as per the native index for week days.
 * But if a calendar starts from Monday, then wednesday will not be at 3 but it will be at some other index which is according to a different index-label map.
 * So this method returns that index for wednesday.
 * @param weekdayAsPerNativeIndex day-of-the-week as per the Date object
 * @param startOfTheWeek index of the day to be considered as start of the week
 */
function getInfluencedWeekDayIndexAsPerAStartDay(weekdayAsPerNativeIndex: number, startOfTheWeek = 0): WeekdayIndices {
  return (
    weekdayAsPerNativeIndex >= startOfTheWeek
      ? weekdayAsPerNativeIndex - startOfTheWeek
      : 6 - startOfTheWeek + 1 + weekdayAsPerNativeIndex
  ) as WeekdayIndices;
}

// {
//   0: 'Mo',
//   1: 'Tu',
//   2: 'We',
//   3: 'Th',
//   4: 'Fr',
//   5: 'Sa',
//   6: 'Su'
// };
// start = 1
// 6 - 1 = 5
// influencedIndex = 3 (Thu)
// 3 <= 5 so 3 + 1 = 4 (Thu) (native)
// influencedIndex = 2 (Wed)
// 2 <= 5 so 2 + 1 = 3 (Wed) (native)
// influencedIndex = 5 (Sa)
// 5 <= 5 so 5 + 1 = 6 (Sa) (native)
// influencedIndex = 6 (Su)
// 6 > 5 so ((6 - 5) - 1) = 0 (su) (native)

// {
//   0: 'Tu',
//   1: 'We',
//   2: 'Th',
//   3: 'Fr',
//   4: 'Sa',
//   5: 'Su',
//   6: 'Mo'
// };
// start = 2
// 6 - 2 = 4
// influencedIndex = 3 (Fr)
// 3 <= 4 so 3 + 2 = 5 (Fr) (native)
// influencedIndex = 2 (Th)
// 2 <= 4 so 2 + 2 = 4 (Th) (native)
// influencedIndex = 5 (Su)
// 5 > 4 so ((5 - 4) - 1) = 0 (Su) (native)
// influencedIndex = 6 (Mo)
// 6 > 4 so ((6 - 4) - 1) = 1 (Mo) (native)
function getNativeWeekDayIndexFromAStartDayInfluencedIndex(
  weekdayAsPerChangedIndex: number,
  startOfTheWeek: number,
): WeekdayIndices {
  const diversion = 6 - startOfTheWeek;
  return (
    weekdayAsPerChangedIndex <= diversion
      ? weekdayAsPerChangedIndex + startOfTheWeek
      : weekdayAsPerChangedIndex - diversion - 1
  ) as WeekdayIndices;
}

/**
 * Gives the index of day-of-the-week on the 1st of the provided month-year.
 * @param year Specify a year
 * @param month Specify a month
 * @param startOfTheWeek index of the day to be considered as start of the week
 */
function getInfluencedWeekDayIndexOnFirstDateOfMonth(
  year: number,
  month: number,
  startOfTheWeek: number,
): WeekdayIndices {
  const date = new Date();
  date.setDate(1);
  date.setMonth(month);
  date.setFullYear(year);
  return getInfluencedWeekDayIndexAsPerAStartDay(date.getDay(), startOfTheWeek) as WeekdayIndices;
}

/**
 * Returns info about what indexes are weekend
 * @param startOfTheWeek index of the day to be considered as start of the week
 */
export function getWeekendInfo(startOfTheWeek: number): WeekdayIndices[] {
  if (startOfTheWeek === 0) {
    return [6, 0];
  } else if (startOfTheWeek === 1) {
    return [5, 6];
  } else if (startOfTheWeek === 2) {
    return [4, 5];
  } else if (startOfTheWeek === 3) {
    return [3, 4];
  } else if (startOfTheWeek === 4) {
    return [2, 3];
  } else if (startOfTheWeek === 5) {
    return [1, 2];
  } else {
    return [0, 1];
  }
}

// 1 - 20 (20 years in one range block)
// 21 - 40
// so if you provide 3 then the start of raange for 3 would be
// 1 since it belongs to the 1-20 year range.
export function getStartOfRangeForAYear(year: number): number {
  // last cell will always be a perfect multiple of 20
  // take 2016 as an example
  if (year % 20 === 0) {
    return 20 * (year / 20 - 1) + 1;
  }
  // logic derived from a few examples like 2021, 1981, 1973
  return 20 * Number((year / 20).toFixed(0)) + 1;
}

/**
 * Returns matrix for the month select view.
 * @param selectedMonth
 */
export function getMonthViewMetrix(selectedMonth: Record<number, 1>): Array<MonthCell>[] {
  const months = Array.from({ length: 12 }, (_v, k) => {
    return {
      month: k as MonthIndices,
      isCurrentMonth: new Date().getMonth() === k,
      isSelectedMonth: selectedMonth[k] === 1,
    };
  });
  return [months.slice(0, 3), months.slice(3, 6), months.slice(6, 9), months.slice(9, 12)];
}

export function getPreviousRangeStartingYear(rangeStartYear: number): number {
  if (rangeStartYear === 1) {
    return 1;
  }
  return getStartOfRangeForAYear(rangeStartYear - 1);
}

export function getNextRangeStartingYear(rangeStartYear: number): number {
  return getStartOfRangeForAYear(rangeStartYear + 20);
}

export function getYearRangeLimits(rangeStartYear: number): [number, number] {
  return [rangeStartYear, rangeStartYear + 19];
}

export function getYearsViewMetrix(rangeStartYear: number, selectedYearMap: Record<number, 1>): Array<YearCell>[] {
  const years = Array.from({ length: 20 }, (_v, index) => {
    return {
      year: rangeStartYear + index,
      isCurrentYear: new Date().getFullYear() === rangeStartYear + index,
      isSelectedYear: selectedYearMap[rangeStartYear + index] === 1,
    };
  });
  return [years.slice(0, 5), years.slice(5, 10), years.slice(10, 15), years.slice(15, 20)];
}

export function validateAndReturnDateFormatter(format: string): (date: Date, separator: string) => string | undefined {
  const partsMap: Record<'YYYY' | 'MM' | 'DD', boolean> = { YYYY: true, MM: true, DD: true };
  const parts = format.split('-') as ('YYYY' | 'MM' | 'DD')[];
  if (parts.length !== 3) {
    throw new Error('Date format is invalid.');
  }
  if (!parts.every((part) => partsMap[part])) {
    throw new Error('Date format uses unknown parts.');
  }

  /**
   * Separator to be used when formatting the date string.
   * Default is '-' i.e 'DD-MM-YYYY'
   */
  return (date: Date, separator: string): string | undefined => {
    if (!isValid(date)) {
      return;
    }
    let string = '';
    parts.forEach((part, index) => {
      if (part === 'YYYY') {
        string += date.getFullYear();
      }
      if (part === 'MM') {
        string += date.getMonth();
      }
      if (part === 'DD') {
        string += date.getDate();
      }
      if (index !== 2) {
        string += separator;
      }
    });
    return string;
  };
}

export function checkIfWeekendHOF(weekends: WeekdayIndices[], startDayOfWeek: WeekdayIndices): (date: Date) => boolean {
  const weekendMap = weekends.reduce((acc, curr) => {
    acc[curr] = 1;
    return acc;
  }, {} as Record<WeekdayIndices, 1>);
  return function checkIfWeekend(date: Date) {
    return weekendMap[getInfluencedWeekDayIndexAsPerAStartDay(date.getDay(), startDayOfWeek)] === 1;
  };
}

export function checkIfDateIsDisabledHOF(params: CheckIfDateIsDisabledHOFParams): (date: Date) => boolean {
  const { disablePast, disableToday, disableFuture, customDisabledCheck, maxDate, minDate, applyMax, applyMin } =
    params;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currDate = today.getDate();

  return function checkIfDateIsDisabled(dateToCheck: Date) {
    if (disablePast) {
      if (dateToCheck.getFullYear() < currentYear) {
        return true;
      }

      if (dateToCheck.getFullYear() === currentYear && dateToCheck.getMonth() < currentMonth) {
        return true;
      }

      if (
        dateToCheck.getFullYear() === currentYear &&
        dateToCheck.getMonth() === currentMonth &&
        dateToCheck.getDate() < currDate
      ) {
        return true;
      }
    }
    if (disableToday) {
      if (
        dateToCheck.getFullYear() === currentYear &&
        dateToCheck.getMonth() === currentMonth &&
        dateToCheck.getDate() === currDate
      ) {
        return true;
      }
    }
    if (disableFuture) {
      if (dateToCheck.getFullYear() > currentYear) {
        return true;
      }

      if (dateToCheck.getFullYear() === currentYear && dateToCheck.getMonth() > currentMonth) {
        return true;
      }

      if (
        dateToCheck.getFullYear() === currentYear &&
        dateToCheck.getMonth() === currentMonth &&
        dateToCheck.getDate() > currDate
      ) {
        return true;
      }
    }

    if (applyMax) {
      if (isBefore(dateToCheck, maxDate)) {
        return true;
      }
    }

    if (applyMin) {
      if (isBefore(minDate, dateToCheck)) {
        return true;
      }
    }

    if (typeof customDisabledCheck === 'function') {
      return customDisabledCheck(dateToCheck);
    }

    return false;
  };
}

export function getDaysOfMonthViewMetrix(params: GetDaysOfMonthViewMetrixParams): Array<DayOfMonthCell>[] {
  const {
    isRangeSelectModeOn,
    isRangeView,
    selectedDate,
    selectedRangeStart,
    selectedRangeEnd,
    highlightsMap,
    newSelectedRangeStart,
    newSelectedRangeEnd,
    isSelectMultiDate,
    selectedMultiDates,
    yearInView,
    monthInView,
    startOfTheWeek,
    isDisabled,
    checkIfWeekend,
  } = params;

  const matrix: Array<DayOfMonthCell>[] = [[], [], [], [], [], []];

  const currentMonthDatesStartIndex = getInfluencedWeekDayIndexOnFirstDateOfMonth(
    yearInView,
    monthInView,
    startOfTheWeek,
  );

  const today = new Date();
  const totalDaysInCurrentMonth = getNumberOfDaysInAMonth(yearInView, monthInView);

  const isPrevMonthFromLastYear = monthInView === 0;
  const isCurrentMonthLast = monthInView === 11;

  const totalDaysInPrevMonth = getNumberOfDaysInAMonth(
    isPrevMonthFromLastYear ? getPreviousYear(yearInView) : yearInView,
    getPreviousMonth(monthInView),
  );

  // calendar has 6 rows (0 - 5)
  let row = 0;
  let weekColumn: WeekdayIndices = 0;

  //  31 - (6 - 1) === 26
  const lastMonthDateStartFrom = totalDaysInPrevMonth - (currentMonthDatesStartIndex - 1);

  // first loop to fill cell values of last month
  for (let dayOfMonth = lastMonthDateStartFrom; dayOfMonth <= totalDaysInPrevMonth; dayOfMonth++) {
    if (weekColumn === 7) {
      weekColumn = 0;
      row++;
    }

    matrix[row].push(
      getCellValue({
        currDate: new Date(
          isPrevMonthFromLastYear ? getPreviousYear(yearInView) : yearInView,
          getPreviousMonth(monthInView),
          dayOfMonth,
        ),
        activeMonthInView: false,
        highlightsMap,
        newSelectedRangeEnd,
        newSelectedRangeStart,
        selectedDate,
        selectedRangeEnd,
        selectedRangeStart,
        isDisabled,
        isRangeSelectModeOn,
        isRangeView,
        isSelectMultiDate,
        row,
        weekColumn,
        checkIfWeekend,
        today,
        selectedMultiDates,
        startOfTheWeek,
      }),
    );
    weekColumn++;
  }

  // second loop to fill cell values of current month
  for (let dayOfMonth = 1; dayOfMonth <= totalDaysInCurrentMonth; dayOfMonth++) {
    if (weekColumn === 7) {
      weekColumn = 0;
      row++;
    }

    matrix[row].push(
      getCellValue({
        currDate: new Date(yearInView, monthInView, dayOfMonth),
        activeMonthInView: true,
        highlightsMap,
        newSelectedRangeEnd,
        newSelectedRangeStart,
        selectedDate,
        selectedRangeEnd,
        selectedRangeStart,
        isDisabled,
        isRangeSelectModeOn,
        isRangeView,
        isSelectMultiDate,
        row,
        weekColumn,
        checkIfWeekend,
        today,
        selectedMultiDates,
        startOfTheWeek,
      }),
    );
    weekColumn++;
  }

  let dayOfMonth = 1;
  // last loop to fill cell values of next month

  while (matrix[5].length < 7) {
    if (weekColumn === 7) {
      weekColumn = 0;
      row++;
    }
    matrix[row].push(
      getCellValue({
        currDate: new Date(isCurrentMonthLast ? yearInView + 1 : yearInView, getNextMonth(monthInView), dayOfMonth),
        activeMonthInView: false,
        highlightsMap,
        newSelectedRangeEnd,
        newSelectedRangeStart,
        selectedDate,
        selectedRangeEnd,
        selectedRangeStart,
        isDisabled,
        isRangeSelectModeOn,
        isRangeView,
        isSelectMultiDate,
        row,
        weekColumn,
        checkIfWeekend,
        today,
        selectedMultiDates,
        startOfTheWeek,
      }),
    );
    weekColumn++;
    dayOfMonth++;
  }

  return matrix;
}

interface GetCellValueParams
  extends Pick<
    GetDaysOfMonthViewMetrixParams,
    | 'highlightsMap'
    | 'isRangeView'
    | 'isRangeSelectModeOn'
    | 'newSelectedRangeStart'
    | 'newSelectedRangeEnd'
    | 'selectedRangeStart'
    | 'selectedRangeEnd'
    | 'isSelectMultiDate'
    | 'isDisabled'
    | 'selectedDate'
    | 'selectedMultiDates'
    | 'checkIfWeekend'
    | 'startOfTheWeek'
  > {
  currDate: Date;
  today: Date;
  activeMonthInView: boolean;
  row: number;
  weekColumn: number;
}

function getCellValue({
  currDate,
  activeMonthInView,
  highlightsMap,
  newSelectedRangeEnd,
  newSelectedRangeStart,
  selectedDate,
  selectedRangeEnd,
  selectedRangeStart,
  isDisabled,
  isRangeSelectModeOn,
  isRangeView,
  isSelectMultiDate,
  row,
  weekColumn,
  checkIfWeekend,
  today,
  selectedMultiDates,
  startOfTheWeek,
}: GetCellValueParams) {
  return {
    date: currDate,
    dayOfMonth: currDate.getDate(),
    month: currDate.getMonth() as MonthIndices,
    activeMonthInView,
    isHighlight: highlightsMap[toString(currDate)] === 1,
    isInRange: isRangeView
      ? isRangeSelectModeOn
        ? isValid(newSelectedRangeStart) && isValid(newSelectedRangeEnd)
          ? isBefore(newSelectedRangeEnd, newSelectedRangeStart)
            ? isPartOfRange(newSelectedRangeStart, newSelectedRangeEnd, currDate)
            : isPartOfRange(newSelectedRangeEnd, newSelectedRangeStart, currDate)
          : false
        : !!selectedRangeStart && !!selectedRangeEnd && isPartOfRange(selectedRangeStart, selectedRangeEnd, currDate)
      : false,
    isRangeStart: isRangeView
      ? isRangeSelectModeOn
        ? isValid(newSelectedRangeStart)
          ? isEqual(newSelectedRangeStart, currDate)
          : false
        : !!selectedRangeStart && isEqual(selectedRangeStart, currDate)
      : false,
    isRangeEnd: isRangeView
      ? isRangeSelectModeOn
        ? false
        : !!selectedRangeEnd && isEqual(selectedRangeEnd, currDate)
      : false,
    year: currDate.getFullYear(),
    dayOfWeek: getNativeWeekDayIndexFromAStartDayInfluencedIndex(weekColumn, startOfTheWeek),
    isWeekend: checkIfWeekend(currDate),
    isToday: isEqual(currDate, today),
    isFirstRow: row === 0,
    isLastRow: row === 5,
    isFirsColumn: weekColumn === 0,
    isLastColumn: weekColumn === 6,
    isSelected: isSelectMultiDate
      ? !!selectedMultiDates[toString(currDate)]
      : isRangeView
      ? false
      : selectedDate
      ? currDate.getMonth() === selectedDate.getMonth() &&
        currDate.getFullYear() === selectedDate.getFullYear() &&
        currDate.getDate() === selectedDate.getDate()
      : false,
    isDisabled: isDisabled(currDate),
  };
}
