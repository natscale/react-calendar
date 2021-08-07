import type { MonthIndices, WeekdayIndices, MonthCell, YearCell, DayOfMonthCell, GetDaysOfMonthViewMetrixParams, CheckIfDateIsDisabledHOFParams } from './types';
/**
 * Add number of days to a month.
 */
export declare function addDays(date: Date, numberOfDaysToAdd: number, options: {
    isDisabled: (arg: Date) => boolean;
    skipDisabledDatesInRange?: boolean;
    upperLimit?: Date;
}): {
    endDate: Date;
    limitReached: boolean;
};
/**
 * Converts a date to string
 */
export declare function toString(date: Date): string;
/**
 * MAkes a date from a string
 */
export declare function fromString(date: string): Date;
/**
 * Returns true if toCheck date is before the date
 */
export declare function isBefore(date: Date, toCheckDate: Date): boolean;
/**
 * Returns true if the given date is valid
 */
export declare function isValid(date: undefined | Date): date is Date;
/**
 * Returns true if the given dates are equal
 */
export declare function isEqual(first: Date, second: Date): boolean;
/**
 * Returns true if the given date falls inside the range
 */
export declare function isPartOfRange(rangeStart: Date, rangeEnd: Date, date: Date): boolean;
/**
 * Returns true if the given year is a leap year.
 * @param {number} year
 */
export declare function isALeapYear(year: number): boolean;
/**
 * Returns the number of days in the given month of the given year.
 * @param {number} year
 * @param {number} month
 */
export declare function getNumberOfDaysInAMonth(year: number, month: MonthIndices): number;
export declare function getPreviousMonth(month: MonthIndices): MonthIndices;
export declare function getNextMonth(month: MonthIndices): MonthIndices;
export declare function getPreviousYear(year: number): number;
export declare function getNextYear(year: number): number;
export declare function getNextDate(date: Date): Date;
export declare function getPrevDate(date: Date): Date;
export declare function giveRangeDays(range: [Date, Date]): Date[];
/**
 * Creates and return a new weekday index-label map as per the **start**
 * parameter. By default this will return the same weekday index-label map
 * used by the Date object.
 * 0 means Sun - if we follow the native Date convention
 * Now if someone wants to start their week from Mon, then 0 would mean Monday which is different from
 * the convention used by the Date methods.
 * @param startOfTheWeek index of the day to be considered as start of the week
 */
export declare function getWeekDaysIndexToLabelMapForAStartOfTheWeek(startOfTheWeek?: number): {
    map: Record<WeekdayIndices, string>;
    order: WeekdayIndices[];
};
/**
 * Returns info about what indexes are weekend
 * @param startOfTheWeek index of the day to be considered as start of the week
 */
export declare function getWeekendInfo(startOfTheWeek: WeekdayIndices): WeekdayIndices[];
export declare function getStartOfRangeForAYear(year: number): number;
/**
 * Returns matrix for the month select view.
 * @param selectedMonth
 */
export declare function getMonthViewMetrix(selectedMonth: Record<number, 1>): Array<MonthCell>[];
export declare function getPreviousRangeStartingYear(rangeStartYear: number): number;
export declare function getNextRangeStartingYear(rangeStartYear: number): number;
export declare function getYearRangeLimits(rangeStartYear: number): [number, number];
export declare function getYearsViewMetrix(rangeStartYear: number, selectedYearMap: Record<number, 1>): Array<YearCell>[];
export declare function validateAndReturnDateFormatter(format: string): (date: Date, separator: string) => string | undefined;
export declare function checkIfWeekendHOF(weekends: WeekdayIndices[], startDayOfWeek: WeekdayIndices): (date: Date) => boolean;
export declare function checkIfDateIsDisabledHOF(params: CheckIfDateIsDisabledHOFParams): (date: Date) => boolean;
export declare function getDaysOfMonthViewMetrix(params: GetDaysOfMonthViewMetrixParams): Array<DayOfMonthCell>[];
