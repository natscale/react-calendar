import React, { memo } from 'react';

import { DayOfMonthCell } from '../calendar/Calendar';

export interface Props {
  cell: DayOfMonthCell;
  onDateClicked: (cell: DayOfMonthCell) => unknown;
}

const arc_view_cell = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const arc_view_cell_value = {
  width: '69.80%',
  height: '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const arc_view_cell_value_button = {
  width: '100%',
  height: '100%',
};

function Component({ cell, onDateClicked }: Props) {
  return (
    <div style={arc_view_cell}>
      <div style={arc_view_cell_value} className="arc_view_cell_value">
        <button
          style={arc_view_cell_value_button}
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
