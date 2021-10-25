import React, { Ref, useImperativeHandle, useRef, useMemo } from 'react';

import { CalendarRef, CalendarWithShortcutProps } from '../../utils/types';
import { ShortcutBar, SHORTCUT_SIZE } from '../shortuct-bar/ShortcutBar';

import Calendar, { DEFAULT_SIZE } from '../calendar/Calendar';

const giveStyles: (width: number, direction?: 'left' | 'right' | 'bottom') => Record<'root', React.CSSProperties> = (
  width,
  direction,
) => ({
  root: {
    display: 'inline-flex',
    flexDirection: direction === 'bottom' ? 'column-reverse' : direction === 'right' ? 'row-reverse' : 'row',
    width: `${width + (direction === 'bottom' ? 0 : SHORTCUT_SIZE)}px`,
  },
});

function CalendarWithShortcutsRef(
  props: CalendarWithShortcutProps,
  calendarRef: Ref<CalendarRef>,
): React.ReactElement<CalendarWithShortcutProps> {
  const internalRef = useRef<CalendarRef | null>(null);

  const styles = useMemo(() => {
    return giveStyles((props.size || DEFAULT_SIZE) * (props.showDualCalendar ? 2 : 1), props.direction);
  }, [props.direction, props.showDualCalendar, props.size]);

  const classNames = useMemo(() => {
    return (
      'rc_shortcut_cal_root' + ' ' + (props.useDarkMode ? ' rc_dark' : '') + (' rc_dir-' + (props.direction || 'left'))
    );
  }, [props.useDarkMode, props.direction]);

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
    <div style={styles.root} className={classNames}>
      <ShortcutBar
        isDual={!!props.showDualCalendar}
        direction={props.direction || 'left'}
        shortcutButtons={props.shortcutButtons}
      />
      <Calendar ref={internalRef} {...props} />
    </div>
  );
}

const CalendarWithShortcuts = React.forwardRef(CalendarWithShortcutsRef);

export default CalendarWithShortcuts;
