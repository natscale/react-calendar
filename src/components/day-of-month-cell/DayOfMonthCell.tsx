import React, { memo, useMemo } from 'react';

import { DayOfMonthCellProps } from '../calendar/Calendar';

const root = {
  width: '100%',
  height: '99%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const giveStyles = (noPadRangeCell: boolean) => ({
  width: noPadRangeCell ? '100%' : '69.80%',
  height: noPadRangeCell ? '90%' : '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const giveButtonStyles = (noPadRangeCell: boolean) => ({
  width: noPadRangeCell ? '69.8%' : '100%',
  height: '92%',
});

function Component({ cell, onDateClicked, noPadRangeCell }: DayOfMonthCellProps) {
  const styles = useMemo(() => {
    return giveStyles(noPadRangeCell);
  }, [noPadRangeCell]);
  const buttonStyles = useMemo(() => {
    return giveButtonStyles(noPadRangeCell);
  }, [noPadRangeCell]);
  return (
    <div style={root}>
      <div style={styles} className="rc_body-cell_value">
        <button
          style={buttonStyles}
          disabled={cell.isDisabled}
          tabIndex={cell.isDisabled ? -1 : 0}
          onClick={() => onDateClicked(cell)}
        >
          {cell.dayOfMonth}
        </button>
      </div>
    </div>
  );
}

export const DayOfMonth = memo(Component);
