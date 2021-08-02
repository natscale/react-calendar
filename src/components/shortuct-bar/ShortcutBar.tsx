import React, { memo } from 'react';

interface Props {
  isNormalView: boolean;
  isRangeView: boolean;
  isMultiDateView: boolean;
  onTodayClick: () => void;
  // onSelectedDateClick: () => void;
  onRangeStartClick: () => void;
  onRangeEndClick: () => void;
  onToggleDatesClick: () => void;
}

const shortcut = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1%',
    gap: '1rem',
    height: '40px',
    alignItems: 'center',
  },
  button: {
    padding: '0 3%',
    height: '80%',
  },
};

function ShortcutBarComponent({
  isNormalView,
  isRangeView,
  isMultiDateView,
  onTodayClick,
  onRangeStartClick,
  onRangeEndClick,
  onToggleDatesClick,
}: Props) {
  return (
    <div style={shortcut.root} className={'arc_shortcuts_view'}>
      <button style={shortcut.button} onClick={onTodayClick}>
        Today
      </button>
      {isRangeView && (
        <button style={shortcut.button} onClick={onRangeStartClick}>
          Range Start
        </button>
      )}
      {isRangeView && (
        <button style={shortcut.button} onClick={onRangeEndClick}>
          Range End
        </button>
      )}
      {(isMultiDateView || isNormalView) && (
        <button style={shortcut.button} onClick={onToggleDatesClick}>
          Selected Dates
        </button>
      )}
    </div>
  );
}

export const ShortcutBar = memo(ShortcutBarComponent);
