import React from 'react';
import { YearCell } from '../calendar/Calendar';
export interface Props {
    cell: YearCell;
    onYearClicked: (cell: YearCell) => unknown;
}
declare function Component({ cell, onYearClicked }: Props): JSX.Element;
export declare const Year: React.MemoExoticComponent<typeof Component>;
export {};
