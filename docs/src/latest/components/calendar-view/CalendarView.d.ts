import React from 'react';
import type { CalendarViewProps } from '../../utils/types';
declare function Component({ size, fontSize, isNormalView, isMultiSelectorView, isRangeSelectorView, viewDate, selectedDate, selectedRangeStart, selectedMultiDates, minAllowedDate, maxAllowedDate, today, isSecondary, lockView, startOfWeek, weekends, isRangeSelectModeOn, onChangeRangeSelectMode, skipDisabledDatesInRange, hideAdjacentDates, allowFewerDatesThanRange, selectedRangeEnd, newSelectedRangeStart, onChangenNewSelectedRangeEnd, onChangenNewSelectedRangeStart, onPartialRangeSelect, onEachMultiSelect, newSelectedRangeEnd, fixedRange, isFixedRangeView, isDisabled, checkIfWeekend, onChange, disableFuture, weekendMap, disablePast, highlightsMap, disableToday, }: CalendarViewProps): React.ReactElement<CalendarViewProps>;
export declare const CalendarView: React.MemoExoticComponent<typeof Component>;
export {};
