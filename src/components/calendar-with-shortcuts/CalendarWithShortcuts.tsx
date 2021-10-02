import React, { Ref, useImperativeHandle, useRef } from 'react';

import { CalendarRef, CalendarWithShortcutProps } from '../../utils/types';
import { ShortcutBar } from '../shortuct-bar/ShortcutBar';

import Calendar from '../calendar/Calendar';

const styles = {
  root: {
    display: 'inline-flex',
  },
};

function CalendarWithShortcutsRef(
  props: CalendarWithShortcutProps,
  calendarRef: Ref<CalendarRef>,
): React.ReactElement<CalendarWithShortcutProps> {
  const internalRef = useRef<CalendarRef | null>(null);

  if (!props.shortcutButtons.length) {
    throw new Error('Provide a list of shortcut buttons');
  }

  useImperativeHandle(
    calendarRef,
    (): CalendarRef => ({
      setView: (date: Date) => {
        internalRef.current && date && internalRef.current.setView(date);
      },
    }),
  );

  return (
    <div style={styles.root} className={'rc_shortcut_cal_root' + ' ' + (props.useDarkMode ? 'rc_dark' : '')}>
      <ShortcutBar shortcutButtons={props.shortcutButtons} />
      <Calendar ref={internalRef} {...props} />
    </div>
  );
}

const CalendarWithShortcuts = React.forwardRef(CalendarWithShortcutsRef);

export default CalendarWithShortcuts;
