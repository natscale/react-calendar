import React from 'react';
import type { CalendarProps } from './types';
import { giveRangeDays } from './utils/date-utils';
declare function Calendar({ value, isMultiSelector, className, isRangeSelector, useDarkMode, weekends, highlights, skipWeekendsInRange, initialViewDate, allowFewerDatesThanRange, startOfWeek, maxAllowedDate, skipDisabledDatesInRange, minAllowedDate, fixedRange, isDisabled, onChange, lockView, disableFuture, size, fontSize, disablePast, disableToday, }: CalendarProps): React.ReactElement<CalendarProps>;
export default Calendar;
export declare const giveDaysInRange: typeof giveRangeDays;
/**
 * A combination of YYYY-MM-DD.
 * Eg. MM-DD-YYYY, DD-MM-YYYY etc.
 * Default is '-' i.e 'DD-MM-YYYY'
 */
export declare const giveFormatter: (format: string) => (date: Date, separator: string) => string | undefined;
export * from './types';
