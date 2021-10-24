import React, { memo, useCallback, useMemo } from 'react';

import type { DayOfMonthCell, DayOfMonthSelectorProps } from '../../utils/types';

import { addDays, getDaysOfMonthViewMetrix, getNextDate, isBefore, toString } from '../../utils/date-utils';
import { DayOfMonth } from '../day-of-month-cell/DayOfMonthCell';

const dayOfMonthStyles = {
  'rc_body-days-of-month': {
    height: '85%',
  },
  'rc_body-row': {
    height: '16.664%',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  'rc_body-cell': {
    flexBasis: '14.286%',
    maxWidth: '14.286%',
    height: '100%',
    display: 'flex',
    aligntems: 'center',
  },
};

function DayOfMonthSelectorComponent({
  selectedDate,
  selectedRangeStart,
  selectedRangeEnd,
  newSelectedRangeStart,
  startOfWeek: weekStartIndex,
  newSelectedRangeEnd,
  isRangeSelectorView,
  skipDisabledDatesInRange,
  onChangeRangeSelectMode: setIsRangeSelectModeOn,
  fixedRange: fixedRangeLength,
  isFixedRangeView,
  isRangeSelectModeOn,
  isDisabled,
  selectedMultiDates,
  isMultiSelectorView,
  monthInView: viewingMonth,
  hideAdjacentDates,
  onChangeNewSelectedRangeEnd,
  onChangeNewSelectedRangeStart,
  weekends: weekendIndices,
  onChange,
  yearInView: viewingYear,
  allowFewerDatesThanRange,
  noPadRangeCell,
  disableFuture,
  disablePast,
  lockView,
  checkIfWeekend,
  onPartialRangeSelect,
  isHighlight,
  onEachMultiSelect,
  disableToday,
}: DayOfMonthSelectorProps) {
  const daysOfMMonthViewMatrix = useMemo(() => {
    return getDaysOfMonthViewMetrix({
      selectedDate: selectedDate,
      selectedRangeStart: selectedRangeStart,
      selectedRangeEnd: selectedRangeEnd,
      newSelectedRangeStart: newSelectedRangeStart,
      newSelectedRangeEnd: newSelectedRangeEnd,
      checkIfWeekend,
      isRangeView: isRangeSelectorView || isFixedRangeView,
      isRangeSelectModeOn,
      weekendIndexes: weekendIndices,
      selectedMultiDates,
      isSelectMultiDate: isMultiSelectorView,
      yearInView: viewingYear,
      monthInView: viewingMonth,
      startOfTheWeek: weekStartIndex,
      disableFuture,
      disablePast,
      isHighlight,
      disableToday,
      isDisabled,
    });
  }, [
    selectedDate,
    isHighlight,
    selectedRangeStart,
    selectedRangeEnd,
    newSelectedRangeStart,
    newSelectedRangeEnd,
    isRangeSelectorView,
    isFixedRangeView,
    isRangeSelectModeOn,
    checkIfWeekend,
    weekendIndices,
    selectedMultiDates,
    isMultiSelectorView,
    viewingYear,
    viewingMonth,
    weekStartIndex,
    disableFuture,
    disablePast,
    disableToday,
    isDisabled,
  ]);

  const onDateClicked = useCallback(
    (cell: DayOfMonthCell) => {
      const clickedDate = cell.date;

      const cantSelectAsItsLocked = lockView && clickedDate.getMonth() !== viewingMonth;

      if (cantSelectAsItsLocked) {
        return;
      }

      if (isRangeSelectorView && !isFixedRangeView) {
        if (isRangeSelectModeOn && newSelectedRangeStart) {
          // check if it is the first click or seconds

          const previouslySelectedDate = new Date(
            newSelectedRangeStart.getFullYear(),
            newSelectedRangeStart.getMonth(),
            newSelectedRangeStart.getDate(),
          );

          if (isBefore(previouslySelectedDate, clickedDate)) {
            const startDate = clickedDate;

            const endDate = previouslySelectedDate;

            if (typeof onChange === 'function') {
              onChange([startDate, endDate]);
            }
          } else {
            const startDate = previouslySelectedDate;

            const endDate = clickedDate;

            if (typeof onChange === 'function') {
              onChange([startDate, endDate]);
            }
          }

          onChangeNewSelectedRangeEnd(undefined);
          setIsRangeSelectModeOn(false);
        } else {
          // select first date
          onChangeNewSelectedRangeStart(clickedDate);

          onChangeNewSelectedRangeEnd(undefined);

          setIsRangeSelectModeOn(true);
          onPartialRangeSelect && onPartialRangeSelect(clickedDate);
        }
      } else if (isRangeSelectorView && isFixedRangeView) {
        const { endDate, limitReached } = addDays(clickedDate, fixedRangeLength, {
          isDisabled,
          skipDisabledDatesInRange,
          upperLimit: lockView
            ? new Date(clickedDate.getFullYear(), clickedDate.getMonth() + 1, 1)
            : disableFuture
            ? getNextDate(new Date())
            : undefined,
        });

        if (limitReached && !allowFewerDatesThanRange) {
          //
        } else {
          if (typeof onChange === 'function') {
            onChange([clickedDate, endDate]);
          }
        }
      } else if (isMultiSelectorView) {
        const stringkey = toString(clickedDate);
        const newselectedMultiDates = { ...selectedMultiDates };

        if (!!selectedMultiDates[stringkey]) {
          newselectedMultiDates[stringkey] = undefined;
        } else {
          newselectedMultiDates[stringkey] = clickedDate;
        }

        onEachMultiSelect && onEachMultiSelect(clickedDate);
        onChange &&
          onChange(
            Object.keys(newselectedMultiDates)
              .filter((dk) => !!newselectedMultiDates[dk])
              .map((dk) => newselectedMultiDates[dk] as Date),
          );
      } else {
        if (typeof onChange === 'function') {
          onChange(clickedDate);
        }
      }
    },
    [
      lockView,
      viewingMonth,
      isRangeSelectorView,
      isFixedRangeView,
      isMultiSelectorView,
      isRangeSelectModeOn,
      newSelectedRangeStart,
      onChangeNewSelectedRangeEnd,
      setIsRangeSelectModeOn,
      onChange,
      onChangeNewSelectedRangeStart,
      onPartialRangeSelect,
      fixedRangeLength,
      isDisabled,
      skipDisabledDatesInRange,
      disableFuture,
      allowFewerDatesThanRange,
      selectedMultiDates,
      onEachMultiSelect,
    ],
  );

  return (
    <div style={dayOfMonthStyles['rc_body-days-of-month']} className="rc_body-days-of-month" role="grid">
      {daysOfMMonthViewMatrix.map((row, index) => (
        <div style={dayOfMonthStyles['rc_body-row']} className="rc_body-row" key={index}>
          {row.map((cell) => (
            <div
              style={dayOfMonthStyles['rc_body-cell']}
              onMouseEnter={() => {
                if (isRangeSelectorView) {
                  if (isRangeSelectModeOn) {
                    onChangeNewSelectedRangeEnd(new Date(cell.year, cell.month, cell.dayOfMonth));
                  }
                }
              }}
              key={toString(cell.date)}
              className={`rc_body-cell${cell.activeMonthInView ? ' rc_active' : ''}${cell.isWeekend ? ' rc_wknd' : ''}${
                cell.isToday ? ' rc_today' : ''
              }${cell.isFirstRow ? ' rc_fr' : ''}${cell.isToday ? ' rc_today' : ''}${
                cell.isHighlight ? ' rc_highlight' : ''
              }${cell.isLastRow ? ' rc_lr' : ''}${cell.isFirsColumn ? ' rc_fc' : ''}${
                cell.isLastColumn ? ' rc_lc' : ''
              }${cell.isSelected && !isRangeSelectorView ? ' rc_selected' : ''}${
                cell.isDisabled ? ' rc_disabled' : ''
              }${cell.isInRange ? ' rc_in_range' : ''}${cell.isRangeStart ? ' rc_range_start' : ''}${
                cell.isRangeEnd ? ' rc_range_end' : ''
              }${isRangeSelectModeOn ? ' rc_range_mode' : ''}`}
            >
              {!cell.activeMonthInView && hideAdjacentDates ? null : (
                <DayOfMonth noPadRangeCell={noPadRangeCell} cell={cell} onDateClicked={onDateClicked} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export const DayOfMonthSelector = memo(DayOfMonthSelectorComponent);
