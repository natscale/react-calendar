import React, { memo, useMemo } from 'react';

import { WeekdayRowProps } from '../../utils/types';

import { getWeekDaysIndexToLabelMapForAStartOfTheWeek } from '../../utils/date-utils';
import { NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP } from '../../utils/constants';

const weekdaysRow = {
  arc_view_weekdays: {
    height: '15%',
    margin: '0',
    padding: 0,
    display: 'flex',
    width: '100%',
    listStyle: 'none',
  },
  arc_view_weekdays_cell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexBasis: '14.286%',
    maxWidth: '14.286%',
  },
  arc_view_weekdays_cell_value: {
    width: '65.95%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function WeekDaysRowComponent({ startOfWeek, weekendMap }: WeekdayRowProps) {
  // week days as per the start day of the week
  const { order: weekDayOrder } = useMemo(() => {
    return getWeekDaysIndexToLabelMapForAStartOfTheWeek(startOfWeek);
  }, [startOfWeek]);

  return (
    <ul style={weekdaysRow.arc_view_weekdays} className="arc_view_weekdays">
      {weekDayOrder.map((weekDay) => (
        <li
          style={weekdaysRow.arc_view_weekdays_cell}
          key={weekDay}
          className={`arc_view_weekdays_cell${weekendMap[weekDay] ? ' arc_wknd' : ''}`}
        >
          <div style={weekdaysRow.arc_view_weekdays_cell_value}>
            <span>{NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP[weekDay]}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export const WeekDaysRow = memo(WeekDaysRowComponent);
