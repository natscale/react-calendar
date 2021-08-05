import React, { memo } from 'react';
import { ShortcutButton } from '../shortuct-button/ShortcutButton';

interface Props {
  isNormalView: boolean;
  isRangeView: boolean;
  isMultiDateView: boolean;
  barSize: number;
  onTodayClick: () => void;
  // onSelectedDateClick: () => void;
  onRangeStartClick: () => void;
  onRangeEndClick: () => void;
  onToggleDatesClick: () => void;
  onBlur: () => void;
}

const getShortcutStyles = (size: number) => ({
  root: {
    display: 'flex',
    padding: '7px',
    gap: '1rem',
    height: `${size}px`,
    alignItems: 'center',
    flexDirection: 'column' as const,
    overflow: 'auto',
    width: '120px',
  },
});

function ShortcutBarComponent({
  isNormalView,
  isRangeView,
  isMultiDateView,
  barSize,
  onTodayClick,
  onRangeStartClick,
  onRangeEndClick,
  onToggleDatesClick,
  onBlur,
}: Props) {
  const shortcut = getShortcutStyles(barSize);
  return (
    <div style={shortcut.root} className={'arc_shortcuts_view'}>
      <ShortcutButton buttonText={'Today'} onButtonClick={onTodayClick} onBlur={onBlur} />
      {isRangeView && <ShortcutButton buttonText={'Range Start'} onButtonClick={onRangeStartClick} onBlur={onBlur} />}
      {isRangeView && <ShortcutButton buttonText={'Range End'} onButtonClick={onRangeEndClick} onBlur={onBlur} />}
      {isRangeView && <ShortcutButton buttonText={'Range End'} onButtonClick={onRangeEndClick} onBlur={onBlur} />}
      {isRangeView && <ShortcutButton buttonText={'Range End'} onButtonClick={onRangeEndClick} onBlur={onBlur} />}
      {isRangeView && <ShortcutButton buttonText={'Range End'} onButtonClick={onRangeEndClick} onBlur={onBlur} />}
      {isRangeView && <ShortcutButton buttonText={'Range End'} onButtonClick={onRangeEndClick} onBlur={onBlur} />}
      {isRangeView && <ShortcutButton buttonText={'Range End'} onButtonClick={onRangeEndClick} onBlur={onBlur} />}
      {isRangeView && <ShortcutButton buttonText={'Range End'} onButtonClick={onRangeEndClick} onBlur={onBlur} />}
      {isRangeView && <ShortcutButton buttonText={'Range End'} onButtonClick={onRangeEndClick} onBlur={onBlur} />}
      {isRangeView && <ShortcutButton buttonText={'Range End'} onButtonClick={onRangeEndClick} onBlur={onBlur} />}
      {isRangeView && <ShortcutButton buttonText={'Range End'} onButtonClick={onRangeEndClick} onBlur={onBlur} />}
      {(isMultiDateView || isNormalView) && (
        <ShortcutButton buttonText={'Selected Dates'} onButtonClick={onToggleDatesClick} onBlur={onBlur} />
      )}
    </div>
  );
}

export const ShortcutBar = memo(ShortcutBarComponent);
