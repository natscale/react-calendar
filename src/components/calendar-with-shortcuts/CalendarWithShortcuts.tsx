import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarProps, CalendarWithShortcutProps } from '../../utils/types';
import { ShortcutBar } from '../shortuct-bar/ShortcutBar';
import { isValid } from '../../utils/date-utils';
import { ShortcutButtonModel } from '../shortuct-bar/ShortcutButtonModel';
import Calendar from '../calendar/Calendar';

const styles = {
  root: {
    display: 'inline-flex',
  },
};

function CalendarWithShortcutsRef(props: CalendarWithShortcutProps, ref: React.Ref<HTMLDivElement>) {
  const [highlightedDate, setHighlightedDate] = useState<Date | undefined>(undefined);
  const [toggleDateIndex, setToggleDateIndex] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [rangeStart, setRangeStart] = useState<Date | undefined>(undefined);
  const [rangeEnd, setRangeEnd] = useState<Date | undefined>(undefined);
  const [multiDates, setMultiDates] = useState<Record<string, Date | undefined> | undefined>(undefined);

  const [viewDate, setViewDate] = useState<Date | undefined>(undefined);
  const [newProps, setNewProps] = useState<CalendarProps>(props);
  const resetHighlightedDate = useCallback(() => setHighlightedDate(undefined), [setHighlightedDate]);

  const updateRangeDates = (val: Date[]) => {
    setRangeStart(val[0]);
    setRangeEnd(val[1]);
  };

  const updateSelectedDates = useCallback(
    (val) => {
      props.isMultiSelector && typeof Array.isArray(val) && isValid(val[0])
        ? setMultiDates(val)
        : props.isRangeSelector && Array.isArray(val) && isValid(val[0])
        ? updateRangeDates(val)
        : isValid(val as Date)
        ? setSelectedDate(val)
        : () => 0;
    },
    [props.isMultiSelector, props.isRangeSelector],
  );

  const onCalendarChange = useCallback(
    (val) => {
      updateSelectedDates(val);
      resetHighlightedDate();
      if (props.onChange) {
        props.onChange(val);
      }
    },
    [props, resetHighlightedDate, updateSelectedDates],
  );

  const updateDateView = useCallback(
    (date: Date | undefined) => {
      if (isValid(date)) {
        setViewDate(date);
      }
    },
    [setViewDate],
  );

  useEffect(() => {
    setNewProps({ ...props, viewDate: viewDate });
    setHighlightedDate(viewDate);
  }, [props, viewDate]);

  const goToToday = useCallback(() => updateDateView(new Date()), [updateDateView]);
  const goToRangeStart = useCallback(() => updateDateView(rangeStart), [rangeStart, updateDateView]);
  const goToRangeEnd = useCallback(() => updateDateView(rangeEnd), [rangeEnd, updateDateView]);
  const toggleDate = useCallback(() => {
    let updateVal;
    if (props.isMultiSelector && multiDates) {
      const values = Object.values(multiDates).sort((a, b) =>
        isValid(a) && isValid(b) ? a.getTime() - b.getTime() : 0,
      );
      updateVal = values[toggleDateIndex];
      setToggleDateIndex(toggleDateIndex < values.length - 1 ? toggleDateIndex + 1 : 0);
    } else if (isValid(selectedDate)) {
      updateVal = selectedDate;
    }
    updateDateView(updateVal);
  }, [props.isMultiSelector, multiDates, selectedDate, toggleDateIndex, updateDateView]);

  const toggleDateOnBlur = useCallback(() => {
    resetHighlightedDate();
    setToggleDateIndex(0);
  }, [resetHighlightedDate]);

  const defaultShortcutButtons: Array<ShortcutButtonModel> = useMemo(
    () => [
      {
        buttonText: 'Today',
        onButtonClick: goToToday,
      },
      {
        buttonText: 'Selected Date',
        viewTypes: ['Normal', 'Multiple'],
        onButtonClick: toggleDate,
      },
      {
        buttonText: 'Range Start',
        viewTypes: ['Range'],
        onButtonClick: goToRangeStart,
      },
      {
        buttonText: 'Range End',
        viewTypes: ['Range'],
        onButtonClick: goToRangeEnd,
      },
    ],
    [goToRangeEnd, goToRangeStart, goToToday, toggleDate],
  );

  const viewType = props.isMultiSelector ? 'Multiple' : props.isRangeSelector ? 'Range' : 'Normal';

  const shortcutButtonsToShow = props.showDefaultShortcuts
    ? props.shortcutButtons
      ? defaultShortcutButtons.concat(props.shortcutButtons)
      : defaultShortcutButtons
    : props.shortcutButtons;

  useEffect(
    () => updateSelectedDates(props.value),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div ref={ref} style={styles.root} className="arc_shortcut_cal_root" onBlur={() => resetHighlightedDate()}>
      <ShortcutBar shortcutButtons={shortcutButtonsToShow} viewType={viewType} updateView={updateDateView} />
      <Calendar
        {...{
          ...newProps,
          onChange: onCalendarChange,
          highlightedDate: highlightedDate,
        }}
      />
    </div>
  );
}

// export const CalendarWithShortcuts = memo(CalendarWithShortcutsComponent);
const CalendarWithShortcuts = React.forwardRef(CalendarWithShortcutsRef);

export default CalendarWithShortcuts;
