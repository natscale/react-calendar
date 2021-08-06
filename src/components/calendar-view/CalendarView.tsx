/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
    arc: {
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

export default function Calendarview(props: CalendarViewProps): React.ReactElement<CalendarViewProps> {
  const styles = useMemo(() => getStyles(props.size, props.fontSize), [props.size, props.fontSize]);

  // View States
  const [view, setView] = useState<'years' | 'months' | 'month_dates'>('month_dates');

  const [monthInView, setMonthInView] = useState<MonthIndices>(() => {
    const value = (
      isValid(props.viewDate)
        ? props.viewDate.getMonth()
        : props.isNormalView && isValid(props.value as Date)
        ? (props.value as Date).getMonth()
        : props.isRangeSelectorView && props.selectedRangeStart
        ? props.selectedRangeStart.getMonth()
        : props.isMultiSelectorView && Array.isArray(props.value) && isValid(props.value[0])
        ? props.value[0].getMonth()
        : isValid(props.minAllowedDate)
        ? props.minAllowedDate.getMonth()
        : isValid(props.maxAllowedDate)
        ? props.maxAllowedDate.getMonth()
        : props.today.getMonth()
    ) as MonthIndices;
    return props.isSecondary ? getNextMonth(value) : value;
  });

  const [yearInView, setYearInView] = useState(
    isValid(props.viewDate)
      ? props.viewDate.getFullYear()
      : props.isNormalView && isValid(props.value as Date)
      ? (props.value as Date).getFullYear()
      : props.isRangeSelectorView && props.selectedRangeStart
      ? props.selectedRangeStart.getFullYear()
      : props.isMultiSelectorView && Array.isArray(props.value) && isValid(props.value[0])
      ? props.value[0].getFullYear()
      : isValid(props.minAllowedDate)
      ? props.minAllowedDate.getFullYear()
      : isValid(props.maxAllowedDate)
      ? props.maxAllowedDate.getFullYear()
      : props.today.getFullYear(),
  );

  useEffect(() => {
    if (isValid(props.viewDate)) {
      setMonthInView(props.viewDate.getMonth() as MonthIndices);
      setYearInView(props.viewDate.getFullYear());
      // set date in focus
    }
  }, [props.viewDate]);

  const changeMonthInView = useCallback(
    (month: MonthIndices) => {
      !props.lockView && setMonthInView(month);
    },
    [props.lockView, setMonthInView],
  );

  const changeYearInView = useCallback(
    (year: number) => {
      !props.lockView && setYearInView(year);
    },
    [props.lockView, setYearInView],
  );

  const changeView = useCallback(
    (view: 'years' | 'months' | 'month_dates') => {
      !props.lockView && setView(view);
    },
    [props.lockView, setView],
  );

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
        setYearInView(getPreviousYear(yearInView));
      }
      changeMonthInView(getPreviousMonth(monthInView));
    }
    if (view === 'years') {
      setStartingYearForCurrRange(getPreviousRangeStartingYear(startingYearForCurrRange));
    }
    if (view === 'months') {
      changeYearInView(yearInView !== 1 ? yearInView - 1 : 1);
    }
  }, [
    changeMonthInView,
    monthInView,
    changeYearInView,
    yearInView,
    view,
    setStartingYearForCurrRange,
    startingYearForCurrRange,
  ]);

  const onNextClick = useCallback(() => {
    if (view === 'month_dates') {
      const isCurrentMonthLast = monthInView === 11;
      if (isCurrentMonthLast) {
        changeYearInView(getNextYear(yearInView));
      }
      changeMonthInView(getNextMonth(monthInView));
    }
    if (view === 'years') {
      setStartingYearForCurrRange(getNextRangeStartingYear(startingYearForCurrRange));
    }

    if (view === 'months') {
      changeYearInView(getNextYear(yearInView));
    }
  }, [
    changeMonthInView,
    monthInView,
    changeYearInView,
    yearInView,
    view,
    setStartingYearForCurrRange,
    startingYearForCurrRange,
  ]);

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

    const firstItem = cells.current[0];
    const lastItem = cells.current[cells.current.length - 1];
    const grid = currentCalendarRef.querySelector('[role="grid"]');
    const seletedItemIfAny: HTMLButtonElement | null =
      currentCalendarRef.querySelector('[role="grid"] .arc_selected button') ||
      currentCalendarRef.querySelector('[role="grid"] .arc_range_end button') ||
      currentCalendarRef.querySelector('[role="grid"] .arc_range_start button');

    const firstActiveItem: HTMLButtonElement | null = currentCalendarRef.querySelector(
      '[role="grid"] .arc_active button',
    );

    const prevButton: HTMLButtonElement | null = currentCalendarRef.querySelector('header .arc_header_nav-prev');
    const nextButton: HTMLButtonElement | null = currentCalendarRef.querySelector('header .arc_header_nav-next');
    const monthYearSelector: HTMLButtonElement | null = currentCalendarRef.querySelector('header .arc_header_label');

    if (grid && !grid.contains(document.activeElement)) {
      // if focus in not already inside the GRID then bring the focus
      if (seletedItemIfAny) {
        seletedItemIfAny.focus();
      } else if (firstActiveItem) {
        firstActiveItem.focus();
      } else {
        firstItem.focus();
      }
    }

    const focusNext = (currentItem: HTMLButtonElement | null, startItem: HTMLButtonElement | null) => {
      // Determine which item is the startItem (first or last)
      const goingDown = startItem === firstItem;

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

      if (!cell) {
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        const endItem = focusNext(cell, firstItem);
        if (endItem === firstItem) {
          prevButton?.focus();
        } else if (document.activeElement === nextButton) {
          firstItem?.focus();
        } else if (document.activeElement === monthYearSelector) {
          nextButton?.focus();
        } else if (document.activeElement === prevButton) {
          monthYearSelector?.focus();
        } else {
          endItem?.focus();
        }
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        let count = view === 'month_dates' ? 7 : view === 'months' ? 3 : 5;
        let endItem: HTMLButtonElement | null = cell;
        while (count > 0) {
          endItem = focusNext(endItem, firstItem);
          count--;
        }
        endItem?.focus();
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        let count = view === 'month_dates' ? 7 : view === 'months' ? 3 : 5;
        let endItem: HTMLButtonElement | null = cell;
        while (count > 0) {
          endItem = focusNext(endItem, lastItem);
          count--;
        }
        endItem?.focus();
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const endItem = focusNext(cell, lastItem);
        endItem?.focus();
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const endItem = focusNext(cell, firstItem);
        endItem?.focus();
      }

      if (e.key === 'Home') {
        e.preventDefault();
        firstItem.focus();
      }

      if (e.key === 'End') {
        e.preventDefault();
        lastItem.focus();
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        cell.blur();
        currentCalendarRef?.blur();
      }
    }

    currentCalendarRef.addEventListener('keydown', onKeyPressListener, { capture: true });

    return () => {
      currentCalendarRef.removeEventListener('keydown', onKeyPressListener, { capture: true });
    };
  }, [calendarRef, view, hasFocus, monthInView]);

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
      style={styles.root.arc}
      className="arc"
      ref={calendarRef}
    >
      <Header
        onClickPrev={onPrevClick}
        onClickNext={onNextClick}
        onChangeViewType={changeView}
        viewType={view}
        monthInView={monthInView}
        yearInView={yearInView}
        yearMatrixStart={yearMatrixRangeStart}
        yearMatrixEnd={yearMatrixRangeEnd}
      />
      <div style={bodyStyles} className="arc_view">
        {view === 'months' && <MonthSelector onChangeViewType={changeView} onChangeViewingMonth={changeMonthInView} />}
        {view === 'years' && (
          <YearSelector
            onChangeViewType={changeView}
            onChangeViewingYear={changeYearInView}
            yearMatrixStart={yearMatrixRangeStart}
            yearMatrixEnd={yearMatrixRangeEnd}
          />
        )}
        {view === 'month_dates' && (
          <>
            <WeekDaysRow startOfWeek={props.startOfWeek} weekends={props.weekends} />
            <DayOfMonthSelector
              isRangeSelectModeOn={props.isRangeSelectModeOn}
              onChangeRangeSelectMode={props.onChangeRangeSelectMode}
              skipDisabledDatesInRange={props.skipDisabledDatesInRange}
              hideAdjacentDates={props.hideAdjacentDates}
              allowFewerDatesThanRange={props.allowFewerDatesThanRange}
              selectedDate={props.selectedDate}
              selectedRangeStart={props.selectedRangeStart}
              selectedRangeEnd={props.selectedRangeEnd}
              lockView={props.lockView}
              newSelectedRangeStart={props.newSelectedRangeStart}
              startOfWeek={props.startOfWeek}
              onChangeViewingYear={changeYearInView}
              onChangeViewingMonth={changeMonthInView}
              onChangenSelectedMultiDates={props.onChangenSelectedMultiDates}
              onChangenNewSelectedRangeEnd={props.onChangenNewSelectedRangeEnd}
              onChangenNewSelectedRangeStart={props.onChangenNewSelectedRangeStart}
              onChangenSelectedRangeEnd={props.onChangenSelectedRangeEnd}
              onChangenSelectedRangeStart={props.onChangenSelectedRangeStart}
              onChangenSelectedDate={props.onChangenSelectedDate}
              onPartialRangeSelect={props.onPartialRangeSelect}
              onEachMultiSelect={props.onEachMultiSelect}
              newSelectedRangeEnd={props.newSelectedRangeEnd}
              isRangeSelectorView={props.isRangeSelectorView}
              fixedRange={props.fixedRange}
              isFixedRangeView={props.isFixedRangeView}
              isDisabled={props.isDisabled}
              checkIfWeekend={props.checkIfWeekend}
              selectedMultiDates={props.selectedMultiDates}
              isMultiSelectorView={props.isMultiSelectorView}
              monthInView={monthInView}
              today={props.today}
              maxAllowedDate={props.maxAllowedDate}
              minAllowedDate={props.minAllowedDate}
              weekends={props.weekends}
              onChange={props.onChange}
              yearInView={yearInView}
              disableFuture={props.disableFuture}
              disablePast={props.disablePast}
              highlights={props.highlights}
              disableToday={props.disableToday}
            />
          </>
        )}
      </div>
    </div>
  );
}
