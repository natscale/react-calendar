import React from 'react';
import { DayOfMonthCell } from '../calendar/Calendar';
export interface Props {
    cell: DayOfMonthCell;
    onDateClicked: (cell: DayOfMonthCell) => unknown;
}
declare function Component({ cell, onDateClicked }: Props): JSX.Element;
export declare const DayOfMonth: React.MemoExoticComponent<typeof Component>;
export {};
