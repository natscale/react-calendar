import React, { memo, useMemo } from 'react';

import { MonthCell, MonthIndices } from '../../types';

import { getMonthViewMetrix } from '../../utils/date-utils';
import { NATIVE_INDEX_TO_LABEL_MONTHS_MAP } from '../../utils/constants';
import { CSSProps } from '../../calendar';

interface Props {
  onChangeViewType: (view: 'month_dates' | 'months' | 'years') => any;
  onChangeViewingMonth: (month: MonthIndices) => any;
  layoutCalcs: CSSProps;
}

function MonthSelectorComponent({ onChangeViewingMonth, onChangeViewType, layoutCalcs }: Props) {
  const monthsViewMatrix = useMemo<MonthCell[][]>(() => {
    return getMonthViewMetrix({});
  }, []);

  return (
    <div style={layoutCalcs.root['arc_view-months']} className='arc_view-months'>
      {monthsViewMatrix.map((row, index) => (
        <div style={layoutCalcs.months.arc_view_row} className='arc_view_row' key={index}>
          {row.map((cell) => (
            <div
              style={layoutCalcs.months.arc_view_cell}
              className={`arc_view_cell${cell.isCurrentMonth ? ' arc_this_month' : ''}`}
              key={cell.month}>
              <button
                style={layoutCalcs.months.arc_view_cell_value_button}
                onClick={() => {
                  onChangeViewingMonth(cell.month);
                  onChangeViewType('month_dates');
                }}>
                {NATIVE_INDEX_TO_LABEL_MONTHS_MAP[cell.month]}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export const MonthSelector = memo(MonthSelectorComponent);
