import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarProps } from '../../utils/types';
import { ShortcutBar } from '../shortuct-bar/ShortcutBar';
import { isValid } from '../../utils/date-utils';
import { ShortcutButtonModel } from '../shortuct-bar/ShortcutButtonModel';

interface Props {
  children: React.ReactElement<CalendarProps>;
}

const styles = {
  root: {
    display: 'inline-flex',
  },
};

function CalendarWithShortcutsRef({ children }: Props, ref: React.Ref<HTMLDivElement>) {
  const calendarComp = React.Children.only(children);
  const onCalendarChange = useCallback(
    (val) => {
      calendarComp.props.isMultiSelector
        ? setMultiDates(val)
        : calendarComp.props.isRangeSelector
        ? updateRangeDates(val)
        : setSelectedDate(val);
    },
    [calendarComp],
  );

  const [newProps, setNewProps] = useState<CalendarProps>({ ...calendarComp.props, onChange: onCalendarChange });

  const [toggleDateIndex, setToggleDateIndex] = useState<number>(0);
  const [highlightedDate, setHighlightedDate] = useState<Date | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [rangeStart, setRangeStart] = useState<Date | undefined>(undefined);
  const [rangeEnd, setRangeEnd] = useState<Date | undefined>(undefined);
  const [multiDates, setMultiDates] = useState<Record<string, Date | undefined> | undefined>(undefined);

  const updateRangeDates = (val: Date[]) => {
    setRangeStart(val[0]);
    setRangeEnd(val[1]);
  };

  const updateDateView = useCallback(
    (date: Date | undefined) => {
      if (isValid(date)) {
        console.log('updateDateView');
        setNewProps({ ...newProps, viewDate: date });
        setHighlightedDate(date);
      }
    },
    [newProps, setHighlightedDate],
  );

  useEffect(() => console.log('newProps are:', newProps), [newProps]);
  useEffect(() => console.log('selectedDate is:', selectedDate), [selectedDate]);
  useEffect(() => console.log('rangeStart is:', rangeStart), [rangeStart]);
  useEffect(() => console.log('rangeEnd is:', rangeEnd), [rangeEnd]);
  useEffect(() => console.log('multiDates is:', multiDates), [multiDates]);

  const resetHighlightedDate = useCallback(() => setHighlightedDate(undefined), [setHighlightedDate]);
  const [today] = useState(new Date());
  const goToToday = useCallback(() => updateDateView(today), [today, updateDateView]);
  const goToRangeStart = useCallback(() => updateDateView(rangeStart), [rangeStart, updateDateView]);
  const goToRangeEnd = useCallback(() => updateDateView(rangeEnd), [rangeEnd, updateDateView]);
  const toggleDate = useCallback(() => {
    let updateVal;
    if (newProps.isMultiSelector && multiDates) {
      const values = Object.values(multiDates).sort((a, b) =>
        isValid(a) && isValid(b) ? a.getTime() - b.getTime() : 0,
      );
      updateVal = values[toggleDateIndex];
      setToggleDateIndex(toggleDateIndex < values.length - 1 ? toggleDateIndex + 1 : 0);
    } else if (isValid(selectedDate)) {
      updateVal = selectedDate;
    }
    updateDateView(updateVal);
  }, [multiDates, newProps, selectedDate, toggleDateIndex, updateDateView]);

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
        onBlur: toggleDateOnBlur,
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
    [goToRangeEnd, goToRangeStart, goToToday, toggleDate, toggleDateOnBlur],
  );

  const viewType = newProps.isMultiSelector ? 'Multiple' : newProps.isRangeSelector ? 'Range' : 'Normal';

  return (
    <div ref={ref} style={styles.root} className="arc_shortcut_cal_root">
      <ShortcutBar
        barSize={276}
        shortcutButtons={defaultShortcutButtons}
        viewType={viewType}
        updateView={updateDateView}
        onBlurDefault={resetHighlightedDate}
      />
      {React.cloneElement(calendarComp, newProps)}
    </div>
  );
}

// export const CalendarWithShortcuts = memo(CalendarWithShortcutsComponent);
const CalendarWithShortcuts = React.forwardRef(CalendarWithShortcutsRef);

export default CalendarWithShortcuts;
