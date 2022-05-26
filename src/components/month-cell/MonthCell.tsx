import React, { memo } from 'react';

import { MonthCellProps } from '../calendar/Calendar';

const rcBodyCellValue = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const rcBodyCellValueButton = {
  width: '95%',
  height: '45%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function Component({ cell, onMonthClicked, monthsLabel }: MonthCellProps) {
  return (
    <div style={rcBodyCellValue}>
      <button
        type="button"
        style={rcBodyCellValueButton}
        onClick={() => {
          onMonthClicked(cell);
        }}
      >
        {monthsLabel[cell.month]}
      </button>
    </div>
  );
}

export const Month = memo(Component);
