import React from 'react';
import type { CalendarViewProps } from '../../utils/types';
declare function Component({ size, fontSize, isMultiSelectorView, isRangeSelectorView, monthInView, yearInView, showDualCalendar, onChangeViewingMonth, onChangeViewingYear, selectedDate, selectedRangeStart, view, setView, isSecondary, monthsLabel, weekDaysLabel, selectedMultiDates, lockView, startOfWeek, noPadRangeCell, weekends, isRangeSelectModeOn, onChangeRangeSelectMode, hideAdjacentDates, selectedRangeEnd, newSelectedRangeStart, onChangeNewSelectedRangeEnd, onChangeNewSelectedRangeStart, onPartialRangeSelect, onEachMultiSelect, newSelectedRangeEnd, fixedRange, isFixedRangeView, isDisabled, checkIfWeekend, onChange, weekendMap, isHighlight, }: CalendarViewProps): React.ReactElement<CalendarViewProps>;
export declare const CalendarView: React.MemoExoticComponent<typeof Component>;
export declare function getInitialDateToShow(props: InitialDateParams): Date;
interface InitialDateParams {
    isNormalView: boolean;
    isMultiSelectorView: boolean;
    isRangeSelectorView: boolean;
    viewDate?: Date;
    selectedDate?: Date;
    selectedRangeStart?: Date;
    selectedMultiDates?: Record<string, Date | undefined>;
}
export {};
