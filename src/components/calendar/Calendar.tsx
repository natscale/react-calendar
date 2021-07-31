/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import type { CalendarProps, MonthIndices } from '../../utils/types';

import {
  getStartOfRangeForAYear,
  getPreviousYear,
  getPreviousMonth,
  getPreviousRangeStartingYear,
  getNextYear,
  getNextMonth,
  getNextRangeStartingYear,
  getYearRangeLimits,
  getWeekendInfo,
  isValid,
  isBefore,
  toString,
  checkIfDateIsDisabledHOF,
  checkIfWeekendHOF,
  giveRangeDays,
  validateAndReturnDateFormatter,
} from '../../utils/date-utils';

import { Header } from '../header/Header';
import { MonthSelector } from '../month-selector/MonthSelector';
import { YearSelector } from '../year-selector/YearSelector';
import { WeekDaysRow } from '../week-days-row/WeekDaysRow';
import { DayOfMonthSelector } from '../day-of-month-selector/DayOfMonthSelector';

import { getStyles } from '../../utils/styles';

const emptyArray: Date[] = [];

function Calendar({
  value,
  isMultiSelector,
  className = '',
  isRangeSelector,
  useDarkMode = false,
  weekends,
  highlights = emptyArray,
  skipWeekendsInRange = false,
  viewDate: initialViewDate,
  allowFewerDatesThanRange = false,
  startOfWeek = 1,
  maxAllowedDate,
  skipDisabledDatesInRange = false,
  minAllowedDate,
  fixedRange,
  isDisabled,
  onChange,
  lockView = false,
  disableFuture = false,
  size = 276,
  fontSize = 16,
  disablePast = false,
  disableToday = false,
}: CalendarProps): React.ReactElement<CalendarProps> {
  const styles = useMemo(() => getStyles(size, fontSize), [size, fontSize]);

  const [today] = useState(new Date());

  const [isRangeSelectorView] = useState(!!isRangeSelector);

  const [isMultiSelectorView] = useState(!isRangeSelectorView && !!isMultiSelector);

  const [isFixedRangeView] = useState(
    isRangeSelectorView && typeof fixedRange === 'number' && fixedRange > 0 ? true : false,
  );

  const [isNormalView] = useState(!isRangeSelectorView && !isMultiSelectorView);

  // is range select mode on
  const [isRangeSelectModeOn, setIsRangeSelectModeOn] = useState(false);

  if (isNormalView && Array.isArray(value)) {
    throw new Error('`value` should an instance of the Date class. Provided value is an Array.');
  }

  const [fixedRangeLength] = useState(isFixedRangeView ? (fixedRange as number) : 1);

  // start day of the week
  const [startOfTheWeek] = useState(startOfWeek);

  const [weekendIndexes] = useState(() => {
    return Array.isArray(weekends) && (weekends.every((num) => typeof num === 'number') || weekends.length === 0)
      ? weekends
      : getWeekendInfo(startOfTheWeek);
  });

  // selected single date
  const [selectedDate, setSelectedDate] = useState(() => {
    if (isNormalView && isValid(value as Date)) {
      const year = (value as Date).getFullYear();
      const month = (value as Date).getMonth();
      const dateOfMonth = (value as Date).getDate();
      return new Date(year, month, dateOfMonth);
    } else {
      return undefined;
    }
  });

  // selected multi dates
  const [selectedMultiDates, setSelectedMultiDates] = useState<Record<string, Date | undefined>>(() => {
    if (isMultiSelectorView && Array.isArray(value) && value.every(isValid)) {
      return value.reduce((acc, currDate) => {
        if (isValid(currDate)) {
          acc[toString(currDate)] = currDate;
        }
        return acc;
      }, {} as Record<string, Date | undefined>);
    } else {
      return {} as Record<string, Date | undefined>;
    }
  });

  // selected range start date
  const [selectedRangeStart, setSelectedRangeStart] = useState(() => {
    if (isRangeSelectorView && Array.isArray(value) && isValid(value[0])) {
      const year = value[0].getFullYear();
      const month = value[0].getMonth();
      const date = value[0].getDate();
      return new Date(year, month, date);
    } else {
      return undefined;
    }
  });

  const [selectedRangeEnd, setSelectedRangeEnd] = useState(() => {
    if (
      isRangeSelectorView &&
      selectedRangeStart &&
      Array.isArray(value) &&
      isValid(value[1]) &&
      isBefore(value[1], selectedRangeStart)
    ) {
      const year = value[1].getFullYear();
      const month = value[1].getMonth();
      const date = value[1].getDate();
      return new Date(year, month, date);
    } else {
      // TODO read from user's value prop
      return undefined;
    }
  });

  const [newSelectedRangeStart, setNewSelectedRangeStart] = useState<Date | undefined>(selectedRangeStart);

  const [newSelectedRangeEnd, setNewSelectedRangeEnd] = useState<Date | undefined>(selectedRangeEnd);

  // View States
  const [view, setView] = useState<'years' | 'months' | 'month_dates'>('month_dates');

  const [monthInView, setMonthInView] = useState<MonthIndices>(
    (isValid(initialViewDate)
      ? initialViewDate.getMonth()
      : isNormalView && isValid(value as Date)
      ? (value as Date).getMonth()
      : isRangeSelectorView && selectedRangeStart
      ? selectedRangeStart.getMonth()
      : isMultiSelectorView && Array.isArray(value) && isValid(value[0])
      ? value[0].getMonth()
      : isValid(minAllowedDate)
      ? minAllowedDate.getMonth()
      : isValid(maxAllowedDate)
      ? maxAllowedDate.getMonth()
      : today.getMonth()) as MonthIndices,
  );

  const [yearInView, setYearInView] = useState(
    isValid(initialViewDate)
      ? initialViewDate.getFullYear()
      : isNormalView && isValid(value as Date)
      ? (value as Date).getFullYear()
      : isRangeSelectorView && selectedRangeStart
      ? selectedRangeStart.getFullYear()
      : isMultiSelectorView && Array.isArray(value) && isValid(value[0])
      ? value[0].getFullYear()
      : isValid(minAllowedDate)
      ? minAllowedDate.getFullYear()
      : isValid(maxAllowedDate)
      ? maxAllowedDate.getFullYear()
      : today.getFullYear(),
  );

  useEffect(() => {
    if (isValid(initialViewDate)) {
      setMonthInView(initialViewDate.getMonth() as MonthIndices);
      setYearInView(initialViewDate.getFullYear());
      // set date in focus
    }
  }, [initialViewDate]);

  const changeMonthInView = useCallback(
    (month: MonthIndices) => {
      !lockView && setMonthInView(month);
    },
    [lockView, setMonthInView],
  );

  const changeYearInView = useCallback(
    (year: number) => {
      !lockView && setYearInView(year);
    },
    [lockView, setYearInView],
  );

  const changeView = useCallback(
    (view: 'years' | 'months' | 'month_dates') => {
      !lockView && setView(view);
    },
    [lockView, setView],
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

  const computedClass = useMemo(
    () =>
      typeof className === 'string'
        ? `arc ${useDarkMode ? 'dark' : ''} ` + className
        : `arc ${useDarkMode ? 'dark' : ''}`,
    [className, useDarkMode],
  );

  // max allowed Date
  const [maxDate] = useState(() => {
    return isValid(maxAllowedDate) ? maxAllowedDate : today;
  });

  // min allowed Date
  const [minDate] = useState(() => {
    return isValid(minAllowedDate) ? minAllowedDate : today;
  });

  const [applyMaxConstraint] = useState(() => {
    return isValid(maxAllowedDate)
      ? isValid(minAllowedDate)
        ? isBefore(maxAllowedDate, minAllowedDate)
        : true
      : false;
  });

  const [applyminConstraint] = useState(() => {
    return isValid(minAllowedDate)
      ? isValid(maxAllowedDate)
        ? isBefore(maxAllowedDate, minAllowedDate)
        : true
      : false;
  });

  const checkDisabledForADate = useMemo(
    () =>
      checkIfDateIsDisabledHOF({
        disablePast,
        disableToday,
        disableFuture,
        customDisabledCheck: isDisabled,
        maxDate,
        minDate,
        applyMax: applyMaxConstraint,
        applyMin: applyminConstraint,
      }),
    [applyMaxConstraint, applyminConstraint, disableFuture, disablePast, disableToday, isDisabled, maxDate, minDate],
  );

  const checkIfWeekend = useMemo(
    () => checkIfWeekendHOF(weekendIndexes, startOfTheWeek),
    [startOfTheWeek, weekendIndexes],
  );

  return (
    <div style={styles.root.arc} className={computedClass}>
      <Header
        onClickPrev={onPrevClick}
        onClickNext={onNextClick}
        onChangeViewType={changeView}
        viewType={view}
        viewingMonth={monthInView}
        viewingYear={yearInView}
        yearMatrixStart={yearMatrixRangeStart}
        yearMatrixEnd={yearMatrixRangeEnd}
      />
      <div style={styles.root.arc_view} className="arc_view">
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
            <WeekDaysRow weekStartIndex={startOfTheWeek} weekendIndices={weekendIndexes} />
            <DayOfMonthSelector
              isRangeSelectModeOn={isRangeSelectModeOn}
              setIsRangeSelectModeOn={setIsRangeSelectModeOn}
              skipDisabledDatesInRange={!!skipDisabledDatesInRange}
              allowFewerDatesThanRange={!!allowFewerDatesThanRange}
              selectedDate={selectedDate}
              selectedRangeStart={selectedRangeStart}
              selectedRangeEnd={selectedRangeEnd}
              lockView={!!lockView}
              newSelectedRangeStart={newSelectedRangeStart}
              weekStartIndex={startOfTheWeek}
              onChangeViewingYear={changeYearInView}
              onChangeViewingMonth={changeMonthInView}
              onChangenSelectedMultiDates={setSelectedMultiDates}
              onChangenNewSelectedRangeEnd={setNewSelectedRangeEnd}
              onChangenNewSelectedRangeStart={setNewSelectedRangeStart}
              onChangenSelectedRangeEnd={setSelectedRangeEnd}
              onChangenSelectedRangeStart={setSelectedRangeStart}
              onChangenSelectedDate={setSelectedDate}
              newSelectedRangeEnd={newSelectedRangeEnd}
              isRangeSelectorView={isRangeSelectorView}
              fixedRangeLength={fixedRangeLength}
              isFixedRangeView={isFixedRangeView}
              isDisabled={checkDisabledForADate}
              checkIfWeekend={checkIfWeekend}
              selectedMultiDates={selectedMultiDates}
              isMultiSelectorView={isMultiSelectorView}
              viewingMonth={monthInView}
              today={today}
              maxAllowedDate={maxAllowedDate}
              minAllowedDate={minAllowedDate}
              weekendIndices={weekendIndexes}
              skipWeekendsInRange={!!skipWeekendsInRange}
              onChange={onChange}
              viewingYear={yearInView}
              disableFuture={disableFuture}
              disablePast={disablePast}
              highlights={highlights}
              disableToday={disableToday}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Calendar;

export const giveDaysInRange = giveRangeDays;

/**
 * A combination of YYYY-MM-DD.
 * Eg. MM-DD-YYYY, DD-MM-YYYY etc.
 * Default is '-' i.e 'DD-MM-YYYY'
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const giveFormatter = (format: string) => validateAndReturnDateFormatter(format || 'DD-MM-YYYY');

export * from '../../utils/types';
