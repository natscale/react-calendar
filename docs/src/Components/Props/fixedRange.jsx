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

  return <Calendar fixedRange={5} isRangeSelector value={value} onChange={onChange} />;
}
