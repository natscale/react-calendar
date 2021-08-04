import type { Value } from './latest/components/react-calendar/calendar';
import React, { useCallback, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import Slider from 'rc-slider';

import { Calendar, giveDaysInRange, giveFormatter } from './latest/main';

import { Popover } from 'react-tiny-popover';

import 'rc-slider/assets/index.css';

export function App(): React.ReactElement {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [one, setOne] = useState<object>({});

  const onChangeone = useCallback(
    (value) => {
      setOne(value);
    },
    [setOne],
  );

  const [two, setTwo] = useState<object>({});

  const onChangetwo = useCallback(
    (value) => {
      setTwo(value);
    },
    [setTwo],
  );

  const [three, setThree] = useState<object>({});

  const onChangethree = useCallback(
    (value) => {
      setThree(value);
    },
    [setThree],
  );

  const [four, setFour] = useState<object>({});

  const onChangefour = useCallback(
    (value) => {
      setFour(value);
    },
    [setFour],
  );

  const [five, setFive] = useState<object>({});

  const onChangefive = useCallback(
    (value) => {
      setFive(value);
    },
    [setFive],
  );

  const [six, setSix] = useState<object>({});

  const onChangesix = useCallback(
    (value) => {
      setSix(value);
    },
    [setSix],
  );

  const [seven, setSeven] = useState<object>({});

  const onChangeseven = useCallback(
    (value) => {
      setSeven(value);
    },
    [setSeven],
  );

  const [eight, setEight] = useState<object>({});

  const onChangeeight = useCallback(
    (value) => {
      setEight(value);
    },
    [setEight],
  );

  const [nine, setNine] = useState<object>({});

  const onChangenine = useCallback(
    (value) => {
      setNine(value);
    },
    [setNine],
  );

  const [ten, setTen] = useState<object>({});

  const onChangeTen = useCallback(
    (value) => {
      setTen(value);
    },
    [setTen],
  );

  const [eleven, setEleven] = useState<object>({});

  const onChangeEleven = useCallback(
    (value) => {
      setEleven(value);
    },
    [setEleven],
  );

  const [tweleve, setTweleve] = useState<object>({});

  const onChangeTweleve = useCallback(
    (value) => {
      setTweleve(value);
    },
    [setTweleve],
  );

  const [thirteen, setThirteen] = useState<object>([]);

  const onChangeThirteen = useCallback(
    (value) => {
      setThirteen(value);
    },
    [setThirteen],
  );

  const [fourteen, setFourteen] = useState<object>({});

  const onChangeFourteen = useCallback(
    (value) => {
      setFourteen(value);
    },
    [setFourteen],
  );

  const [width, setWidth] = useState<number>(400);

  const [fontSize, setFontSize] = useState<number>(16);

  const [fiveteen, setFiveteen] = useState<object>({});

  const onChangeFiveteen = useCallback(
    (value) => {
      setFiveteen(value);
    },
    [setFiveteen],
  );

  const [viewDate, setViewDate] = useState<Date>(new Date());

  const maxDate = new Date(2021, 7, 28);
  const minDate = new Date(2021, 7, 4);

  return (
    <div className="demo">
      <div>
        <div>
          <p>Default</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar onChange={onChangenine} />
          </div>
        </div>
      </div>
      <div>
        <div className="desc">
          <p>Multiple Dates View</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar
              value={[new Date(2021, 6, 22), new Date(2021, 6, 25), new Date(2021, 6, 9)]}
              isMultiSelector
              disableToday
              onChange={onChangeone}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Dual Calendar View</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar
              showDualCalendar
              isRangeSelector
              disableToday
              value={[new Date(2021, 0, 22), new Date(2021, 1, 10)]}
              onChange={onChangethree}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Range Select View With Min-Max Allowed Dates</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar
              isRangeSelector
              maxAllowedDate={maxDate}
              minAllowedDate={minDate}
              disableToday
              onChange={onChangetwo}
              // startOfWeek={2}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Fixed Range View (6 Days)</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar isRangeSelector fixedRange={6} onChange={onChangeThirteen} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Highlight Custom Dates</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar
              initialViewDate={new Date(2020, 5, 6)}
              highlights={[
                new Date(2021, new Date().getMonth(), 6),
                new Date(2021, new Date().getMonth(), 12),
                new Date(2021, new Date().getMonth(), 14),
                new Date(2021, new Date().getMonth(), 16),
                new Date(2021, new Date().getMonth(), 24),
              ]}
              onChange={onChangeFourteen}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can disable custom dates (here disabled if (date % 4 === 0))</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar
              isDisabled={(date: Date) => {
                return date.getDate() % 4 === 0;
              }}
              onChange={onChangeFiveteen}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can enable skipping disabled dates when doing fixed range(5 here) selections</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar
              isRangeSelector
              fixedRange={5}
              skipDisabledDatesInRange
              isDisabled={(date: Date) => {
                return date.getDate() % 3 === 0;
              }}
              onChange={onChangeseven}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can enable/disable selecting fewer dates than range if dates are not available</p>
          <small>
            Normally it will select 4 dates after the first one but when future dates are disabled then it can even
            select lesser than 4 dates. This behaviour can be disabled.
          </small>
        </div>
        <div>
          <div className="calendar">
            <Calendar
              allowFewerDatesThanRange
              disableFuture
              isRangeSelector
              fixedRange={4}
              onChange={onChangeThirteen}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can change start day of the week (Wed here)</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar viewDate={viewDate} startOfWeek={3} onChange={onChangefour} />
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setViewDate(new Date(2016, 1, 13));
            }}
          >
            Move to 2016, Feb, 13
          </button>
          <button
            style={{ marginLeft: '16px' }}
            onClick={() => {
              setViewDate(new Date());
            }}
          >
            Move to Today
          </button>
        </div>
      </div>
      <div>
        <div>
          <p>Can specify weekend days (Fri, Sat, Sun here)</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar weekends={[4, 5, 6]} onChange={onChangefive} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can turn off highlighting Weekends</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar weekends={[]} onChange={onChangefive} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can set if past,today,future is disabled by simple props</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar disablePast onChange={onChangesix} />
          </div>
          <div className="calendar">
            <Calendar
              disableToday
              value={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)}
              onChange={onChangeseven}
            />
          </div>
          <div className="calendar">
            <Calendar disableFuture onChange={onChangeeight} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can lock the calendar to a specific month/year</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar lockView onChange={onChangesix} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can set output date format (YYYY-DD-MM here)</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar onChange={onChangeTen} />
          </div>
          <div className="json">{giveFormatter('YYYY-DD-MM')(ten as Date, '-')}</div>
        </div>
      </div>
      <div>
        <div>
          <p>Can set output date separator (# here)</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar onChange={onChangeEleven} />
          </div>
          <div className="json">
            <div className="json">{giveFormatter('YYYY-DD-MM')(eleven as Date, '#')}</div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can be rendered inside a popover</p>
        </div>
        <div style={{ justifyContent: 'flex-start', width: '202px' }}>
          <div className="input">
            <input value={giveFormatter('YYYY-DD-MM')(ten as Date, '#')} />
            <Popover
              isOpen={isPopoverOpen}
              padding={6}
              positions={['bottom', 'top', 'left', 'right']}
              content={
                <Calendar
                  value={ten as any as Date}
                  onChange={(value: Value) => {
                    setTen(value);
                    setIsPopoverOpen(false);
                  }}
                />
              }
            >
              <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>🗓</div>
            </Popover>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can Set Initial Month&Date View To Show (Sept, 2020 here)</p>
        </div>
        <div>
          <div className="calendar">
            <Calendar viewDate={new Date(2020, 8, 9)} onChange={onChangeTweleve} />
          </div>
        </div>
      </div>

      <div>
        <div>
          <p>Easy to theme using CSS variables</p>
        </div>
        <div>
          <div>
            <Calendar className="green" isRangeSelector />
          </div>
          <div>
            <Calendar className="brown" />
          </div>
          <div>
            <Calendar className="violet" isRangeSelector fixedRange={4} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>In-built and customizable dark mode</p>
        </div>
        <div>
          <div>
            <Calendar useDarkMode isRangeSelector />
          </div>
          <div>
            <Calendar useDarkMode />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can easily adjust scale</p>
        </div>
        <div>
          <div style={{ width: '300px', marginTop: '24px', marginBottom: '24px' }}>
            <p style={{ marginBottom: '16px' }}>Use slider to update calendar size</p>
            <Slider step={50} min={350} max={1200} value={width} onChange={(value) => setWidth(value)} />
          </div>
          <div style={{ width: '300px', marginTop: '24px', marginBottom: '24px' }}>
            <p style={{ marginBottom: '16px' }}>Use slider to update font size</p>
            <Slider step={1} min={14} max={22} value={fontSize} onChange={(value) => setFontSize(value)} />
          </div>
          <div>
            <Calendar fontSize={fontSize} size={width} isRangeSelector />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Can be rendered on the server-side</p>
          <small>The following markup is created using ReactDomServer.renderToStaticMarkup() method</small>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: ReactDOMServer.renderToStaticMarkup(
              <Calendar
                value={[new Date(2021, 6, 22), new Date(2021, 6, 25), new Date(2021, 6, 9)]}
                isMultiSelector
                disableToday
                onChange={onChangeone}
              />,
            ),
          }}
        ></div>
      </div>
    </div>
  );
}
