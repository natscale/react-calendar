import React, { useCallback, useState } from 'react';

import { Calendar } from '../latest/main';

import '../latest/main.css';

export function Basic() {
  const [value, setValue] = useState(new Date());

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  return <Calendar value={value} onChange={onChange} />;
}
