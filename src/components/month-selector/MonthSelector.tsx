import React, { memo, useMemo } from 'react';

import { MonthCell, MonthIndices } from '../../utils/types';

import { getMonthViewMetrix } from '../../utils/date-utils';
import { Month } from '../month-cell/Month';

interface Props {
  onChangeViewType: (view: 'month_dates' | 'months' | 'years') => unknown;
  onChangeViewingMonth: (month: MonthIndices) => unknown;
}

const months = {
  root: { height: '100%' },
  arc_view_row: { height: '24.9%', display: 'flex', width: '100%' },
  arc_view_cell: {
    flexBasis: '33.33%',
    maxWidth: '33.33%',
    height: '100%',
  },
};

function MonthSelectorComponent({ onChangeViewingMonth, onChangeViewType }: Props) {
  const monthsViewMatrix = useMemo<MonthCell[][]>(() => {
    return getMonthViewMetrix({});
  }, []);

  return (
    <div style={months.root} className="arc_view-months">
      {monthsViewMatrix.map((row, index) => (
        <div style={months.arc_view_row} className="arc_view_row" key={index}>
          {row.map((cell) => (
            <div
              style={months.arc_view_cell}
              className={`arc_view_cell${cell.isCurrentMonth ? ' arc_this_month' : ''}`}
              key={cell.month}
            >
              <Month
                cell={cell}
                onMonthClicked={(cell) => {
                  onChangeViewingMonth(cell.month), onChangeViewType('month_dates');
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export const MonthSelector = memo(MonthSelectorComponent);
