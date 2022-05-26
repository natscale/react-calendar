import React, { memo, useMemo } from 'react';

import { WeekdayRowProps } from '../../utils/types';

import { getWeekDaysIndexToLabelMapForAStartOfTheWeek } from '../../utils/date-utils';

const weekdaysRow = {
  'rc_body-weekdays': {
    height: '15%',
    margin: '0',
    padding: 0,
    display: 'flex',
    width: '100%',
    listStyle: 'none',
  },
  'rc_body-weekdays_cell': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexBasis: '14.286%',
    maxWidth: '14.286%',
  },
  'rc_body-weekdays_cell_value': {
    width: '65.95%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function WeekDaysRowComponent({ startOfWeek, weekendMap, weekDaysLabel }: WeekdayRowProps) {
  // week days as per the start day of the week
  const { order: weekDayOrder } = useMemo(() => {
    return getWeekDaysIndexToLabelMapForAStartOfTheWeek(startOfWeek);
  }, [startOfWeek]);

  return (
    <ul style={weekdaysRow['rc_body-weekdays']} className="rc_body-weekdays">
      {weekDayOrder.map((weekDay) => (
        <li
          style={weekdaysRow['rc_body-weekdays_cell']}
          key={weekDay}
          className={`rc_body-weekdays_cell${weekendMap[weekDay] ? ' rc_wknd' : ''}`}
        >
          <div style={weekdaysRow['rc_body-weekdays_cell_value']}>
            <span>{weekDaysLabel[weekDay]}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export const WeekDaysRow = memo(WeekDaysRowComponent);
