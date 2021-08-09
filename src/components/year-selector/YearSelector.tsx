import React, { memo, useMemo } from 'react';

import { YearCell, YearSelectorProps } from '../../utils/types';

import { getYearsViewMetrix } from '../../utils/date-utils';
import { Year } from '../year-cell/YearCell';

const years = {
  root: { height: '100%' },
  'rc_body-row': { height: '24.9%', display: 'flex', width: '100%' },
  'rc_body-cell': {
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
    <div role="grid" style={years.root} className="rc_body-years">
      {yearsMatrix.map((row, index) => (
        <div style={years['rc_body-row']} className="rc_body-row" key={index}>
          {row.map((cell) => (
            <div
              style={years['rc_body-cell']}
              className={`rc_body-cell${cell.isCurrentYear ? ' rc_this_year' : ''}`}
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
