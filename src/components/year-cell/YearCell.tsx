import React, { memo } from 'react';

import { YearCellProps } from '../calendar/Calendar';

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

function Component({ cell, onYearClicked }: YearCellProps) {
  return (
    <div style={rcBodyCellValue}>
      <button
        type="button"
        style={rcBodyCellValueButton}
        onClick={() => {
          onYearClicked(cell);
        }}
      >
        {cell.year}
      </button>
    </div>
  );
}

export const Year = memo(Component);
