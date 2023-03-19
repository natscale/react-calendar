import React, { useCallback, useState } from 'react';

import { Calendar } from '../../../latest/main';

import '../../../latest/main.css';

export default function App() {
  const [value, setValue] = useState();

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  const isDisabled = useCallback((date) => {
    if (date.getDay() === 3 || date.getDate() % 5 === 0) {
      return true;
    }
  }, []);

  return <Calendar isDisabled={isDisabled} value={value} onChange={onChange} />;
}
