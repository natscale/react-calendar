import React, { memo, useMemo } from 'react';

import { YearCell, YearSelectorProps } from '../../utils/types';

import { getYearsViewMetrix } from '../../utils/date-utils';
import { Year } from '../year-cell/YearCell';

const years = {
  root: { height: '100%' },
  arc_view_row: { height: '24.9%', display: 'flex', width: '100%' },
  arc_view_cell: {
    width: '20%',
    height: '100%',
  },
};

function YearSelectorComponent({ onChangeViewType, onChangeViewingYear, yearMatrixStart }: YearSelectorProps) {
  // TODO add highlight slected dates years
  const yearsMatrix = useMemo<YearCell[][]>(() => {
    return getYearsViewMetrix(yearMatrixStart, {});
  }, [yearMatrixStart]);

  return (
    <div role="grid" style={years.root} className="arc_view-years">
      {yearsMatrix.map((row, index) => (
        <div style={years.arc_view_row} className="arc_view_row" key={index}>
          {row.map((cell) => (
            <div
              style={years.arc_view_cell}
              className={`arc_view_cell${cell.isCurrentYear ? ' arc_this_year' : ''}`}
              key={cell.year}
            >
              <Year
                cell={cell}
                onYearClicked={(cell) => {
                  onChangeViewingYear(cell.year), onChangeViewType('months');
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export const YearSelector = memo(YearSelectorComponent);
