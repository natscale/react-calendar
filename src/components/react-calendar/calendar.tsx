/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useMemo, useState, CSSProperties } from 'react';

import type { MonthIndices, WeekdayIndices } from './types';

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
} from './utils/date-utils';

import { Header } from './components/header/Header';
import { MonthSelector } from './components/month-selector/MonthSelector';
import { YearSelector } from './components/year-selector/YearSelector';
import { WeekDaysRow } from './components/week-days-row/WeekDaysRow';
import { DayOfMonthSelector } from './components/day-of-month-selector/DayOfMonthSelector';

import './calendar.css';

export type Value = Date | Date[] | [Date, Date];

interface Props {
  /**
   * Dark mode
   */
  useDarkMode?: boolean;
  /**
   * Custom classname
   */
  className?: string;
  /**
   * Width & Height of the calendar.
   * Default is 276
   */
  size?: number;
  /**
   * Base font-size of calendar.
   * Default is 16
   */
  fontSize?: number;
  /**
   * The initial month and year that will be shown to the user.
   * By default it shows today's date month and year. If a date is selected it shows the selected
   * date's month and year.
   */
  initialViewDate?: Date;
  /**
   * User can not change month/year
   */
  lockView?: boolean;
  /**
   * Value of a single date or an array of dates in ISO format.
   * Only applicable if selectRange is false
   */
  value?: Value;
  /**
   * Renders a multiple dates selector view
   */
  isMultiSelector?: boolean;
  /**
   * Renders a range selector UI for the calendar
   */
  isRangeSelector?: boolean;
  /**
   * Skip disabled dates when doing fixed range selection
   */
  skipDisabledDatesInRange?: boolean;
  /**
   * Skip weekends
   */
  skipWeekendsInRange?: boolean;
  /**
   * Skip disabled dates when doing fixed range selection
   */
  allowFewerDatesThanRange?: boolean;
  /**
   * Always select n number of days starting from the user's selected date
   */
  fixedRange?: number;
  /**
   * Array of weekday number that are part of weekend.
   * The weekday number depends on the start of the week if provided one.
   * By default this is [6, 0] which Saturday, Sunday respectively as per the 0 based start of the week.
   */
  weekends?: WeekdayIndices[];
  /**
   * By default the calendar starts from Sun which is represented in JS as 0 index.
   * You can provide the index for any other day that you want as start of the week.
   */
  startOfWeek?: WeekdayIndices;
  /**
   * A boolean flag to disable all past dates.
   */
  disablePast?: boolean;
  /**
   * A boolean flag to disable today's date.
   */
  disableToday?: boolean;
  /**
   * A boolean flag to disable all future dates.
   */
  disableFuture?: boolean;
  /**
   * A callback function that can be used to disable specific dates on the calendar.
   */
  isDisabled?: (date: Date) => boolean;
  /**
   * User will not be able to select past this date. This date will be selectable.
   */
  maxAllowedDate?: Date;
  /**
   * User will not be able to select before this date. This date will be selectable.
   */
  minAllowedDate?: Date;
  /**
   * These dates will be highlighted
   */
  highlights?: Date[];
  /**
   * OnChange callback functionn.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: Value) => any | Promise<any> | void;
}

// const getStyles: (size: number) => ComputedStyles = (size: number) => ({
//   appliedWidth: `${size!}px`,
//   appliedHeight: `${size!}px`,
//   headerHeightPercent: '14.65%',
//   bodyHeightPercent: '85.35%',
//   weekdaysRowBottomMarginPercent: '3.26%',
//   weekdayColumnCellLeftMarginPercent: '2.17%',
//   weekdayColumnCellWidthPercent: '12.736%',
//   dayOfMonthViewHeightPercent: '82.179%',
//   weekdaysRowHeightPercent: '14.001%',
//   dayOfMonthRowHeightPercent: '16.664%',
//   dayOfMonthColumnWidthPercent: '14.286%',
//   monthRowHeightPercent: '24.9%',
//   monthColumnWidthPercent: '33.33%',
//   yearRowHeightPercent: '24.9%',
//   yearColumnWidthPercent: '20%',
// });

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
    arc_view: { height: '85.35%', width: '100%' },
    'arc_view-months': { height: '100%' },
    'arc_view-years': { height: '100%' },
    arc_header: {
      height: '14.65%',
      padding: '2.50%',
      display: 'flex',
      alignTtems: 'center',
      width: '100%',
    },
  },
  weekdaysRow: {
    arc_view_weekdays: {
      height: '14.001%',
      margin: '0 0 3.26% 0',
      padding: 0,
      display: 'flex',
      width: '100%',
      listStyle: 'none',
    },
    arc_view_weekdays_cell: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      flexBasis: '14.286%',
      maxWidth: '14.286%',
    },
    arc_view_weekdays_cell_value: {
      width: '65.95%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  dayOfMonth: {
    'arc_view-days-of-month': {
      height: '82.179%',
    },
    arc_view_row: {
      height: '16.664%',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
    },
    arc_view_cell: {
      flexBasis: '14.286%',
      maxWidth: '14.286%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arc_view_cell_value: {
      width: '65.95%',
      height: '80.5%',
    },
    arc_view_cell_value_button: {
      width: '100%',
      height: '100%',
    },
  },
  months: {
    arc_view_row: { height: '24.9%', display: 'flex', width: '100%' },
    arc_view_cell: {
      flexBasis: '33.33%',
      maxWidth: '33.33%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arc_view_cell_value_button: {
      width: '78px',
      height: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  years: {
    arc_view_row: { height: '24.9%', display: 'flex', width: '100%' },
    arc_view_cell: {
      width: '20%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arc_view_cell_value_button: {
      width: '48px',
      height: '26px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  header: {
    arc_header_nav: { width: '10.14%', height: '100%', flex: '0 0 auto' },
    arch_header_label: {
      width: '65.21%',
      height: '100%',
      margin: '0 4.34%',
      flex: '1 1 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});

// Add an option to freeze ui if date is invalid
// Add a isEditable option
// Change is in range to could be in range as a class rather than hover
// dont show range hover on diabalbed

function Calendar({
  value,
  isMultiSelector,
  className = '',
  isRangeSelector,
  useDarkMode = false,
  weekends,
  highlights = [],
  skipWeekendsInRange = false,
  initialViewDate,
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
}: Props): React.ReactElement<Props> {
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
      : today.getFullYear(),
  );

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
    <section style={styles.root.arc} className={computedClass}>
      <Header
        layoutCalcs={styles}
        onClickPrev={onPrevClick}
        onClickNext={onNextClick}
        onChangeViewType={changeView}
        viewType={view}
        viewingMonth={monthInView}
        viewingYear={yearInView}
        yearMatrixStart={yearMatrixRangeStart}
        yearMatrixEnd={yearMatrixRangeEnd}
      />
      <main style={styles.root.arc_view} className="arc_view">
        {view === 'months' && (
          <MonthSelector layoutCalcs={styles} onChangeViewType={changeView} onChangeViewingMonth={changeMonthInView} />
        )}
        {view === 'years' && (
          <YearSelector
            layoutCalcs={styles}
            onChangeViewType={changeView}
            onChangeViewingYear={changeYearInView}
            yearMatrixStart={yearMatrixRangeStart}
            yearMatrixEnd={yearMatrixRangeEnd}
          />
        )}
        {view === 'month_dates' && (
          <>
            <WeekDaysRow layoutCalcs={styles} weekStartIndex={startOfTheWeek} weekendIndices={weekendIndexes} />
            <DayOfMonthSelector
              isRangeSelectModeOn={isRangeSelectModeOn}
              setIsRangeSelectModeOn={setIsRangeSelectModeOn}
              layoutCalcs={styles}
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
      </main>
    </section>
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

export interface CSSProps {
  root: {
    arc: CSSProperties;
    arc_view: CSSProperties;
    arc_header: CSSProperties;
    'arc_view-months': CSSProperties;
    'arc_view-years': CSSProperties;
  };
  weekdaysRow: {
    arc_view_weekdays: CSSProperties;
    arc_view_weekdays_cell: CSSProperties;
    arc_view_weekdays_cell_value: CSSProperties;
  };
  dayOfMonth: {
    'arc_view-days-of-month': CSSProperties;
    arc_view_row: CSSProperties;
    arc_view_cell: CSSProperties;
    arc_view_cell_value: CSSProperties;
    arc_view_cell_value_button: CSSProperties;
  };
  months: {
    arc_view_row: CSSProperties;
    arc_view_cell: CSSProperties;
    arc_view_cell_value_button: CSSProperties;
  };
  years: {
    arc_view_row: CSSProperties;
    arc_view_cell: CSSProperties;
    arc_view_cell_value_button: CSSProperties;
  };
  header: {
    arc_header_nav: CSSProperties;
    arch_header_label: CSSProperties;
  };
}
