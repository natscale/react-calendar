/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { CSSProps } from '../types';

export const getStyles: (size: number, fontSize: number) => CSSProps = (size, fontSize) => ({
  root: {
    arc: {
      width: `${size!}px`,
      height: `${size!}px`,
      fontSize: `${fontSize}px`,
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      boxSizing: 'border-box',
    },
    arc_view: { height: '88%', width: '100%' },
    'arc_view-months': { height: '100%' },
    'arc_view-years': { height: '100%' },
    arc_header: {
      height: '12%',
      padding: '1% 2%',
      display: 'flex',
      alignTtems: 'center',
      width: '100%',
    },
  },
  weekdaysRow: {
    arc_view_weekdays: {
      height: '15%',
      margin: '0',
      padding: 0,
      display: 'flex',
      width: '100%',
      listStyle: 'none',
    },
    arc_view_weekdays_cell: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      flexBasis: '14.286%',
      maxWidth: '14.286%',
    },
    arc_view_weekdays_cell_value: {
      width: '65.95%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  dayOfMonth: {
    'arc_view-days-of-month': {
      height: '85%',
    },
    arc_view_row: {
      height: '16.664%',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
    },
    arc_view_cell: {
      flexBasis: '14.286%',
      maxWidth: '14.286%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arc_view_cell_value: {
      width: '65.95%',
      height: '80.5%',
    },
    arc_view_cell_value_button: {
      width: '100%',
      height: '100%',
    },
  },
  months: {
    arc_view_row: { height: '24.9%', display: 'flex', width: '100%' },
    arc_view_cell: {
      flexBasis: '33.33%',
      maxWidth: '33.33%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arc_view_cell_value_button: {
      width: '78px',
      height: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  years: {
    arc_view_row: { height: '24.9%', display: 'flex', width: '100%' },
    arc_view_cell: {
      width: '20%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arc_view_cell_value_button: {
      width: '48px',
      height: '26px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  header: {
    arc_header_nav: { width: '10.14%', height: '100%', flex: '0 0 auto' },
    arch_header_label: {
      width: '65.21%',
      height: '100%',
      margin: '0 4.34%',
      flex: '1 1 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});
