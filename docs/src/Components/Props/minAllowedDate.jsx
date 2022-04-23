import React, { useCallback, useState } from 'react';

import { Calendar } from '../../latest/main';

import '../../latest/main.css';

export default function App() {
  const [value, setValue] = useState();

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5);

  return <Calendar minAllowedDate={date} value={value} onChange={onChange} />;
}
