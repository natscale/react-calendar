import React, { useCallback, useState } from 'react';

import { Calendar } from '../../../latest/main';

import '../../../latest/main.css';

export default function App() {
  const [value, setValue] = useState(new Date());

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  const isHighlight = useCallback((date) => {
    // highlight any data that is divisible by 5
    if (date.getDate() % 5 === 0) {
      return true;
    }
  }, []);

  return <Calendar isHighlight={isHighlight} value={value} onChange={onChange} />;
}
