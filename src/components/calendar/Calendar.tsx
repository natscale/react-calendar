/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo, useState } from 'react';

import type { CalendarProps } from '../../utils/types';

import {
  getWeekendInfo,
  isValid,
  isBefore,
  toString,
  checkIfDateIsDisabledHOF,
  checkIfWeekendHOF,
  giveRangeDays,
  validateAndReturnDateFormatter,
} from '../../utils/date-utils';

import './styles.css';
import CalendarContainer from '../calendar-container/CalendarContainer';

const emptyArray: Date[] = [];

function CalendarWithRef(
  {
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
    onPartialRangeSelect,
    onEachMultiSelect,
    onChange,
    lockView = false,
    disableFuture = false,
    size = 276,
    fontSize = 16,
    disablePast = false,
    disableToday = false,
    showDualCalendar = false,
  }: CalendarProps,
  forwardRef: React.Ref<HTMLDivElement>,
): React.ReactElement<CalendarProps> {
  const [today] = useState(new Date());

  const [isRangeSelectorView] = useState(!!isRangeSelector);

  const [isDualMode] = useState(isRangeSelectorView && !!showDualCalendar);

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
    <div className="arc_root" style={{ display: 'flex' }} ref={forwardRef}>
      {isDualMode ? (
        <>
          <CalendarContainer
            isDualMode={isDualMode}
            isSecondary={false}
            value={value}
            viewDate={initialViewDate}
            useDarkMode={useDarkMode}
            className={className}
            isNormalView={isNormalView}
            size={size}
            fontSize={fontSize}
            weekStartIndex={startOfTheWeek}
            weekendIndices={weekendIndexes}
            isRangeSelectModeOn={isRangeSelectModeOn}
            setIsRangeSelectModeOn={setIsRangeSelectModeOn}
            skipDisabledDatesInRange={!!skipDisabledDatesInRange}
            allowFewerDatesThanRange={!!allowFewerDatesThanRange}
            selectedDate={selectedDate}
            selectedRangeStart={selectedRangeStart}
            selectedRangeEnd={selectedRangeEnd}
            lockView={!!lockView}
            newSelectedRangeStart={newSelectedRangeStart}
            onChangenSelectedMultiDates={setSelectedMultiDates}
            onChangenNewSelectedRangeEnd={setNewSelectedRangeEnd}
            onChangenNewSelectedRangeStart={setNewSelectedRangeStart}
            onChangenSelectedRangeEnd={setSelectedRangeEnd}
            onChangenSelectedRangeStart={setSelectedRangeStart}
            onChangenSelectedDate={setSelectedDate}
            onPartialRangeSelect={onPartialRangeSelect}
            onEachMultiSelect={onEachMultiSelect}
            newSelectedRangeEnd={newSelectedRangeEnd}
            isRangeSelectorView={isRangeSelectorView}
            fixedRangeLength={fixedRangeLength}
            isFixedRangeView={isFixedRangeView}
            isDisabled={checkDisabledForADate}
            checkIfWeekend={checkIfWeekend}
            selectedMultiDates={selectedMultiDates}
            isMultiSelectorView={isMultiSelectorView}
            today={today}
            maxAllowedDate={maxAllowedDate}
            minAllowedDate={minAllowedDate}
            skipWeekendsInRange={!!skipWeekendsInRange}
            onChange={onChange}
            disableFuture={disableFuture}
            disablePast={disablePast}
            highlights={highlights}
            disableToday={disableToday}
          />
          <CalendarContainer
            isDualMode={isDualMode}
            isSecondary={true}
            value={value}
            viewDate={initialViewDate}
            useDarkMode={useDarkMode}
            className={className}
            isNormalView={isNormalView}
            size={size}
            fontSize={fontSize}
            weekStartIndex={startOfTheWeek}
            weekendIndices={weekendIndexes}
            isRangeSelectModeOn={isRangeSelectModeOn}
            setIsRangeSelectModeOn={setIsRangeSelectModeOn}
            skipDisabledDatesInRange={!!skipDisabledDatesInRange}
            allowFewerDatesThanRange={!!allowFewerDatesThanRange}
            selectedDate={selectedDate}
            selectedRangeStart={selectedRangeStart}
            selectedRangeEnd={selectedRangeEnd}
            lockView={!!lockView}
            newSelectedRangeStart={newSelectedRangeStart}
            onChangenSelectedMultiDates={setSelectedMultiDates}
            onChangenNewSelectedRangeEnd={setNewSelectedRangeEnd}
            onChangenNewSelectedRangeStart={setNewSelectedRangeStart}
            onChangenSelectedRangeEnd={setSelectedRangeEnd}
            onChangenSelectedRangeStart={setSelectedRangeStart}
            onChangenSelectedDate={setSelectedDate}
            onPartialRangeSelect={onPartialRangeSelect}
            onEachMultiSelect={onEachMultiSelect}
            newSelectedRangeEnd={newSelectedRangeEnd}
            isRangeSelectorView={isRangeSelectorView}
            fixedRangeLength={fixedRangeLength}
            isFixedRangeView={isFixedRangeView}
            isDisabled={checkDisabledForADate}
            checkIfWeekend={checkIfWeekend}
            selectedMultiDates={selectedMultiDates}
            isMultiSelectorView={isMultiSelectorView}
            today={today}
            maxAllowedDate={maxAllowedDate}
            minAllowedDate={minAllowedDate}
            skipWeekendsInRange={!!skipWeekendsInRange}
            onChange={onChange}
            disableFuture={disableFuture}
            disablePast={disablePast}
            highlights={highlights}
            disableToday={disableToday}
          />
        </>
      ) : (
        <CalendarContainer
          isDualMode={isDualMode}
          isSecondary={false}
          value={value}
          viewDate={initialViewDate}
          useDarkMode={useDarkMode}
          className={className}
          isNormalView={isNormalView}
          size={size}
          fontSize={fontSize}
          weekStartIndex={startOfTheWeek}
          weekendIndices={weekendIndexes}
          isRangeSelectModeOn={isRangeSelectModeOn}
          setIsRangeSelectModeOn={setIsRangeSelectModeOn}
          skipDisabledDatesInRange={!!skipDisabledDatesInRange}
          allowFewerDatesThanRange={!!allowFewerDatesThanRange}
          selectedDate={selectedDate}
          selectedRangeStart={selectedRangeStart}
          selectedRangeEnd={selectedRangeEnd}
          lockView={!!lockView}
          newSelectedRangeStart={newSelectedRangeStart}
          onChangenSelectedMultiDates={setSelectedMultiDates}
          onChangenNewSelectedRangeEnd={setNewSelectedRangeEnd}
          onChangenNewSelectedRangeStart={setNewSelectedRangeStart}
          onChangenSelectedRangeEnd={setSelectedRangeEnd}
          onChangenSelectedRangeStart={setSelectedRangeStart}
          onChangenSelectedDate={setSelectedDate}
          onPartialRangeSelect={onPartialRangeSelect}
          onEachMultiSelect={onEachMultiSelect}
          newSelectedRangeEnd={newSelectedRangeEnd}
          isRangeSelectorView={isRangeSelectorView}
          fixedRangeLength={fixedRangeLength}
          isFixedRangeView={isFixedRangeView}
          isDisabled={checkDisabledForADate}
          checkIfWeekend={checkIfWeekend}
          selectedMultiDates={selectedMultiDates}
          isMultiSelectorView={isMultiSelectorView}
          today={today}
          maxAllowedDate={maxAllowedDate}
          minAllowedDate={minAllowedDate}
          skipWeekendsInRange={!!skipWeekendsInRange}
          onChange={onChange}
          disableFuture={disableFuture}
          disablePast={disablePast}
          highlights={highlights}
          disableToday={disableToday}
        />
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
