import React from 'react';
import { MonthCell } from '../calendar/Calendar';
interface Props {
    cell: MonthCell;
    onMonthClicked: (cell: MonthCell) => unknown;
}
declare function Component({ cell, onMonthClicked }: Props): JSX.Element;
export declare const Month: React.MemoExoticComponent<typeof Component>;
export {};
