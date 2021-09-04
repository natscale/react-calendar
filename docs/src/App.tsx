import type { CalendarProps, WeekdayIndices, CalendarRef } from './latest/utils/types';
import React, { useCallback, useState } from 'react';
import { Button, Checkbox, Input } from 'semantic-ui-react';
import { useRef } from 'react';

import { Calendar, giveDaysInRange, giveFormatter } from './latest/main';

import { Popover } from 'react-tiny-popover';

import 'rc-slider/assets/index.css';

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
  const [props, setProps] = useState<CalendarProps>({
    hideAdjacentDates: false,
    useDarkMode: false,
    className: 'myckass',
    size: 276,
    fontSize: 14,
    lockView: false,
    // initialView: 'years',
    showDualCalendar: false,
    isMultiSelector: false,
    isRangeSelector: false,
    noPadRangeCell: false,
    skipDisabledDatesInRange: false,
    allowFewerDatesThanRange: false,
    fixedRange: undefined,
    weekends: [6, 0],
    startOfWeek: 1,
    disablePast: false,
    disableToday: false,
    disableFuture: false,
    isDisabled: undefined,
    highlights: highlights,
    minAllowedDate: undefined,
    maxAllowedDate: undefined,
  });

  const [value, setValue] = useState<Date>(new Date());

  const calendarRef = useRef<CalendarRef>();

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  const [roundButtonStyles, setApplyRoundButtonCss] = useState(false);
  const [theme, setTheme] = useState<'green' | 'brown' | 'normal'>('normal');

  return (
    <div className="demo">
      <div className="view">
        <div>
          <div className="calendar">
            <Calendar ref={calendarRef} {...props} className={theme} value={value} onChange={onChange} />
          </div>
        </div>
      </div>
      <div className="props_root">
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
              onChange={() =>
                setProps({
                  ...props,
                  isMultiSelector: !props.isMultiSelector,
                  ...(!props.isMultiSelector ? { isRangeSelector: false, fixedRange: undefined } : null),
                })
              }
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
                  noPadRangeCell: !props.noPadRangeCell,
                  ...(!props.noPadRangeCell ? { isRangeSelector: true } : null),
                })
              }
              checked={props.noPadRangeCell}
              label="No Padding In Range Cells"
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
            <Checkbox
              toggle
              onChange={() =>
                setProps({
                  ...props,
                  skipDisabledDatesInRange: !props.skipDisabledDatesInRange,
                  ...(!props.skipDisabledDatesInRange ? { fixedRange: 5, isRangeSelector: true } : null),
                })
              }
              checked={props.skipDisabledDatesInRange}
              label="Skip Disabled Dates In Range"
            />
          </div>
          <div>
            <h4>Move to Date</h4>
            <Button
              onClick={() => {
                calendarRef?.current?.setView(new Date(randYear(), randMonth(), randDate()));
              }}
            >
              Random Date
            </Button>
            <Button
              onClick={() => {
                calendarRef?.current?.setView(new Date());
              }}
            >
              Today
            </Button>
          </div>
        </div>
        <div className="props">
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
                  setProps({ ...props, fixedRange: Number(d.value), isRangeSelector: true });
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
                  setProps({ ...props, weekends: arr as WeekdayIndices[] });
                } else {
                  setProps({ ...props, weekends: [] });
                }
              }}
            />
          </div>
        </div>
        <div className="props">
          <span
            dangerouslySetInnerHTML={{
              __html: roundButtonStyles
                ? '<style>.rc_body-days-of-month .rc_body-cell .rc_body-cell_value{border-radius: 50%;}</style>'
                : '<span></span>',
            }}
          ></span>
          <div>
            <Checkbox
              onChange={() => setApplyRoundButtonCss(!roundButtonStyles)}
              checked={roundButtonStyles}
              label={roundButtonStyles ? 'Remove this css' : 'Apply this css'}
            />
            <pre style={{ color: 'rebeccapurple' }}>
              {`.rc_body-days-of-month .rc_body-cell .rc_body-cell_value {
  border-radius: 50%;
}`}
            </pre>
          </div>
          <div>
            <h4>Easily Modify Theme Colors</h4>
            <Checkbox
              onChange={() => setTheme(theme !== 'green' ? 'green' : 'normal')}
              checked={theme === 'green'}
              label="Green"
            />
            <Checkbox
              onChange={() => setTheme(theme !== 'brown' ? 'brown' : 'normal')}
              checked={theme === 'brown'}
              label="Brown"
            />
            <pre style={{ color: 'teal' }}>
              {`.rc_root.green {
  --rc-hsl-primary-hue: 160deg;
}

.rc_root.brown {
  --rc-hsl-primary-hue: 388deg;
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
