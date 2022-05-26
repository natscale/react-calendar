import React, { useCallback, useState } from 'react';
import { useRef } from 'react';

import { CalendarWithShortcuts } from '../../latest/main';

import '../../latest/main.css';

export default function App() {
  const [value, setValue] = useState(new Date());

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  const calendarRef = useRef(null);

  const onDateChange = function onDateChange(date) {
    if (calendarRef.current) {
      calendarRef.current.setView(date);
    }
  };

  return (
    <CalendarWithShortcuts
      shortcutButtons={[
        {
          id: '1',
          render: () => {
            return <button onClick={() => onDateChange(new Date(2011, 11, 24))}>24, Dec, 2011</button>;
          },
        },
        {
          id: '2',
          render: () => {
            return <button onClick={() => onDateChange(new Date(2016, 10, 15))}>15, Nov, 2016</button>;
          },
        },
        {
          id: '3',
          render: () => {
            return <button onClick={() => onDateChange(new Date())}>Today</button>;
          },
        },
      ]}
      ref={calendarRef}
      value={value}
      onChange={onChange}
    />
  );
}
