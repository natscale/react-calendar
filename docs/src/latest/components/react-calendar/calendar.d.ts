import React, { CSSProperties } from 'react';
import type { WeekdayIndices } from './types';
import { giveRangeDays } from './utils/date-utils';
import './calendar.css';
export declare type Value = Date | Date[] | [Date, Date];
interface Props {
    /**
     * Dark mode
     */
    useDarkMode?: boolean;
    /**
     * Custom classname
     */
    className?: string;
    /**
     * Width & Height of the calendar.
     * Default is 276
     */
    size?: number;
    /**
     * Base font-size of calendar.
     * Default is 16
     */
    fontSize?: number;
    /**
     * The initial month and year that will be shown to the user.
     * By default it shows today's date month and year. If a date is selected it shows the selected
     * date's month and year.
     */
    initialViewDate?: Date;
    /**
     * User can not change month/year
     */
    lockView?: boolean;
    /**
     * Value of a single date or an array of dates in ISO format.
     * Only applicable if selectRange is false
     */
    value?: Value;
    /**
     * Renders a multiple dates selector view
     */
    isMultiSelector?: boolean;
    /**
     * Renders a range selector UI for the calendar
     */
    isRangeSelector?: boolean;
    /**
     * Skip disabled dates when doing fixed range selection
     */
    skipDisabledDatesInRange?: boolean;
    /**
     * Skip weekends
     */
    skipWeekendsInRange?: boolean;
    /**
     * Skip disabled dates when doing fixed range selection
     */
    allowFewerDatesThanRange?: boolean;
    /**
     * Always select n number of days starting from the user's selected date
     */
    fixedRange?: number;
    /**
     * Array of weekday number that are part of weekend.
     * The weekday number depends on the start of the week if provided one.
     * By default this is [6, 0] which Saturday, Sunday respectively as per the 0 based start of the week.
     */
    weekends?: WeekdayIndices[];
    /**
     * By default the calendar starts from Sun which is represented in JS as 0 index.
     * You can provide the index for any other day that you want as start of the week.
     */
    startOfWeek?: WeekdayIndices;
    /**
     * A boolean flag to disable all past dates.
     */
    disablePast?: boolean;
    /**
     * A boolean flag to disable today's date.
     */
    disableToday?: boolean;
    /**
     * A boolean flag to disable all future dates.
     */
    disableFuture?: boolean;
    /**
     * A callback function that can be used to disable specific dates on the calendar.
     */
    isDisabled?: (date: Date) => boolean;
    /**
     * User will not be able to select past this date. This date will be selectable.
     */
    maxAllowedDate?: Date;
    /**
     * User will not be able to select before this date. This date will be selectable.
     */
    minAllowedDate?: Date;
    /**
     * These dates will be highlighted
     */
    highlights?: Date[];
    /**
     * OnChange callback functionn.
     */
    onChange?: (value: Value) => any | Promise<any> | void;
}
declare function Calendar({ value, isMultiSelector, className, isRangeSelector, useDarkMode, weekends, highlights, skipWeekendsInRange, initialViewDate, allowFewerDatesThanRange, startOfWeek, maxAllowedDate, skipDisabledDatesInRange, minAllowedDate, fixedRange, isDisabled, onChange, lockView, disableFuture, size, fontSize, disablePast, disableToday, }: Props): React.ReactElement<Props>;
export default Calendar;
export declare const giveDaysInRange: typeof giveRangeDays;
/**
 * A combination of YYYY-MM-DD.
 * Eg. MM-DD-YYYY, DD-MM-YYYY etc.
 * Default is '-' i.e 'DD-MM-YYYY'
 */
export declare const giveFormatter: (format: string) => (date: Date, separator: string) => string | undefined;
export interface CSSProps {
    root: {
        arc: CSSProperties;
        arc_view: CSSProperties;
        arc_header: CSSProperties;
        'arc_view-months': CSSProperties;
        'arc_view-years': CSSProperties;
    };
    weekdaysRow: {
        arc_view_weekdays: CSSProperties;
        arc_view_weekdays_cell: CSSProperties;
        arc_view_weekdays_cell_value: CSSProperties;
    };
    dayOfMonth: {
        'arc_view-days-of-month': CSSProperties;
        arc_view_row: CSSProperties;
        arc_view_cell: CSSProperties;
        arc_view_cell_value: CSSProperties;
        arc_view_cell_value_button: CSSProperties;
    };
    months: {
        arc_view_row: CSSProperties;
        arc_view_cell: CSSProperties;
        arc_view_cell_value_button: CSSProperties;
    };
    years: {
        arc_view_row: CSSProperties;
        arc_view_cell: CSSProperties;
        arc_view_cell_value_button: CSSProperties;
    };
    header: {
        arc_header_nav: CSSProperties;
        arch_header_label: CSSProperties;
    };
}
