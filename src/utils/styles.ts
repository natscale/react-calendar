/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { CSSProps } from './types';

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
  },
});
