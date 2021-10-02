/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { MonthIndices, CSSProps, CalendarViewProps, ViewType, CalendarRef } from '../../utils/types';

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
  fromString,
} from '../../utils/date-utils';

import { Header } from '../header/Header';
import { MonthSelector } from '../month-selector/MonthSelector';
import { YearSelector } from '../year-selector/YearSelector';
import { WeekDaysRow } from '../week-days-row/WeekDaysRow';
import { DayOfMonthSelector } from '../day-of-month-selector/DayOfMonthSelector';

const bodyStyles = { height: '88%', width: '100%' };

const Views: Record<ViewType, 1> = {
  years: 1,
  months: 1,
  month_dates: 1,
};

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

function Component(
  {
    size,
    fontSize,
    isNormalView,
    isMultiSelectorView,
    isRangeSelectorView,
    viewDate,
    selectedDate,
    selectedRangeStart,
    selectedMultiDates,
    minAllowedDate,
    maxAllowedDate,
    isSecondary,
    lockView,
    startOfWeek,
    noPadRangeCell,
    weekends,
    isRangeSelectModeOn,
    onChangeRangeSelectMode,
    initialView,
    skipDisabledDatesInRange,
    hideAdjacentDates,
    allowFewerDatesThanRange,
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
    showDualCalendar,
    disableFuture,
    weekendMap,
    disablePast,
    highlightsMap,
    disableToday,
  }: CalendarViewProps,
  ref: React.Ref<CalendarRef>,
): React.ReactElement<CalendarViewProps> {
  const styles = useMemo(() => getStyles(size, fontSize), [size, fontSize]);

  // View States
  const [view, setView] = useState<ViewType>(initialView && Views[initialView] ? initialView : 'month_dates');

  // This just tries to find a month to show based on a number
  // of factors for the initial render only
  const [monthInView, setMonthInView] = useState<MonthIndices>(
    () =>
      getInitialDateToShow({
        isNormalView: isNormalView,
        isMultiSelectorView: isMultiSelectorView,
        isRangeSelectorView: isRangeSelectorView,
        selectedDate: selectedDate,
        selectedRangeStart: selectedRangeStart,
        selectedMultiDates: selectedMultiDates,
        viewDate: viewDate,
        minAllowedDate: minAllowedDate ? fromString(minAllowedDate) : undefined,
        maxAllowedDate: maxAllowedDate ? fromString(maxAllowedDate) : undefined,
      }).getMonth() as MonthIndices,
  );

  // This just tries to find a year to show based on a number
  // of factors for the initial render only
  const [yearInView, setYearInView] = useState(
    getInitialDateToShow({
      isNormalView: isNormalView,
      isMultiSelectorView: isMultiSelectorView,
      isRangeSelectorView: isRangeSelectorView,
      selectedDate: selectedDate,
      selectedRangeStart: selectedRangeStart,
      selectedMultiDates: selectedMultiDates,
      viewDate: viewDate,
      minAllowedDate: minAllowedDate ? fromString(minAllowedDate) : undefined,
      maxAllowedDate: maxAllowedDate ? fromString(maxAllowedDate) : undefined,
    }).getFullYear(),
  );

  useImperativeHandle(ref, () => ({
    setView: (date: Date) => {
      setMonthInView(date.getMonth() as MonthIndices);
      setYearInView(date.getFullYear());
    },
  }));

  useLayoutEffect(() => {
    if (showDualCalendar && isSecondary) {
      const nextMonth = getNextMonth(monthInView);
      setMonthInView(nextMonth);
      setYearInView(nextMonth === 0 ? getNextYear(yearInView) : yearInView);
    }
    // we are intentionally missing monthInView and yearInView deps
    // because we only want to auto compute secondary month when the props were changed the first time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDualCalendar, isSecondary]);

  // updating view when selected date change
  useEffect(() => {
    if (isValid(selectedDate)) {
      setMonthInView(selectedDate.getMonth() as MonthIndices);
      setYearInView(selectedDate.getFullYear());
    }
  }, [selectedDate]);

  // updating view only when first multi is selected
  useEffect(() => {
    const dates = Object.keys(selectedMultiDates)
      .map((str) => selectedMultiDates[str])
      .filter((d) => isValid(d));

    if (dates.length === 1 && dates[0]) {
      setMonthInView(dates[0].getMonth() as MonthIndices);
      setYearInView(dates[0].getFullYear());
    }
  }, [selectedMultiDates]);

  const changeMonthInView = useCallback(
    (month: MonthIndices) => {
      !lockView && setMonthInView(month);
    },
    [lockView],
  );

  const changeYearInView = useCallback(
    (year: number) => {
      !lockView && setYearInView(year);
    },
    [lockView],
  );

  const changeView = useCallback(
    (view: ViewType) => {
      !lockView && setView(view);
    },
    [lockView],
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
        onClickPrev={onPrevClick}
        onClickNext={onNextClick}
        onChangeViewType={changeView}
        viewType={view}
        monthInView={monthInView}
        yearInView={yearInView}
        yearMatrixStart={yearMatrixRangeStart}
        yearMatrixEnd={yearMatrixRangeEnd}
      />
      <div style={bodyStyles} className="rc_body">
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
            <WeekDaysRow startOfWeek={startOfWeek} weekendMap={weekendMap} />
            <DayOfMonthSelector
              noPadRangeCell={noPadRangeCell}
              isRangeSelectModeOn={isRangeSelectModeOn}
              onChangeRangeSelectMode={onChangeRangeSelectMode}
              skipDisabledDatesInRange={skipDisabledDatesInRange}
              hideAdjacentDates={hideAdjacentDates}
              allowFewerDatesThanRange={allowFewerDatesThanRange}
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
              maxAllowedDate={maxAllowedDate}
              minAllowedDate={minAllowedDate}
              weekends={weekends}
              onChange={onChange}
              yearInView={yearInView}
              disableFuture={disableFuture}
              disablePast={disablePast}
              highlightsMap={highlightsMap}
              disableToday={disableToday}
            />
          </>
        )}
      </div>
    </div>
  );
}

export const CalendarView = memo(forwardRef(Component));

function getInitialDateToShow(props: InitialDateParams): Date {
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
    : isValid(props.minAllowedDate)
    ? props.minAllowedDate
    : isValid(props.maxAllowedDate)
    ? props.maxAllowedDate
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
  minAllowedDate?: Date;
  maxAllowedDate?: Date;
}
