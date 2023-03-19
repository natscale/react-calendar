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

  return <Calendar size={420} fontSize={18} value={value} onChange={onChange} />;
}
