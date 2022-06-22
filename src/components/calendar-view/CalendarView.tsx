/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { MonthIndices, CSSProps, CalendarViewProps } from '../../utils/types';

import {
  getStartOfRangeForAYear,
  getPreviousYear,
  getPreviousMonth,
  getPreviousRangeStartingYear,
  getNextYear,
  getNextMonth,
  getNextRangeStartingYear,
  getYearRangeLimits,
  isValid,
} from '../../utils/date-utils';

import { Header } from '../header/Header';
import { MonthSelector } from '../month-selector/MonthSelector';
import { YearSelector } from '../year-selector/YearSelector';
import { WeekDaysRow } from '../week-days-row/WeekDaysRow';
import { DayOfMonthSelector } from '../day-of-month-selector/DayOfMonthSelector';

const bodyStyles = { height: '88%', width: '100%' };

const getStyles: (size: number, fontSize: number) => CSSProps = (size, fontSize) => ({
  root: {
    rc: {
      width: `${size!}px`,
      height: `${size!}px`,
      fontSize: `${fontSize}px`,
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      boxSizing: 'border-box',
    },
  },
});

function Component({
  size,
  fontSize,
  isMultiSelectorView,
  isRangeSelectorView,
  monthInView,
  yearInView,
  showDualCalendar,
  onChangeViewingMonth,
  onChangeViewingYear,
  selectedDate,
  selectedRangeStart,
  view,
  setView,
  isSecondary,
  monthsLabel,
  weekDaysLabel,
  selectedMultiDates,
  lockView,
  startOfWeek,
  noPadRangeCell,
  weekends,
  isRangeSelectModeOn,
  onChangeRangeSelectMode,
  hideAdjacentDates,
  selectedRangeEnd,
  newSelectedRangeStart,
  onChangeNewSelectedRangeEnd,
  onChangeNewSelectedRangeStart,
  onPartialRangeSelect,
  onEachMultiSelect,
  newSelectedRangeEnd,
  fixedRange,
  isFixedRangeView,
  isDisabled,
  checkIfWeekend,
  onChange,
  weekendMap,
  isHighlight,
}: CalendarViewProps): React.ReactElement<CalendarViewProps> {
  const styles = useMemo(() => getStyles(size, fontSize), [size, fontSize]);

  // updating view when selected date change
  useEffect(() => {
    if (isValid(selectedDate)) {
      onChangeViewingMonth(selectedDate.getMonth() as MonthIndices);
      onChangeViewingYear(selectedDate.getFullYear());
    }
  }, [isSecondary, onChangeViewingMonth, onChangeViewingYear, selectedDate]);

  // updating view only when first multi is selected
  useEffect(() => {
    const dates = Object.keys(selectedMultiDates)
      .map((str) => selectedMultiDates[str])
      .filter((d) => isValid(d));

    if (dates.length === 1 && dates[0]) {
      onChangeViewingMonth(dates[0].getMonth() as MonthIndices);
      onChangeViewingYear(dates[0].getFullYear());
    }
  }, [isSecondary, onChangeViewingMonth, onChangeViewingYear, selectedMultiDates]);

  const [startingYearForCurrRange, setStartingYearForCurrRange] = useState(getStartOfRangeForAYear(yearInView));

  useEffect(() => {
    setStartingYearForCurrRange(getStartOfRangeForAYear(yearInView));
  }, [yearInView, setStartingYearForCurrRange]);

  // 1 - 20, 21 - 40
  const [yearMatrixRangeStart, yearMatrixRangeEnd] = useMemo(() => {
    return getYearRangeLimits(startingYearForCurrRange);
  }, [startingYearForCurrRange]);

  // callback handlers
  const onPrevClick = useCallback(() => {
    if (view === 'month_dates') {
      const isPrevMonthFromLastYear = monthInView === 0;
      if (isPrevMonthFromLastYear) {
        onChangeViewingYear(getPreviousYear(yearInView));
      }
      onChangeViewingMonth(getPreviousMonth(monthInView));
    }
    if (view === 'years') {
      setStartingYearForCurrRange(getPreviousRangeStartingYear(startingYearForCurrRange));
    }
    if (view === 'months') {
      onChangeViewingYear(yearInView !== 1 ? yearInView - 1 : 1);
    }
  }, [view, monthInView, onChangeViewingMonth, onChangeViewingYear, yearInView, startingYearForCurrRange]);

  const onNextClick = useCallback(() => {
    if (view === 'month_dates') {
      if (isSecondary) {
        const isSecMonthFirst = monthInView === 0;
        if (isSecMonthFirst) {
          onChangeViewingYear(yearInView);
        }
        onChangeViewingMonth(monthInView);
      } else {
        const isCurrentMonthLast = monthInView === 11;
        if (isCurrentMonthLast) {
          onChangeViewingYear(getNextYear(yearInView));
        }
        onChangeViewingMonth(getNextMonth(monthInView));
      }
    }
    if (view === 'years') {
      setStartingYearForCurrRange(getNextRangeStartingYear(startingYearForCurrRange));
    }
    if (view === 'months') {
      onChangeViewingYear(getNextYear(yearInView));
    }
  }, [view, isSecondary, monthInView, onChangeViewingMonth, onChangeViewingYear, yearInView, startingYearForCurrRange]);

  const calendarRef = useRef<HTMLDivElement | null>(null);
  const cells = useRef<HTMLButtonElement[]>([]);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (!hasFocus) {
      return;
    }

    const currentCalendarRef = calendarRef.current;

    if (!currentCalendarRef) {
      return;
    }

    cells.current = currentCalendarRef
      ? Array.from(currentCalendarRef.querySelectorAll('[role="grid"] button:not([disabled])'))
      : [];

    const firstCell = cells.current[0];
    const lastCell = cells.current[cells.current.length - 1];
    const seletedItemIfAny: HTMLButtonElement | null =
      currentCalendarRef.querySelector('[role="grid"] .rc_selected button') ||
      currentCalendarRef.querySelector('[role="grid"] .rc_range_end button') ||
      currentCalendarRef.querySelector('[role="grid"] .rc_range_start button');

    const firstActiveItem: HTMLButtonElement | null = currentCalendarRef.querySelector(
      '[role="grid"] .rc_active button',
    );

    const header: HTMLElement | null = currentCalendarRef.querySelector('.rc_header');

    if (!header) {
      return;
    }

    const prevButton: HTMLButtonElement | null = header.querySelector('.rc_header_nav-prev');
    const nextButton: HTMLButtonElement | null = header.querySelector('.rc_header_nav-next');
    const monthYearSelector: HTMLButtonElement | null = header.querySelector('.rc_header_label');

    if (currentCalendarRef && !currentCalendarRef.contains(document.activeElement)) {
      // if focus in not already inside the GRID then bring the focus
      if (seletedItemIfAny) {
        seletedItemIfAny.focus();
      } else if (firstActiveItem) {
        firstActiveItem.focus();
      } else {
        firstCell.focus();
      }
    }

    const focusNext = (currentItem: HTMLButtonElement | null, startItem: HTMLButtonElement | null) => {
      // Determine which item is the startItem (first or last)
      const goingDown = startItem === firstCell;

      const move = (elem: HTMLButtonElement) => {
        const indexOfItem = cells.current.indexOf(elem);

        if (goingDown) {
          if (indexOfItem < cells.current.length - 1) {
            return cells.current[indexOfItem + 1];
          }

          return startItem;
        }

        if (indexOfItem - 1 > -1) {
          return cells.current[indexOfItem - 1];
        }

        return startItem;
      };

      if (!currentItem) {
        return null;
      }

      const nextItem = move(currentItem);

      return nextItem;
    };

    function onKeyPressListener(e: KeyboardEvent) {
      const { target } = e;
      const cell = cells.current && cells.current.find((item) => item === target);

      if (e.key === 'Tab') {
        e.preventDefault();
        if (header?.contains(document.activeElement)) {
          // if header has focus move it to calendar
          firstCell.focus();
        } else {
          // otherwise if calendar has focus move it to header first button
          prevButton?.focus();
        }
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        let count = view === 'month_dates' ? 7 : view === 'months' ? 3 : 5;
        if (!cell) {
          return;
        }
        let endItem: HTMLButtonElement | null = cell;
        while (count > 0) {
          endItem = focusNext(endItem, firstCell);
          count--;
        }
        endItem?.focus();
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        let count = view === 'month_dates' ? 7 : view === 'months' ? 3 : 5;
        if (!cell) {
          return;
        }
        let endItem: HTMLButtonElement | null = cell;
        while (count > 0) {
          endItem = focusNext(endItem, lastCell);
          count--;
        }
        endItem?.focus();
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (document.activeElement === prevButton) {
          nextButton?.focus();
        } else if (document.activeElement === monthYearSelector) {
          prevButton?.focus();
        } else if (document.activeElement === nextButton) {
          monthYearSelector?.focus();
        } else {
          if (!cell) {
            return;
          }
          const endItem = focusNext(cell, lastCell);
          endItem?.focus();
        }
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (document.activeElement === prevButton) {
          monthYearSelector?.focus();
        } else if (document.activeElement === monthYearSelector) {
          nextButton?.focus();
        } else if (document.activeElement === nextButton) {
          prevButton?.focus();
        } else {
          if (!cell) {
            return;
          }
          const endItem = focusNext(cell, firstCell);
          endItem?.focus();
        }
      }

      if (e.key === 'Home') {
        e.preventDefault();
        firstCell.focus();
      }

      if (e.key === 'End') {
        e.preventDefault();
        lastCell.focus();
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        // hack so browser focuses the next tabbable element when
        // tab is pressed
        lastCell.focus();
        lastCell.blur();
      }
    }

    currentCalendarRef.addEventListener('keydown', onKeyPressListener, { capture: true });

    return () => {
      currentCalendarRef.removeEventListener('keydown', onKeyPressListener, { capture: true });
    };
    // we want to update elem refs when month/year/year range changes
  }, [calendarRef, view, hasFocus, monthInView, yearInView, startingYearForCurrRange]);

  return (
    <div
      onFocus={() => {
        !hasFocus && setHasFocus(true);
      }}
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
        if (e.currentTarget.contains(e.target)) {
          // if bluee vent has come from a child then do nothing
        } else {
          setHasFocus(false);
        }
      }}
      style={styles.root.rc}
      className="rc"
      ref={calendarRef}
    >
      <Header
        monthsLabel={monthsLabel}
        isSecondary={isSecondary}
        showDualCalendar={showDualCalendar}
        onClickPrev={onPrevClick}
        onClickNext={onNextClick}
        onChangeViewType={setView}
        viewType={view}
        monthInView={monthInView}
        yearInView={yearInView}
        yearMatrixStart={yearMatrixRangeStart}
        yearMatrixEnd={yearMatrixRangeEnd}
      />
      <div style={bodyStyles} className="rc_body">
        {view === 'months' && (
          <MonthSelector
            monthsLabel={monthsLabel}
            onChangeViewType={setView}
            onChangeViewingMonth={onChangeViewingMonth}
          />
        )}
        {view === 'years' && (
          <YearSelector
            onChangeViewType={setView}
            onChangeViewingYear={onChangeViewingYear}
            yearMatrixStart={yearMatrixRangeStart}
            yearMatrixEnd={yearMatrixRangeEnd}
          />
        )}
        {view === 'month_dates' && (
          <>
            <WeekDaysRow weekDaysLabel={weekDaysLabel} startOfWeek={startOfWeek} weekendMap={weekendMap} />
            <DayOfMonthSelector
              noPadRangeCell={noPadRangeCell}
              isRangeSelectModeOn={isRangeSelectModeOn}
              onChangeRangeSelectMode={onChangeRangeSelectMode}
              hideAdjacentDates={hideAdjacentDates}
              selectedDate={selectedDate}
              selectedRangeStart={selectedRangeStart}
              selectedRangeEnd={selectedRangeEnd}
              lockView={lockView}
              newSelectedRangeStart={newSelectedRangeStart}
              startOfWeek={startOfWeek}
              onChangeNewSelectedRangeEnd={onChangeNewSelectedRangeEnd}
              onChangeNewSelectedRangeStart={onChangeNewSelectedRangeStart}
              onPartialRangeSelect={onPartialRangeSelect}
              onEachMultiSelect={onEachMultiSelect}
              newSelectedRangeEnd={newSelectedRangeEnd}
              isRangeSelectorView={isRangeSelectorView}
              fixedRange={fixedRange}
              isFixedRangeView={isFixedRangeView}
              isDisabled={isDisabled}
              checkIfWeekend={checkIfWeekend}
              selectedMultiDates={selectedMultiDates}
              isMultiSelectorView={isMultiSelectorView}
              monthInView={monthInView}
              weekends={weekends}
              onChange={onChange}
              yearInView={yearInView}
              isHighlight={isHighlight}
            />
          </>
        )}
      </div>
    </div>
  );
}

export const CalendarView = memo(Component);

export function getInitialDateToShow(props: InitialDateParams): Date {
  const firstOfMulti =
    props.isMultiSelectorView &&
    props.selectedMultiDates &&
    props.selectedMultiDates[Object.keys(props.selectedMultiDates)[0]];

  const date = isValid(props.viewDate)
    ? props.viewDate
    : props.isNormalView && isValid(props.selectedDate as Date)
    ? (props.selectedDate as Date)
    : props.isRangeSelectorView && props.selectedRangeStart
    ? props.selectedRangeStart
    : firstOfMulti && isValid(firstOfMulti)
    ? firstOfMulti
    : new Date();

  return date;
}

interface InitialDateParams {
  isNormalView: boolean;
  isMultiSelectorView: boolean;
  isRangeSelectorView: boolean;
  viewDate?: Date;
  selectedDate?: Date;
  selectedRangeStart?: Date;
  selectedMultiDates?: Record<string, Date | undefined>;
}
