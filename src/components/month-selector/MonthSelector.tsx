import React, { memo, useMemo } from 'react';

import { CSSProps, MonthCell, MonthIndices } from '../../utils/types';

import { getMonthViewMetrix } from '../../utils/date-utils';
import { Month } from '../month-cell/Month';

interface Props {
  onChangeViewType: (view: 'month_dates' | 'months' | 'years') => unknown;
  onChangeViewingMonth: (month: MonthIndices) => unknown;
  layoutCalcs: CSSProps;
}

function MonthSelectorComponent({ onChangeViewingMonth, onChangeViewType, layoutCalcs }: Props) {
  const monthsViewMatrix = useMemo<MonthCell[][]>(() => {
    return getMonthViewMetrix({});
  }, []);

  return (
    <div style={layoutCalcs.root['arc_view-months']} className="arc_view-months">
      {monthsViewMatrix.map((row, index) => (
        <div style={layoutCalcs.months.arc_view_row} className="arc_view_row" key={index}>
          {row.map((cell) => (
            <div
              style={layoutCalcs.months.arc_view_cell}
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
