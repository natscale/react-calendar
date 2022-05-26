import React, { useCallback, useState } from 'react';

import { Calendar } from '../../latest/main';

import '../../latest/main.css';

export default function App() {
  const [value, setValue] = useState([]);

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  return <Calendar showDualCalendar isRangeSelector value={value} onChange={onChange} />;
}
