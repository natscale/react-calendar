import React, { memo } from 'react';

import { DayOfMonthCellProps } from '../calendar/Calendar';

const root = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const value = {
  width: '69.80%',
  height: '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const valueButton = {
  width: '100%',
  height: '100%',
};

function Component({ cell, onDateClicked }: DayOfMonthCellProps) {
  return (
    <div style={root}>
      <div style={value} className="rc_body-cell_value">
        <button
          style={valueButton}
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
