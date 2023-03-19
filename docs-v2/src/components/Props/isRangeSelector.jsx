import React, { useCallback, useEffect, useState } from 'react';

import { Calendar } from '../../../latest/main';

import '../../../latest/main.css';

export default function App() {
  const [value, setValue] = useState([new Date(2023, 1, 1), new Date(2023, 1, 10)]);

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  useEffect(() => {
    setInterval(() => {
      setValue([(new Date(2023, Math.random() < 0.5 ? 3 : 2, 1), new Date(2023, 6, 10))]);
    }, 5000);
  }, []);

  return <Calendar isRangeSelector value={value} onChange={onChange} />;
}
