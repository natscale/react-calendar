import type { MonthIndices, WeekdayIndices } from './types';

/**
 * This weekday index-to-label map is what is used by the Date object
 */
export const NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP: Record<WeekdayIndices, string> = {
  0: 'Su',
  1: 'Mo',
  2: 'Tu',
  3: 'We',
  4: 'Th',
  5: 'Fr',
  6: 'Sa',
};

export const NATIVE_INDEX_TO_LABEL_MONTHS_MAP: Record<MonthIndices, string> = {
  0: 'January',
  1: 'February',
  2: 'Mrch',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};
