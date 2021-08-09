import type { CSSProperties } from 'react';

export type MonthIndices = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type WeekdayIndices = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface DayOfMonthCell {
  date: Date;
  dayOfMonth: number;
  month: MonthIndices;
  year: number;
  dayOfWeek: number;
  activeMonthInView: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isWeekend: boolean;
  isToday: boolean;
  isHighlight: boolean;
  isFirstRow: boolean;
  isLastRow: boolean;
  isFirsColumn: boolean;
  isSelected: boolean;
  isLastColumn: boolean;
  isDisabled: boolean;
}

export interface YearCell {
  year: number;
  isCurrentYear: boolean;
  isSelectedYear: boolean;
}

export interface MonthCell {
  month: MonthIndices;
  isCurrentMonth: boolean;
  isSelectedMonth: boolean;
}

export interface GetDaysOfMonthViewMetrixParams {
  isSelectMultiDate: boolean;
  selectedMultiDates: Record<string, Date | undefined>;
  isRangeView: boolean;
  isRangeSelectModeOn: boolean;
  yearInView: number;
  monthInView: MonthIndices;
  weekendIndexes: WeekdayIndices[];
  startOfTheWeek: WeekdayIndices;
  selectedDate: Date | undefined;
  selectedRangeStart: Date | undefined;
  selectedRangeEnd: Date | undefined;
  newSelectedRangeStart: undefined | Date;
  newSelectedRangeEnd: undefined | Date;
  highlightsMap: Record<string, 1>;
  disableFuture: boolean;
  disablePast: boolean;
  disableToday: boolean;
  isDisabled: (date: Date) => boolean;
  checkIfWeekend: (date: Date) => boolean;
}

export interface CheckIfDateIsDisabledHOFParams {
  disablePast: boolean;
  disableToday: boolean;
  disableFuture: boolean;
  customDisabledCheck?: (date: Date) => boolean;
  maxDate?: Date;
  minDate?: Date;
  applyMax: boolean;
  applyMin: boolean;
}

export interface CSSProps {
  root: {
    rc: CSSProperties;
  };
}

export type Value = Date | Date[] | [Date, Date];

export interface CalendarProps {
  /**
   * Hides the prev and next month dates
   */
  hideAdjacentDates?: boolean;
  /**
   * Dark mode
   */
  useDarkMode?: boolean;
  /**
   * Custom classname
   */
  className?: string;
  /**
   * Width & Height of the calendar.
   * Default is 276
   */
  size?: number;
  /**
   * Base font-size of calendar.
   * Default is 16
   */
  fontSize?: number;
  /**
   * The initial month and year that will be shown to the user.
   * By default it shows today's date month and year. If a date is selected it shows the selected
   * date's month and year.
   */
  viewDate?: Date;
  /**
   * User can not change month/year
   */
  lockView?: boolean;
  /**
   * Value of a single date or an array of dates in ISO format.
   * Only applicable if selectRange is false
   */
  value?: Value;
  /**
   * Renders dual calendars
   */
  showDualCalendar?: boolean;
  /**
   * Renders a multiple dates selector view
   */
  isMultiSelector?: boolean;
  /**
   * Renders a range selector UI for the calendar
   */
  isRangeSelector?: boolean;
  /**
   * Skip disabled dates when doing fixed range selection
   */
  skipDisabledDatesInRange?: boolean;
  /**
   * Skip disabled dates when doing fixed range selection
   */
  allowFewerDatesThanRange?: boolean;
  /**
   * Always select n number of days starting from the user's selected date
   */
  fixedRange?: number;
  /**
   * Array of weekday number that are part of weekend.
   * The weekday number depends on the start of the week if provided one.
   * By default this is [6, 0] which Saturday, Sunday respectively as per the 0 based start of the week.
   */
  weekends?: WeekdayIndices[];
  /**
   * By default the calendar starts from Sun which is represented in JS as 0 index.
   * You can provide the index for any other day that you want as start of the week.
   */
  startOfWeek?: WeekdayIndices;
  /**
   * A boolean flag to disable all past dates.
   */
  disablePast?: boolean;
  /**
   * A boolean flag to disable today's date.
   */
  disableToday?: boolean;
  /**
   * A boolean flag to disable all future dates.
   */
  disableFuture?: boolean;
  /**
   * A callback function that can be used to disable specific dates on the calendar.
   */
  isDisabled?: (date: Date) => boolean;
  /**
   * User will not be able to select past this date. This date will be selectable.
   */
  maxAllowedDate?: Date;
  /**
   * User will not be able to select before this date. This date will be selectable.
   */
  minAllowedDate?: Date;
  /**
   * These dates will be highlighted
   */
  highlights?: Date[];
  /**
   * OnChange callback functionn.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: Value) => any | Promise<any> | void;
  /**
   * This callback will be called when user selects the start range
   */
  onPartialRangeSelect?: (value: Value) => any | Promise<any> | void;
  /**
   * This callback will be called for each date in a multiselect calendar
   */
  onEachMultiSelect?: (value: Value) => any | Promise<any> | void;
}

