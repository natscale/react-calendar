import React from 'react';
import type { DayOfMonthSelectorProps } from '../../utils/types';
declare function DayOfMonthSelectorComponent({ selectedDate, selectedRangeStart, selectedRangeEnd, newSelectedRangeStart, startOfWeek: weekStartIndex, newSelectedRangeEnd, isRangeSelectorView, onChangeRangeSelectMode: setIsRangeSelectModeOn, fixedRange: fixedRangeLength, isFixedRangeView, isRangeSelectModeOn, isDisabled, selectedMultiDates, isMultiSelectorView, monthInView: viewingMonth, hideAdjacentDates, onChangeNewSelectedRangeEnd, onChangeNewSelectedRangeStart, weekends: weekendIndices, onChange, yearInView: viewingYear, noPadRangeCell, lockView, checkIfWeekend, onPartialRangeSelect, isHighlight, onEachMultiSelect, }: DayOfMonthSelectorProps): JSX.Element;
export declare const DayOfMonthSelector: React.MemoExoticComponent<typeof DayOfMonthSelectorComponent>;
export {};
