import React, { memo } from 'react';

import { YearCellProps } from '../calendar/Calendar';

const arc_view_cell_value = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const arc_view_cell_value_button = {
  width: '95%',
  height: '45%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function Component({ cell, onYearClicked }: YearCellProps) {
  return (
    <div style={arc_view_cell_value}>
      <button
        style={arc_view_cell_value_button}
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
