import React, { memo } from 'react';

import { MonthCell } from '../calendar/Calendar';

import { NATIVE_INDEX_TO_LABEL_MONTHS_MAP } from '../../utils/constants';

interface Props {
  cell: MonthCell;
  onMonthClicked: (cell: MonthCell) => unknown;
}

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

function Component({ cell, onMonthClicked }: Props) {
  return (
    <div style={arc_view_cell_value}>
      <button
        style={arc_view_cell_value_button}
        onClick={() => {
          onMonthClicked(cell);
        }}
      >
        {NATIVE_INDEX_TO_LABEL_MONTHS_MAP[cell.month]}
      </button>
    </div>
  );
}

export const Month = memo(Component);
