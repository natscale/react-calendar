import React from 'react';
import { DayOfMonthCell } from '../calendar/Calendar';
export interface Props {
    isHighlighted: boolean;
    cell: DayOfMonthCell;
    onDateClicked: (cell: DayOfMonthCell) => unknown;
}
declare function Component({ isHighlighted, cell, onDateClicked }: Props): JSX.Element;
export declare const DayOfMonth: React.MemoExoticComponent<typeof Component>;
export {};
