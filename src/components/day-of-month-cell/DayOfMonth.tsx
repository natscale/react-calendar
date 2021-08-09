import React, { createRef, memo, useEffect, useRef } from 'react';

import { DayOfMonthCell } from '../calendar/Calendar';

export interface Props {
  isHighlighted: boolean;
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

const arc_view_cell_value_button_focused = {
  outline: '1px solid black',
};

function Component({ isHighlighted, cell, onDateClicked }: Props) {
  const computedButtonStyle = Object.assign(
    {},
    arc_view_cell_value_button,
    isHighlighted ? arc_view_cell_value_button_focused : undefined,
  ) as React.CSSProperties;

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  if (isHighlighted) {
    buttonRef.current && buttonRef.current.focus();
  } else {
    buttonRef.current && buttonRef.current.blur();
  }

  return (
    <div style={arc_view_cell}>
      <div style={arc_view_cell_value} className="arc_view_cell_value">
        <button
          // ref={buttonRef}
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
