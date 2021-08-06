import React, { memo, useMemo } from 'react';

import { WeekdayIndices } from '../../utils/types';

import { getWeekDaysIndexToLabelMapForAStartOfTheWeek } from '../../utils/date-utils';

export interface Props {
  weekStartIndex: WeekdayIndices;
  weekendIndices: WeekdayIndices[];
}

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

function WeekDaysRowComponent({ weekStartIndex, weekendIndices }: Props) {
  // week days as per the start day of the week
  const { order: weekDayOrder, map: weekDayMap } = useMemo(() => {
    return getWeekDaysIndexToLabelMapForAStartOfTheWeek(weekStartIndex);
  }, [weekStartIndex]);

  const weekendIndicesMap: Record<WeekdayIndices, 1> = useMemo(() => {
    return weekendIndices.reduce((acc, curr) => {
      acc[curr] = 1;
      return acc;
    }, {} as Record<WeekdayIndices, 1>);
  }, [weekendIndices]);

  return (
    <ul style={weekdaysRow.arc_view_weekdays} className="arc_view_weekdays">
      {weekDayOrder.map((weekDay, weekdayIndex) => (
        <li
          style={weekdaysRow.arc_view_weekdays_cell}
          key={weekDay}
          className={`arc_view_weekdays_cell${weekendIndicesMap[weekdayIndex as WeekdayIndices] ? ' arc_wknd' : ''}`}
        >
          <div style={weekdaysRow.arc_view_weekdays_cell_value}>
            <span>{weekDayMap[weekdayIndex as WeekdayIndices]}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export const WeekDaysRow = memo(WeekDaysRowComponent);
