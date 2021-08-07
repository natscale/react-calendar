import React, { useCallback, useState } from 'react';
import { Button, Checkbox, Input } from 'semantic-ui-react';

import { Calendar, giveDaysInRange, giveFormatter } from './latest/main';

import { Popover } from 'react-tiny-popover';

import 'rc-slider/assets/index.css';

const initialDual = [new Date(2021, 0, 22), new Date(2021, 1, 10)];

const highlights = [
  new Date(2021, new Date().getMonth(), 6),
  new Date(2021, new Date().getMonth(), 12),
  new Date(2021, new Date().getMonth(), 14),
  new Date(2021, new Date().getMonth(), 16),
  new Date(2021, new Date().getMonth(), 24),
];

const randYear = () => Math.floor(Math.random() * 2400) + 1940;
const randMonth = () => Math.floor(Math.random() * 11) + 0;
const randDate = () => Math.floor(Math.random() * 28) + 1;

export function App(): React.ReactElement {
  const [props, setProps] = useState({
    hideAdjacentDates: false,
    useDarkMode: false,
    className: 'myckass',
    size: 400,
    fontSize: 16,
    viewDate: Date,
    lockView: false,
    showDualCalendar: false,
    isMultiSelector: false,
    isRangeSelector: false,
    skipDisabledDatesInRange: false,
    allowFewerDatesThanRange: false,
    fixedRange: undefined,
    weekends: [],
    startOfWeek: 0,
    disablePast: false,
    disableToday: false,
    disableFuture: false,
    isDisabled: undefined,
    highlights: highlights,
    minAllowedDate: undefined,
    maxAllowedDate: undefined,
  } as any);

  const [value, setValue] = useState<Date>(new Date(2021, 6, 22));

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  return (
    <div className="demo">
      <div className="view">
        <div>
          <div className="calendar">
            <Calendar {...props} value={value} onChange={onChange} />
          </div>
        </div>
      </div>
      <div className="props">
        <div>
          <Checkbox
            toggle
            onChange={() => setProps({ ...props, useDarkMode: !props.useDarkMode })}
            checked={props.useDarkMode}
            label="Use Dark Mode"
          />
        </div>
        <div>
          <Checkbox
            toggle
            onChange={() => setProps({ ...props, hideAdjacentDates: !props.hideAdjacentDates })}
            checked={props.hideAdjacentDates}
            label="Hide Adjacent Dates"
          />
        </div>
        <div>
          <Checkbox
            toggle
            onChange={() => setProps({ ...props, lockView: !props.lockView })}
            checked={props.lockView}
            label="Lock View"
          />
        </div>
        <div>
          <Checkbox
            toggle
            onChange={() => setProps({ ...props, disablePast: !props.disablePast })}
            checked={props.disablePast}
            label="Disable Past"
          />
        </div>
        <div>
          <Checkbox
            toggle
            onChange={() => setProps({ ...props, disableFuture: !props.disableFuture })}
            checked={props.disableFuture}
            label="Disable Future"
          />
        </div>
        <div>
          <Checkbox
            toggle
            onChange={() => setProps({ ...props, disableToday: !props.disableToday })}
            checked={props.disableToday}
            label="Disable Today"
          />
        </div>
        <div>
          <Checkbox
            toggle
            onChange={() => setProps({ ...props, isMultiSelector: !props.isMultiSelector })}
            checked={props.isMultiSelector}
            label="Multi Selector"
          />
        </div>
        <div>
          <Checkbox
            toggle
            onChange={() => setProps({ ...props, isRangeSelector: !props.isRangeSelector })}
            checked={props.isRangeSelector}
            label="Range Selector"
          />
        </div>
        <div>
          <Checkbox
            toggle
            onChange={() =>
              setProps({
                ...props,
                showDualCalendar: !props.showDualCalendar,
                ...(!props.showDualCalendar ? { isRangeSelector: true } : null),
              })
            }
            checked={props.showDualCalendar}
            label="Show Dual Calendar"
          />
        </div>
        <div>
          <h4>Fixed Range Length</h4>
          <Input
            type="number"
            placeholder="Type -1 to remove"
            value={props.fixedRange}
            onChange={(e, d) => {
              if (Number(d.value) < 1) {
                setProps({ ...props, fixedRange: undefined });
              } else {
                setProps({ ...props, fixedRange: Number(d.value) });
              }
            }}
          />
        </div>
        <div>
          <h4>Calendar Size</h4>
          <Input
            min={276}
            max={700}
            type="number"
            value={props.size}
            onChange={(e, d) => {
              if (Number(d.value) < 1) {
                setProps({ ...props, size: 276 });
              } else {
                setProps({ ...props, size: Number(d.value) });
              }
            }}
          />
        </div>
        <div>
          <h4>Font Size</h4>
          <Input
            min={12}
            max={22}
            type="number"
            value={props.fontSize}
            onChange={(e, d) => {
              if (Number(d.value) < 10) {
                setProps({ ...props, fontSize: 14 });
              } else {
                setProps({ ...props, fontSize: Number(d.value) });
              }
            }}
          />
        </div>
      </div>
      <div className="props">
        <div>
          <h4>Start Of Week</h4>
          <Checkbox
            onChange={() => setProps({ ...props, startOfWeek: 0 })}
            checked={props.startOfWeek === 0}
            label="Sun"
          />
          <Checkbox
            onChange={() => setProps({ ...props, startOfWeek: 1 })}
            checked={props.startOfWeek === 1}
            label="Mon"
          />
          <Checkbox
            onChange={() => setProps({ ...props, startOfWeek: 2 })}
            checked={props.startOfWeek === 2}
            label="Tue"
          />
          <Checkbox
            onChange={() => setProps({ ...props, startOfWeek: 3 })}
            checked={props.startOfWeek === 3}
            label="Wed"
          />
          <Checkbox
            onChange={() => setProps({ ...props, startOfWeek: 4 })}
            checked={props.startOfWeek === 4}
            label="Thurs"
          />
          <Checkbox
            onChange={() => setProps({ ...props, startOfWeek: 5 })}
            checked={props.startOfWeek === 5}
            label="Fri"
          />
          <Checkbox
            onChange={() => setProps({ ...props, startOfWeek: 6 })}
            checked={props.startOfWeek === 6}
            label="Sat"
          />
        </div>
        <div>
          <h4>Weekends</h4>
          <Input
            placeholder="6,0"
            onChange={(e, d) => {
              const arr =
                d &&
                d.value
                  .split(',')
                  .filter((n) => !!n)
                  .map((e) => Number(e.trim()))
                  .filter((n) => !isNaN(n));
              if (arr) {
                setProps({ ...props, weekends: arr });
              } else {
                setProps({ ...props, weekends: [] });
              }
            }}
          />
        </div>
        <div>
          <h4>Move to Date</h4>
          <Button
            onClick={() => {
              setProps({ ...props, viewDate: new Date(randYear(), randMonth(), randDate()) });
            }}
          >
            Random Date
          </Button>
          <Button
            onClick={() => {
              setProps({ ...props, viewDate: new Date() });
            }}
          >
            Today
          </Button>
        </div>
      </div>
    </div>
  );
}
