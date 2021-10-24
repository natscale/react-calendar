import React, { useCallback, useState } from 'react';

import { Calendar } from '../../latest/main';

import '../../latest/main.css';
import '../styles.css';

export default function App() {
  const [value, setValue] = useState(new Date());

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  return (
    <div className="rc-demo">
      <Calendar initialView="years" value={value} onChange={onChange} />
    </div>
  );
}
