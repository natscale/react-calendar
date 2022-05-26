import React, { useCallback, useState } from 'react';

import { Calendar } from '../../latest/main';

import '../../latest/main.css';

const monthsLabel = {
  0: 'janvier',
  1: 'février',
  2: 'mars',
  3: 'avril',
  4: 'mai',
  5: 'juin',
  6: 'juillet',
  7: 'août',
  8: 'septembre',
  9: 'octobre',
  10: 'novembre',
  11: 'décembre',
};

const weekDaysLabel = {
  0: 'Di',
  1: 'Lu',
  2: 'Ma',
  3: 'Me',
  4: 'Je',
  5: 'Ve',
  6: 'Sa',
};

export default function App() {
  const [value, setValue] = useState(new Date());

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  return <Calendar weekDaysLabel={weekDaysLabel} monthsLabel={monthsLabel} value={value} onChange={onChange} />;
}
