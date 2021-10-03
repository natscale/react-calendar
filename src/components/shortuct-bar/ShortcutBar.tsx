import React, { useMemo } from 'react';
import { SHORTCUT_SIZE } from '../calendar-with-shortcuts/CalendarWithShortcuts';
import { CalendarWithShortcutProps, ShortcutButtonModel } from '../calendar/Calendar';

interface Props extends Pick<CalendarWithShortcutProps, 'direction'> {
  shortcutButtons: Array<ShortcutButtonModel>;
}

const giveStyles: (dir: CalendarWithShortcutProps['direction']) => Record<'root' | 'notFirst', React.CSSProperties> = (
  dir,
) => ({
  root: {
    display: 'flex',
    padding: dir === 'bottom' ? '4%' : '2%',
    alignItems: 'center',
    flexDirection: dir === 'bottom' ? 'row' : 'column',
    overflow: 'auto',
    width: dir === 'bottom' ? '100%' : `${SHORTCUT_SIZE}px`,
  },
  notFirst: {
    [dir === 'bottom' ? 'marginLeft' : 'marginTop']: dir === 'bottom' ? '6%' : '12%',
  },
});

const empty = {};

export function ShortcutBar({ shortcutButtons, direction }: Props): React.ReactElement<Props> {
  const styles = useMemo(() => {
    return giveStyles(direction);
  }, [direction]);
  return (
    <div style={styles.root} className="rc_shortcuts_view">
      {shortcutButtons.map((btn: ShortcutButtonModel, index: number) => {
        return (
          <div style={index !== 0 ? styles.notFirst : empty} key={btn.id}>
            {btn.render()}
          </div>
        );
      })}
    </div>
  );
}
