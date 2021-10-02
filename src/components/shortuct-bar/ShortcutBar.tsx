import React from 'react';
import { ShortcutButtonModel } from '../calendar/Calendar';

interface Props {
  shortcutButtons: Array<ShortcutButtonModel>;
}

const shortcutStyles = {
  root: {
    display: 'flex',
    padding: '2%',
    gap: '1rem',
    alignItems: 'center',
    flexDirection: 'column' as const,
    overflow: 'auto',
    width: '130px',
  },
};

export function ShortcutBar({ shortcutButtons }: Props): React.ReactElement<Props> {
  return (
    <div style={shortcutStyles.root} className="rc_shortcuts_view">
      {shortcutButtons.map((btn: ShortcutButtonModel) => {
        return <div key={btn.id}>{btn.render()}</div>;
      })}
    </div>
  );
}
