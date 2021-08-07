import React from 'react';
import type { DayOfMonthSelectorProps } from '../../utils/types';
declare function DayOfMonthSelectorComponent({ selectedDate, selectedRangeStart, selectedRangeEnd, newSelectedRangeStart, startOfWeek: weekStartIndex, newSelectedRangeEnd, isRangeSelectorView, skipDisabledDatesInRange, onChangeRangeSelectMode: setIsRangeSelectModeOn, fixedRange: fixedRangeLength, isFixedRangeView, isRangeSelectModeOn, isDisabled, selectedMultiDates, isMultiSelectorView, today, monthInView: viewingMonth, hideAdjacentDates, onChangenNewSelectedRangeEnd, onChangenNewSelectedRangeStart, weekends: weekendIndices, onChange, yearInView: viewingYear, allowFewerDatesThanRange, disableFuture, disablePast, lockView, checkIfWeekend, onPartialRangeSelect, onEachMultiSelect, highlightsMap, disableToday, }: DayOfMonthSelectorProps): JSX.Element;
export declare const DayOfMonthSelector: React.MemoExoticComponent<typeof DayOfMonthSelectorComponent>;
export {};
