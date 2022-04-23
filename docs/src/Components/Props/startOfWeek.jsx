import React, { useCallback, useState } from 'react';

import { Calendar } from '../../latest/main';

import '../../latest/main.css';
import '../styles.css';

const weekdayMap = {
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
  0: 'Sun',
};

export default function App() {
  const [value, setValue] = useState(new Date());
  const [startOfWeek, setStartOfWeek] = useState(1);

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  return (
    <div className="rc-demo">
      <button
        className="rc-btn"
        onClick={() => {
          setStartOfWeek((curr) => (curr === 6 ? 0 : curr + 1));
        }}
      >
        Click To Change ({weekdayMap[startOfWeek]})
      </button>
      <Calendar startOfWeek={startOfWeek} value={value} onChange={onChange} />
    </div>
  );
}
