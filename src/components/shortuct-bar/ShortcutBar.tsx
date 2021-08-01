import React, { memo } from 'react';

interface Props {
  onTodayClick: () => void;
  onRangeStartClick: () => void;
  onRangeEndClick: () => void;
  onToggleDatesClick: () => void;
}

const shortcut = {
  root: {
    height: '13%',
    display: 'flex',
    width: '100%',
    margin: '4% 0 0 0',
  },
  button: {
    width: '100%',
  },
};

function ShortcutBarComponent({ onTodayClick, onRangeStartClick, onRangeEndClick, onToggleDatesClick }: Props) {
  return (
    <div style={shortcut.root} className="arc_shortcuts_view">
      <button style={shortcut.button} onClick={onTodayClick}>
        Today
      </button>
      <button style={shortcut.button} onClick={onRangeStartClick}>
        Range St.
      </button>
      <button style={shortcut.button} onClick={onRangeEndClick}>
        Range Ed.
      </button>
      <button style={shortcut.button} onClick={onToggleDatesClick}>
        Toggle Dts.
      </button>
    </div>
  );
}

export const ShortcutBar = memo(ShortcutBarComponent);
