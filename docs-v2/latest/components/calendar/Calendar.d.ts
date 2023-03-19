import React from 'react';
import type { CalendarProps, CalendarRef } from '../../utils/types';
import { giveRangeDays } from '../../utils/date-utils';
import './styles.css';
export declare const DEFAULT_SIZE = 276;
declare const Calendar: React.ForwardRefExoticComponent<CalendarProps & React.RefAttributes<CalendarRef>>;
export default Calendar;
export declare const giveDaysInRange: typeof giveRangeDays;
/**
 * A combination of YYYY-MM-DD.
 * Eg. MM-DD-YYYY, DD-MM-YYYY etc.
 * Default is '-' i.e 'DD-MM-YYYY'
 */
export declare const giveFormatter: (format: string) => (date: Date, separator: string) => string | undefined;
export * from '../../utils/types';