type CommonProps = Required<
  Pick<
    CalendarProps,
    | 'lockView'
    | 'isDisabled'
    | 'disableFuture'
    | 'disablePast'
    | 'disableToday'
    | 'weekends'
    | 'fixedRange'
    | 'startOfWeek'
    | 'skipDisabledDatesInRange'
    | 'allowFewerDatesThanRange'
    | 'fontSize'
    | 'size'
    | 'hideAdjacentDates'
    | 'useDarkMode'
    | 'showDualCalendar'
    | 'className'
  >
> &
  Pick<CalendarProps, 'onEachMultiSelect' | 'onPartialRangeSelect' | 'onChange'>;

export interface CalendarViewProps extends CommonProps {
  onChangenNewSelectedRangeEnd: (date: Date | undefined) => unknown;
  onChangenNewSelectedRangeStart: (date: Date | undefined) => unknown;
  onChangeRangeSelectMode: (on: boolean) => void;
  checkIfWeekend: (date: Date) => boolean;
  isSecondary: boolean;
  isRangeSelectorView: boolean;
  isFixedRangeView: boolean;
  isMultiSelectorView: boolean;
  isRangeSelectModeOn: boolean;
  isNormalView: boolean;
  selectedDate: Date | undefined;
  selectedRangeStart: Date | undefined;
  selectedRangeEnd: Date | undefined;
  newSelectedRangeStart: Date | undefined;
  newSelectedRangeEnd: Date | undefined;
  selectedMultiDates: Record<string, Date | undefined>;
  highlightsMap: Record<string, 1>;
  viewDate: string | undefined;
  maxAllowedDate: string | undefined;
  minAllowedDate: string | undefined;
  weekendMap: Record<WeekdayIndices, 1>;
}

export interface DayOfMonthSelectorProps
  extends Pick<
    CalendarViewProps,
    | 'onChangenNewSelectedRangeEnd'
    | 'onChangenNewSelectedRangeStart'
    | 'startOfWeek'
    | 'fixedRange'
    | 'selectedDate'
    | 'selectedRangeStart'
    | 'selectedRangeEnd'
    | 'newSelectedRangeStart'
    | 'newSelectedRangeEnd'
    | 'isRangeSelectorView'
    | 'isFixedRangeView'
    | 'weekends'
    | 'selectedMultiDates'
    | 'isMultiSelectorView'
    | 'isRangeSelectModeOn'
    | 'onChangeRangeSelectMode'
    | 'disableFuture'
    | 'disablePast'
    | 'disableToday'
    | 'hideAdjacentDates'
    | 'lockView'
    | 'highlightsMap'
    | 'isDisabled'
    | 'checkIfWeekend'
    | 'onChange'
    | 'onPartialRangeSelect'
    | 'onEachMultiSelect'
    | 'maxAllowedDate'
    | 'minAllowedDate'
    | 'allowFewerDatesThanRange'
    | 'skipDisabledDatesInRange'
  > {
  monthInView: MonthIndices;
  yearInView: number;
}

export interface MonthSelectorProps {
  onChangeViewType: (view: 'month_dates' | 'months' | 'years') => unknown;
  onChangeViewingMonth: (month: MonthIndices) => unknown;
}

export interface YearSelectorProps {
  onChangeViewType: (view: 'month_dates' | 'months' | 'years') => unknown;
  onChangeViewingYear: (year: number) => unknown;
  yearMatrixStart: number;
  yearMatrixEnd: number;
}

export interface WeekdayRowProps {
  startOfWeek: WeekdayIndices;
  weekendMap: Record<WeekdayIndices, 1>;
}

export interface HeaderProps {
  onClickPrev: () => any;
  onClickNext: () => any;
  onChangeViewType: (view: 'month_dates' | 'months' | 'years') => any;
  viewType: 'month_dates' | 'months' | 'years';
  monthInView: MonthIndices;
  yearInView: number;
  yearMatrixStart: number;
  yearMatrixEnd: number;
}

export interface DayOfMonthCellProps {
  cell: DayOfMonthCell;
  onDateClicked: (cell: DayOfMonthCell) => unknown;
}

export interface MonthCellProps {
  cell: MonthCell;
  onMonthClicked: (cell: MonthCell) => unknown;
}

export interface YearCellProps {
  cell: YearCell;
  onYearClicked: (cell: YearCell) => unknown;
}
