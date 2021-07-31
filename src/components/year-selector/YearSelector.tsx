import React, { memo, useMemo } from 'react';

import { CSSProps, YearCell } from '../../utils/types';

import { getYearsViewMetrix } from '../../utils/date-utils';
import { Year } from '../year-cell/Year';

interface Props {
  onChangeViewType: (view: 'month_dates' | 'months' | 'years') => unknown;
  onChangeViewingYear: (year: number) => unknown;
  yearMatrixStart: number;
  yearMatrixEnd: number;
  layoutCalcs: CSSProps;
}

function YearSelectorComponent({ onChangeViewType, onChangeViewingYear, yearMatrixStart, layoutCalcs }: Props) {
  // TODO add highlight slected dates years
  const yearsMatrix = useMemo<YearCell[][]>(() => {
    return getYearsViewMetrix(yearMatrixStart, {});
  }, [yearMatrixStart]);

  return (
    <div style={layoutCalcs.root['arc_view-years']} className="arc_view-years">
      {yearsMatrix.map((row, index) => (
        <div style={layoutCalcs.years.arc_view_row} className="arc_view_row" key={index}>
          {row.map((cell) => (
            <div
              style={layoutCalcs.years.arc_view_cell}
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
