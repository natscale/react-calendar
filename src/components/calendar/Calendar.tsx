/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo, useState } from 'react';

import type { CalendarProps, CalendarViewProps, WeekdayIndices } from '../../utils/types';

import {
  isValid,
  isBefore,
  toString,
  checkIfDateIsDisabledHOF,
  checkIfWeekendHOF,
  giveRangeDays,
  validateAndReturnDateFormatter,
  fromString,
} from '../../utils/date-utils';

import './styles.css';

import { CalendarView } from '../calendar-view/CalendarView';

const emptyArray: Date[] = [];

const styles = { display: 'inline-flex' };

function CalendarWithRef(
  {
    value,
    isMultiSelector,
    className = '',
    isRangeSelector,
    useDarkMode = false,
    weekends,
    highlights = emptyArray,
    viewDate: initialViewDate,
    allowFewerDatesThanRange = false,
    startOfWeek = 1,
    maxAllowedDate,
    skipDisabledDatesInRange = false,
    minAllowedDate,
    fixedRange,
    isDisabled,
    onPartialRangeSelect,
    onEachMultiSelect,
    initialView,
    onChange,
    lockView = false,
    disableFuture = false,
    size = 276,
    fontSize = 16,
    disablePast = false,
    disableToday = false,
    showDualCalendar = false,
    hideAdjacentDates = false,
  }: CalendarProps,
  forwardRef: React.Ref<HTMLDivElement>,
): React.ReactElement<CalendarProps> {
  const isRangeSelectorView = !!isRangeSelector;
  const isDualMode = isRangeSelectorView && !!showDualCalendar;
  const isMultiSelectorView = !isRangeSelectorView && !!isMultiSelector;
  const isFixedRangeView = isRangeSelectorView && typeof fixedRange === 'number' && fixedRange > 0 ? true : false;
  const isNormalView = !isRangeSelectorView && !isMultiSelectorView;

  const startOfTheWeek = startOfWeek;
  const fixedRangeLength = isFixedRangeView ? (fixedRange as number) : 1;

  const highlightsMap = useMemo<Record<string, 1>>(() => {
    if (Array.isArray(highlights)) {
      return highlights
        .filter((d) => isValid(d))
        .reduce((acc, curr) => {
          acc[toString(curr)] = 1;
          return acc;
        }, {} as Record<string, 1>);
    }
    return {};
  }, [highlights]);

  const weekendIndexes = useMemo<WeekdayIndices[]>(() => {
    return Array.isArray(weekends) && (weekends.every((num) => typeof num === 'number') || weekends.length === 0)
      ? weekends
      : [6, 0];
  }, [weekends]);

  const maxDate = useMemo(() => {
    return isValid(maxAllowedDate) ? toString(maxAllowedDate) : undefined;
  }, [maxAllowedDate]);

  const minDate = useMemo(() => {
    return isValid(minAllowedDate) ? toString(minAllowedDate) : undefined;
  }, [minAllowedDate]);

  const viewDate = useMemo(() => {
    return isValid(initialViewDate) ? toString(initialViewDate) : undefined;
  }, [initialViewDate]);

  const applyMaxConstraint = useMemo(() => {
    return isValid(maxAllowedDate)
      ? isValid(minAllowedDate)
        ? isBefore(maxAllowedDate, minAllowedDate)
        : true
      : false;
  }, [maxAllowedDate, minAllowedDate]);

  const applyminConstraint = useMemo(() => {
    return isValid(minAllowedDate)
      ? isValid(maxAllowedDate)
        ? isBefore(maxAllowedDate, minAllowedDate)
        : true
      : false;
  }, [maxAllowedDate, minAllowedDate]);

  const checkDisabledForADate = useMemo(
    () =>
      checkIfDateIsDisabledHOF({
        disablePast,
        disableToday,
        disableFuture,
        customDisabledCheck: isDisabled,
        maxDate: maxDate ? fromString(maxDate) : undefined,
        minDate: minDate ? fromString(minDate) : undefined,
        applyMax: applyMaxConstraint,
        applyMin: applyminConstraint,
      }),
    [applyMaxConstraint, applyminConstraint, disableFuture, disablePast, disableToday, isDisabled, maxDate, minDate],
  );

  const checkIfWeekend = useMemo(() => checkIfWeekendHOF(weekendIndexes), [weekendIndexes]);

  const weekendMap: Record<WeekdayIndices, 1> = useMemo(() => {
    return weekendIndexes.reduce((acc, curr) => {
      acc[curr] = 1;
      return acc;
    }, {} as Record<WeekdayIndices, 1>);
  }, [weekendIndexes]);

  const selectedDate = useMemo(
    () => (isNormalView && isValid(value as Date) ? (value as Date) : undefined),
    [isNormalView, value],
  );

  const selectedMultiDates = useMemo<Record<string, Date | undefined>>(() => {
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
  }, [isMultiSelectorView, value]);

  // selected range start date
  const selectedRangeStart = useMemo(() => {
    if (isRangeSelectorView && Array.isArray(value) && isValid(value[0])) {
      const year = value[0].getFullYear();
      const month = value[0].getMonth();
      const date = value[0].getDate();
      return new Date(year, month, date);
    } else {
      return undefined;
    }
  }, [isRangeSelectorView, value]);

  const selectedRangeEnd = useMemo(() => {
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
  }, [isRangeSelectorView, selectedRangeStart, value]);

  const [isRangeSelectModeOn, setIsRangeSelectModeOn] = useState(false);
  const [newSelectedRangeStart, setNewSelectedRangeStart] = useState<Date | undefined>(selectedRangeStart);
  const [newSelectedRangeEnd, setNewSelectedRangeEnd] = useState<Date | undefined>(selectedRangeEnd);

  const commonProps = useMemo<Omit<CalendarViewProps, 'isSecondary'>>(
    () => ({
      showDualCalendar: isDualMode,
      viewDate: viewDate,
      useDarkMode: useDarkMode,
      className: className,
      hideAdjacentDates: !!hideAdjacentDates,
      isNormalView: isNormalView,
      size: size,
      fontSize: fontSize,
      startOfWeek: startOfTheWeek,
      weekends: weekendIndexes,
      isRangeSelectModeOn: isRangeSelectModeOn,
      onChangeRangeSelectMode: setIsRangeSelectModeOn,
      skipDisabledDatesInRange: !!skipDisabledDatesInRange,
      allowFewerDatesThanRange: !!allowFewerDatesThanRange,
      selectedDate: selectedDate,
      selectedRangeStart: selectedRangeStart,
      selectedRangeEnd: selectedRangeEnd,
      lockView: !!lockView,
      newSelectedRangeStart: newSelectedRangeStart,
      onChangenNewSelectedRangeEnd: setNewSelectedRangeEnd,
      onChangenNewSelectedRangeStart: setNewSelectedRangeStart,
      onPartialRangeSelect: onPartialRangeSelect,
      onEachMultiSelect: onEachMultiSelect,
      newSelectedRangeEnd: newSelectedRangeEnd,
      isRangeSelectorView: isRangeSelectorView,
      initialView: initialView,
      fixedRange: fixedRangeLength,
      isFixedRangeView: isFixedRangeView,
      isDisabled: checkDisabledForADate,
      checkIfWeekend: checkIfWeekend,
      selectedMultiDates: selectedMultiDates,
      isMultiSelectorView: isMultiSelectorView,
      maxAllowedDate: maxDate,
      minAllowedDate: minDate,
      onChange: onChange,
      disableFuture: disableFuture,
      disablePast: disablePast,
      highlightsMap: highlightsMap,
      disableToday: disableToday,
      weekendMap: weekendMap,
    }),
    [
      allowFewerDatesThanRange,
      checkDisabledForADate,
      checkIfWeekend,
      weekendMap,
      className,
      disableFuture,
      disablePast,
      hideAdjacentDates,
      disableToday,
      initialView,
      fixedRangeLength,
      fontSize,
      highlightsMap,
      viewDate,
      isDualMode,
      isFixedRangeView,
      isMultiSelectorView,
      isNormalView,
      isRangeSelectModeOn,
      isRangeSelectorView,
      lockView,
      maxDate,
      minDate,
      newSelectedRangeEnd,
      newSelectedRangeStart,
      onChange,
      onEachMultiSelect,
      onPartialRangeSelect,
      selectedDate,
      selectedMultiDates,
      selectedRangeEnd,
      selectedRangeStart,
      size,
      skipDisabledDatesInRange,
      startOfTheWeek,
      useDarkMode,
      weekendIndexes,
    ],
  );

  const computedClass = useMemo(
    () =>
      typeof className === 'string'
        ? `rc_root${useDarkMode ? ' rc_dark' : ''}${isDualMode ? ' rc_dual' : ''}` + ` ${className}`
        : `rc_root${useDarkMode ? ' rc_dark' : ''}${isDualMode ? ' rc_dual' : ''}`,
    [className, useDarkMode, isDualMode],
  );

  return (
    <div className={computedClass} style={styles} ref={forwardRef}>
      {isDualMode ? (
        <>
          <CalendarView isSecondary={false} {...commonProps} />
          <CalendarView isSecondary={true} {...commonProps} />
        </>
      ) : (
        <CalendarView isSecondary={false} {...commonProps} />
      )}
    </div>
  );
}

const Calendar = React.forwardRef(CalendarWithRef);

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
