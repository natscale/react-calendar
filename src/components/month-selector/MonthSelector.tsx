import React, { memo, useMemo } from 'react';

import { MonthCell, MonthSelectorProps } from '../../utils/types';

import { getMonthViewMetrix } from '../../utils/date-utils';
import { Month } from '../month-cell/MonthCell';

const months = {
  root: { height: '100%' },
  'rc_body-row': { height: '24.9%', display: 'flex', width: '100%' },
  'rc_body-cell': {
    flexBasis: '33.33%',
    maxWidth: '33.33%',
    height: '100%',
  },
};

function MonthSelectorComponent({ onChangeViewingMonth, onChangeViewType, monthsLabel }: MonthSelectorProps) {
  const monthsViewMatrix = useMemo<MonthCell[][]>(() => {
    return getMonthViewMetrix({});
  }, []);

  return (
    <div role="grid" style={months.root} className="rc_body-months">
      {monthsViewMatrix.map((row, index) => (
        <div style={months['rc_body-row']} className="rc_body-row" key={index}>
          {row.map((cell) => (
            <div
              style={months['rc_body-cell']}
              className={`rc_body-cell${cell.isCurrentMonth ? ' rc_this_month' : ''}`}
              key={cell.month}
            >
              <Month
                monthsLabel={monthsLabel}
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
